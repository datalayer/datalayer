import sys
from traitlets.config import Configurable
from jupyter_core.application import JupyterApp

class ConfLoader(JupyterApp):
    def __init__(self, name):
        self.name = name

if __name__ == "__main__":

    notebook = ConfLoader('jupyter_notebook')
    notebook.load_config_file()
    notebook.parse_command_line(sys.argv)
    print(notebook.config)

    server = ConfLoader('jupyter_server')
    server.load_config_file()
    server.parse_command_line(sys.argv)
    print(server.config)
