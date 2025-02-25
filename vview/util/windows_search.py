# This gives an interface to Windows Search, returning results similar to
# os.scandir.

import asyncio, time, os, stat, logging
from adodbapi import ado_consts
from pathlib import Path
from pprint import pprint

log = logging.getLogger(__name__)

# Get this from pywin32, not from adodbapi:
try:
    import adodbapi
except ImportError as e:
    adodbapi = None
    log.warn('Windows search not available: %s' % e)

# adodbapi seems to have no way to escape strings, and Search.CollatorDSO doesn't seem
# to support parameters at all.
def escape_sql(s):
    result = ''
    for c in s:
        if c == '\'':
            result += "'"
        result += c
    return result

FILE_ATTRIBUTE_READONLY = 0x01
FILE_ATTRIBUTE_DIRECTORY = 0x10

class SearchDirEntryStat:
    """
    This is an os.stat_result for SearchDirEntry.

    We don't use os.stat_result itself, since we want to calculate a few fields
    on-demand to avoid overhead when they aren't used.
    """
    def __init__(self, data):
        self._data = data

        self.st_size = data['System.Size']
        self._st_atime = None
        self._st_ctime = None
        self._st_mtime = None

        # System.FileAttributes is WIN32_FIND_DATA.dwFileAttributes.  Convert
        # it to st_mode in the same way Python does.
        attr = data['System.FileAttributes']
        if attr & FILE_ATTRIBUTE_DIRECTORY:
            mode = stat.S_IFDIR | 0o111
        else:
            mode = stat.S_IFREG

        if attr & FILE_ATTRIBUTE_READONLY:
            mode |= 0o444
        else:
            mode |= 0o666

        self.st_mode = mode

    def __repr__(self):
        fields = []
        for field in ('st_mode', 'st_dev', 'st_size', 'st_atime', 'st_mtime', 'st_ctime'):
            fields.append('%s=%s' % (field, getattr(self, field)))
        return f'SearchDirEntryStat({ ", ".join(fields) })'

    # These fields aren't available.
    @property
    def st_ino(self): return 0
    @property
    def st_nlink(self): return 1
    @property
    def st_uid(self): return 0
    @property
    def st_gid(self): return 0
        
    # The only related field is System.VolumeId, but that's not the same
    # as BY_HANDLE_FILE_INFORMATION.dwVolumeSerialNumber.
    @property
    def st_dev(self): return 0

    # adodbapi's parsing for these timestamps is pretty slow and is the overwhelming
    # bottleneck if we parse it for all files.  Since most callers don't use all of
    # these, parse them on demand.
    #
    # time.timezone converts these from local time to UTC.
    @property
    def st_atime(self):
        if self._st_atime is not None:
            return self._st_atime

        self._st_atime = self._data['System.DateAccessed'].timestamp() - time.timezone
        return self._st_atime

    @property
    def st_ctime(self):
        if self._st_ctime is not None:
            return self._st_ctime

        self._st_ctime = self._data['System.DateCreated'].timestamp() - time.timezone
        return self._st_ctime

    @property
    def st_mtime(self):
        if self._st_mtime is not None:
            return self._st_mtime

        self._st_mtime = self._data['System.DateModified'].timestamp() - time.timezone
        return self._st_mtime

def _matches_range(range, value):
    """
    range is (min, max).  Return true if min <= value <= max.  If range is None, there's no
    filter, so the value always matches.  min and max can be None.
    """
    if range is None:
        return True
    if range[0] is not None and range[0] > value:
        return False
    if range[1] is not None and range[1] < value:
        return False
    return True

