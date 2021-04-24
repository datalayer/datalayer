import subprocess, os, errno, stat
from jupyter_core.paths import jupyter_data_dir

c.ServerApp.ip = '0.0.0.0'
c.ServerApp.port = 8888
c.ServerApp.open_browser = True

home_dir = os.path.expanduser('~')
c.ServerApp.notebook_dir = home_dir
c.SingleUserServerApp.default_url = '/lab'

c.ServerApp.tornado_settings = {
    'headers': {
        'Content-Security-Policy': "frame-ancestors *"
    }
}

# https://github.com/jupyter/notebook/issues/3130
c.FileContentsManager.delete_to_trash = False
