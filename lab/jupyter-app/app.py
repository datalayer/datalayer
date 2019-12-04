from traitlets.config import Configurable
from jupyter_core.application import JupyterApp

class ConfLoader(JupyterApp):
    def __init__(self, name):
        self.name = name

if __name__ == "__main__":
    cc = ConfLoader('jupyter_notebook')
    cc.load_config_file()
    print(cc.config)