class SearchDirEntry(os.PathLike):
    """
    A DirEntry-like class for search results.

    This doesn't implement follow_symlinks, but accepts the parameter for
    compatibility with DirEntry.
    """
    def __init__(self, data):
        self._data = data
        self._path = data['System.ItemPathDisplay']
        self._stat = None

    @property
    def metadata(self):
        """
        Return any extra metadata that we got from the search.
        """
        result = { }

        if self._data['System.Image.HorizontalSize']:
            result['width'] = self._data['System.Image.HorizontalSize']

        if self._data['System.Image.VerticalSize']:
            result['height'] = self._data['System.Image.VerticalSize']

        return result

    @property
    def path(self):
        return self._path

    @property
    def name(self):
        return os.path.basename(self._path)

    def is_dir(self, *, follow_symlinks=True):
        return self._data['System.ItemType'] == 'Directory'

    def is_file(self, *, follow_symlinks=True):
        return self._data['System.ItemType'] != 'Directory'

    def exists(self, *, follow_symlinks=True):
        return True

    @property
    def is_symlink(self):
        return False

    def stat(self, *, follow_symlinks=True):
        if self._stat is not None:
            return self._stat

        self._stat = SearchDirEntryStat(self._data)
        return self._stat

    @property
    def data(self):
        pass

    def __fspath__(self):
        return self._path

    def __repr__(self):
        return 'SearchDirEntry(%s)' % self._path

# This is yielded as a result if the query times out.
class SearchTimeout: pass

