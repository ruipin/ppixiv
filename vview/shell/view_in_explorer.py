import subprocess, sys, urllib.parse

# This is a helper to allow us to open local directories in File Explorer from
# the page.  This is registered as the "vviewinexplorer" URL scheme by pplocal.shell.register.
def show_in_explorer():
    # Parse the URL.  It looks like:
    #
    # vviewinexplorer:///c:/path/to/file
    path = str(sys.argv[1])
    print(path)
    url = urllib.parse.urlparse(path)
    path = urllib.parse.unquote(url.path)

    # Remove the leading slash, and since Explorer is the only program in Windows
    # that thinks directory separators have to be backslashes, replace them.
    path = path[1:].replace('/', '\\')

    # Show the file with /select, which will display the file in its parent.
    proc = subprocess.Popen([
        'explorer.exe',
        '/select,',
        path,
    ])

if __name__=='__main__':
    show_in_explorer()
