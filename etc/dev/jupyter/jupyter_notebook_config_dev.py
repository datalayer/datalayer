import subprocess, os, errno, stat
from jupyter_core.paths import jupyter_data_dir

c = get_config()

c.NotebookApp.ip = '0.0.0.0'
c.NotebookApp.port = 8888
c.NotebookApp.open_browser = True

home_dir = os.path.expanduser('~')
c.NotebookApp.notebook_dir = home_dir
c.SingleUserNotebookApp.default_url = '/lab'

c.NotebookApp.tornado_settings = {
    'headers': {
        'Content-Security-Policy': "frame-ancestors *"
    }
}

# https://github.com/jupyter/notebook/issues/3130
c.FileContentsManager.delete_to_trash = False