def search(*,
        paths=None,

        # If set, return only the file with this exact path.
        exact_path=None,

        # Filter for files with this exact basename:
        filename=None,

        substr=None,
        bookmarked=None,
        recurse=True,
        contents=None,
        media_type=None, # "images" or "videos"
        total_pixels=None,
        aspect_ratio=None,

        # If None, a default timeout will be used.  If the request times out, an error
        # will be thrown.
        #
        # If 0, no timeout will be used.
        #
        # If positive, the given timeout will be used.  If the search times out, a
        # result of SearchTimeout will be yielded and no exception will be raised.
        timeout=None,

        # An SQL ORDER BY statement to order results.  See library.sort_orders.
        order=None,
        include_files=True,
        include_dirs=True,
    ):
    if adodbapi is None:
        return

    yield_timeouts = (timeout is not None)
    if timeout is None:
        timeout = 10

    try:
        conn = adodbapi.connect('Provider=Search.CollatorDSO; Extended Properties="Application=Windows"', timeout=timeout)
    except Exception as e:
        log.warn('Couldn\'t connect to search: %s' % str(e))
        return

    # For some reason, adodbapi defaults to adUseClient, which is extraordinarily
    # slow: if you make a request that matches 100k files, it reads the entire record
    # set before seeing any of them.  Switch this to adUseServer to get a normal
    # database cursor.
    conn.connector.CursorLocation = ado_consts.adUseServer

    select = [
        # These fields are required for SearchDirEntry.
        'System.ItemPathDisplay',
        'System.ItemType',
        'System.DateAccessed',
        'System.DateModified',
        'System.DateCreated',
        'System.FileAttributes',
        'System.Size',

        # The rest are optional.
        'System.Rating',
        'System.Image.HorizontalSize',
        'System.Image.VerticalSize',
        'System.Keywords',
        'System.ItemAuthors',
        'System.Title',
        'System.Comment',
        'System.MIMEType',
    ]

    where = []

    # We never make searches without having either a list of paths or an exact
    # path, since that would search the entire filesystem.
    assert paths or exact_path
    if paths:
        # If we're recursing, limit the search with scope.  If not, filter on
        # the parent directory.
        parts = []
        if recurse:
            for path in paths:
                parts.append("scope = '%s'" % escape_sql(str(path)))
        else:
            for path in paths:
                parts.append("directory = '%s'" % escape_sql(str(path)))
        where.append(f"({ ' OR '.join(parts) })")

    if exact_path is not None:
        where.append("System.ItemPathDisplay = '%s'" % escape_sql(str(exact_path)))
    if contents:
        where.append("""CONTAINS(System.Search.Contents, '"%s"')""" % escape_sql(str(contents)))
    if filename is not None:
        where.append("System.FileName = '%s'" % escape_sql(str(filename)))
        
    # Add filters.
    if substr is not None:
        for word in substr.split(' '):
            # Note that the double-escaping is required to make substring searches
            # work.  '"file*"' will prefix match "file*", but 'file*' won't.  This
            # seems to be efficient at prefix and suffix matches.
            where.append("""CONTAINS(System.FileName, '"*%s*"')""" % escape_sql(word))

    if not include_files:
        where.append("System.ItemType = 'Directory'")
    if not include_dirs:
        where.append("System.ItemType != 'Directory'")

    if media_type == 'images':
        where.append("System.Kind = 'picture'")
    elif media_type == 'videos':
        # Include GIFs when searching for videos.  We can't filter for animated GIFs here,
        # so include them and let the caller finish filtering them.
        where.append("(System.Kind = 'video' OR System.ItemType = '.gif')")

    # where.append("(System.ItemType = 'Directory' OR System.Kind = 'picture' OR System.Kind = 'video')")

    # System.Rating is null for no rating, and 1, 25, 50, 75, 99 for 1, 2, 3, 4, 5
    # stars.  It's a bit weird, but we only use it for bookmarking.  Any image with 50 or
    # higher rating is considered bookmarked.
    if bookmarked:
        where.append("System.Rating >= 50")

    # If sort_results is true, sort directories first, then alphabetical.  This is
    # useful but makes the search slower.
    if order is None:
        order = ''

    query = f"""
        SELECT {', '.join(select)}
        FROM SystemIndex 
        WHERE {' AND '.join(where)}
        {order}
    """

    start_time = time.time()
    timed_out = False
    try:
        with conn:
            with conn.cursor() as cursor:
                cursor.execute(query)
                for row in cursor:
                    # Handle search filters that the index doesn't do for us.  This is just a best-effort
                    # to filter these early, since if we can do it directly from the search rows, it's faster
                    # than having it go through the higher-level filtering.
                    if row['System.Image.HorizontalSize'] is not None and row['System.Image.VerticalSize'] is not None:
                        if not _matches_range(aspect_ratio, row['System.Image.HorizontalSize'] / row['System.Image.VerticalSize']):
                            continue

                    if row['System.Image.HorizontalSize'] is not None and row['System.Image.VerticalSize'] is not None:
                        if not _matches_range(total_pixels, row['System.Image.HorizontalSize'] * row['System.Image.VerticalSize']):
                            continue

                    entry = SearchDirEntry(row)
                    yield entry

    except Exception as e:
        # How do we figure out if this exception is from a timeout?  The HResult in the
        # exception is just "Exception occurred".  Make a guess by comparing the duration
        # to what we expect the timeout to be.  The timeout is an integer, so it can never
        # be less than one full second.
        runtime = time.time() - start_time
        if timeout != 0 and runtime >= timeout - 0.5:
            # Exit the exception handler before yielding the timeout, so any exceptions
            # during that yield don't cause nested exceptions.
            timed_out = True
        else:
            log.warn('Windows search error:', e)

    # If the user explicitly requested a timeout, return SearchTimeout to let him know that
    # the results were incomplete.  If no timeout was requested, raise an exception.  The
    # caller isn't explicitly handling timeouts, so treat this as an error to prevent possibly
    # incomplete results from being committed to the database.
    if timed_out:
        log.warn(f'Windows Search probably timed out.  Timeout: {timeout} Time elapsed: {runtime}')
        if yield_timeouts:
            yield SearchTimeout
        else:
            raise Exception('The search timed out')

def test():
    path=Path(r'F:\stuff\ppixiv\python\temp')
    for idx, entry in enumerate(search(paths=[path], timeout=1, substr='png')):
        if entry is SearchTimeout:
            log.warn('Timed out')
        if entry is None:
            continue

        log.info(entry)
        st = os.stat(entry.path)
        # log.info(entry.is_file())
        # log.info(entry.is_dir())

if __name__ == '__main__':
    test()
