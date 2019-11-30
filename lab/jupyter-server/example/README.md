[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Datalayer Lab Jupyter Server 1

```bash
pip install -e .
jupyter server-1
```

```bash
open http://localhost:8888
open http://localhost:8888/favicon.ico
open http://localhost:8888/static/server_1/favicon.ico
open http://localhost:8888/static/server_1/test.html
open http://localhost:8888/server_1
open http://localhost:8888/server_1/something?var1=foo
open http://localhost:8888/template
```

## Server Extensions

Configurable server extension applications [#48](https://github.com/jupyter/jupyter_server/pull/48).

**What?**

The `ExtensionApp` is a base class for creating configurable, front-end client applications as extensions of the jupyter server.

**Details**

`ExtensionApp` subclasses `JupyterApp` from jupyter_core. Extensions that subclass this class can be:

+ Launched and configured from the command line with jupyter <extension_name> ...
+ Configured by a file named jupyter_<extension_name>_config.py.

When an extension application is launched, it:

+ Starts and launches an instance of the Jupyter server.
+ Calls `self.load_jupyter_server_extension()` method.
+ Loads configuration from config files+command line.
+ Appends the extension's handlers to the main web application.
+ Appends a `/static/<extension_name>/` endpoint where it serves static files (i.e. js, css, etc.).

**Why?**

There are various frontends that depend on the classic Notebook Server (i.e. notebook, nteract, lab, and voila). However, the Notebook frontend is deeply coupled with the Notebook server, forcing other clients to work around it. Jupyter Server separates out the server from the notebook, so all front-end applications are first-class citizens to the server.

This PR makes it much easier to write client applications that depend on the Jupyter Server.

**How?**

1. Subclass the ExtensionApp. Set the following traits:

+ `extension_name`: name of the extension.
+ `static_paths`: path to static files directory
+ `template_paths`: path to templates directory.

and define (optional) the following methods:

+ `initialize_handlers()`: Append handlers to self.handlers.
+ `initialize_templates()`: Setup your html templating options.
+ `initialize_settings()`: Add extensions settings to the webapp using self.settings.

```python
# Example: extension/application.py
from jupyter_server.extension.application import ExtensionApp

class MyExtension(ExtensionApp):
    
    # Name of the extension
    extension_name = "my_extension"

    # Local path to static files directory.
    static_paths = [
        "/path/to/static/dir/"
    ]

    # Local path to templates directory.
    template_paths = [
        "/path/to/template/dir/"
    ]

    def initialize_handlers(self):
        self.handlers.append(
            (r'/myextension', MyExtensionHandler)
        )

    def initialize_templates(self):
        ...

    def initialize_settings(self):
        ...
```

2. Define handlers by subclassing the `ExtensionHandler`.

```python
# Example: extension/handler.py
from jupyter_server import ExtensionHandler

class MyExtensionHandler(ExtensionHandler):
    
    def get(self):
        ...
```

3. Point Jupyter server to the extension. We need to define two things:

+ `_jupyter_server_extension_paths()`: a function defining what module to load the extension from.
+ `load_jupyter_server_extension()`: point there server to the extension's loading function mechansim.

```python
# Example: __init__.py
from  import MyExtension

EXTENSION_NAME = "my_extension"

def _jupyter_server_extension_paths():
    return [{"module": EXTENSION_NAME}]

load_jupyter_server_extension = MyExtension.load_jupyter_server_extension
```

4. Add the following configuration to your jupyter configuration directory to enable the extension.

```json
{
  "ServerApp": {
    "jpserver_extensions": {
      "notebook": true
    }
  }
}
```

5. Add entry point in `setup.py`.

```python
# Example.
setup(
    name='my_extension',
    version='0.1',
    data_files=[
        ('etc/jupyter/jupyter_server_config.d', ['etc/jupyter/jupyter_server_config.d./my_extension.json']),
    ],
    ...
    entry_points = {
        'console_scripts': [
             'jupyter-myext = my_extension.application:MyExtension.launch_instance'
        ]
    },
    ...
)
```
