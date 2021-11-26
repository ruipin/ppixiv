#!/usr/bin/python
import asyncio, json, logging, traceback, urllib, time
from pprint import pprint

import aiohttp
from aiohttp import web
from aiohttp.abc import AbstractAccessLogger
from aiohttp.web_log import AccessLogger

from . import api, thumbs
from .util import misc
from .manager import Manager

async def check_origin(request, response):
    """
    Check the Origin header and add CORS headers.
    """
    origin = request.headers.get('Origin')
    if origin is not None and origin != 'https://www.pixiv.net':
        raise aiohttp.web.HTTPUnauthorized()

    if origin:
        response.headers['Access-Control-Allow-Origin'] = origin
        response.headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = '*'
        response.headers['Access-Control-Expose-Headers'] = '*'
        response.headers['Access-Control-Max-Age'] = '1000000'

def create_handler_for_command(handler):
    async def handle(request):
        if request.method == 'OPTIONS':
            return web.Response(status=200)

        if request.method != 'POST':
            raise aiohttp.web.HTTPMethodNotAllowed(method=request.method, allowed_methods=('POST', 'OPTIONS'))

        data = await request.json()

        base_url = '%s://%s:%i' % (request.url.scheme, request.url.host, request.url.port)
        info = api.RequestInfo(request, data, base_url)

        try:
            result = await handler(info)
        except misc.Error as e:
            result = e.data()
        except Exception as e:
            traceback.print_exception(e)
            stack = traceback.format_exception(e)
            result = { 'success': False, 'code': 'internal-error', 'message': str(e), 'stack': stack }

        # Don't use web.JsonResponse.  It doesn't let us control JSON formatting
        # and gives really ugly JSON.
        try:
            data = json.dumps(result, indent=4, ensure_ascii=False) + '\n'
        except TypeError as e:
            # Something in the result isn't serializable.
            print('Invalid response data:', e)
            pprint(result)

            result = { 'success': False, 'code': 'internal-error', 'message': str(e) }
            data = json.dumps(result, indent=4, ensure_ascii=False) + '\n'

        # If this is an error, return 500 with the message in the status line.  This isn't
        # part of the API, it's just convenient for debugging.
        status = 200
        message = 'OK'
        if not result.get('success'):
            status = 500
            message = result.get('message')
        return web.Response(body=data, status=status, reason=message, content_type='application/json')

    return handle

async def handle_unknown_api_call(info):
    name = info.request.match_info['name']
    return { 'success': False, 'code': 'invalid-request', 'reason': 'Invalid API: /api/%s' % name }

logging.basicConfig(level=logging.INFO)
logging.captureWarnings(True)

_running_requests = {}

# Work around some aiohttp weirdness.  For some reason, although it runs handlers
# in a task, it doesn't cancel the tasks on shutdown.  Apparently we're supposed
# to keep track of requests and cancel them ourselves.  This seems like the framework's
# job, I don't know why this is pushed onto the application.
#
# register_request_middleware registers running requests, and the shutdown_requests
# shutdown handler cancels them.  Setting this up is a bit messy since on_shutdown
# and middlewares are registered in completely different ways.
@web.middleware
async def register_request_middleware(request, handler):
    try:
        _running_requests[request.task] = request
        return await handler(request)
    finally:
        del _running_requests[request.task]

async def shutdown_requests(app):
    print('shutdown_requests')

    for task, request in dict(_running_requests).items():
        task.cancel()

async def setup():
    app = web.Application(middlewares=[register_request_middleware])
    app.on_response_prepare.append(check_origin)
    app.on_shutdown.append(shutdown_requests)

    # Set up routes.
    app.router.add_get('/file/{type:[^:]+}:{path:.+}', thumbs.handle_file)
    app.router.add_get('/thumb/{type:[^:]+}:{path:.+}', thumbs.handle_thumb)
    app.router.add_get('/tree-thumb/{type:[^:]+}:{path:.+}', thumbs.handle_tree_thumb)
    app.router.add_get('/poster/{type:[^:]+}:{path:.+}', thumbs.handle_poster)
    app.router.add_get('/mjpeg-zip/{type:[^:]+}:{path:.+}', thumbs.handle_mjpeg)

    # Add a handler for each API call.
    for command, func in api.handlers.items():
        handler = create_handler_for_command(func)
        app.router.add_view('/api' + command, handler)

    # Add a fallback for invalid /api calls.
    handler = create_handler_for_command(handle_unknown_api_call)
    app.router.add_view('/api/{name:.*}', handler)

    # Start our manager.
    manager = Manager(app)
    app['manager'] = manager
    await manager.init()

    return app

class AccessLogger(AbstractAccessLogger):
    """
    A more readable access log.
    """
    def __init__(self, *args):
        self.logger = logging.getLogger('request')

    def log(self, request, response, duration) -> None:
        path = urllib.parse.unquote(request.path_qs)
        start_time = time.time() - duration
        self.logger.info('%f %i (%i): %s' % (start_time, response.status, response.body_length, path))

def run():
    web.run_app(setup(),
        host='localhost',
        port=8235,
        print=None,
        access_log_format='%t "%r" %s %b',
        access_log_class=AccessLogger)

if __name__ == '__main__':
    run()
