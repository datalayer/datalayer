from .application import Server1

EXTENSION_NAME = "server_1"

def _jupyter_server_extension_paths():
    return [{"module": EXTENSION_NAME}]

load_jupyter_server_extension = Server1.load_jupyter_server_extension
