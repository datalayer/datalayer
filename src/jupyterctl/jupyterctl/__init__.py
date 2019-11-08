from .application import JupyterCtl

def _jupyter_server_extension_paths():
    return [
        {'module': 'jupyterctl'}
    ]

load_jupyter_server_extension = JupyterCtl.load_jupyter_server_extension
