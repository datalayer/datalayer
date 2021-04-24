import sys
from jupyter_core.application import JupyterApp
from traitlets.config.loader import Config

class ConfLoader(JupyterApp):
    def __init__(self, name, argv):
        self.name = name
        self.load_config_file()
        self.parse_command_line(argv)

def load_config(conf_name):
    conf = ConfLoader(conf_name, sys.argv)
    print(conf.config)
    return conf.config

if __name__ == "__main__":

    c0 = Config()

    c1 = load_config('jupyter_notebook')
    c2 = load_config('jupyter_server')
    c3 = load_config('jupyter_new')
    c4 = load_config(None)

    print('c0: {}'.format(c0))
    c0.merge(c1)
    print(type(c0))
    print('c0: {}'.format(c0))

    print('---------------------------------')
    notebookapp = c0.NotebookApp
    print(type(notebookapp))
    print('notebookapp: {}'.format(notebookapp))
    print(c0.NotebookApp.hello)
    
    print('---------------------------------')
    c0.NotebookApp2 = notebookapp
    c0['NotebookApp3'] = notebookapp
    print(type(c0))
    print('c0: {}'.format(c0))

    print('---------------------------------')
    notebookapp2 = Config()
    notebookapp2.hello = 'notebook2'
    c0.NotebookApp.merge(notebookapp2)
    print(type(c0))
    print('c0: {}'.format(c0))

    print('---------------------------------')
    print(c0.NotebookApp.items())
    print(c0.NotebookApp.items())
    print(c0.NotebookApp.keys())
    print(c0.NotebookApp.values())

    print('---------------------------------')
    print(c0.to_dict.to_dict())
    print(c0.section_names.to_dict())
    print(c0.class_config_section.to_dict())
    print(c0.class_config_rst_doc.to_dict())
