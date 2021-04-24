---
title: Jupyter Notebook
---

# Jupyter Notebook

```
BROWSER --- NOTEBOOK --- KERNEL
```

Notebook [GitHub](https://github.com/jupyter/notebook) repository.

Notebook [Docs](https://jupyter-notebook.readthedocs.io/en/latest).

The Notebook server runs the kernels and exposes API endpoints to the front-end Notebook client.

## Config

[Config](https://jupyter-notebook.readthedocs.io/en/stable/config.html).

```bash
# Create a `jupyter_notebook_config.py` file in the `.jupyter` directory, with all the defaults commented out.
jupyter notebook --generate-config
more ~/.jupyter/jupyter_notebook_config.py
```

Command line arguments for configuration `<config>` settings are documented in the configuration file and the user documentation.

## API

REST API [Swagger](http://petstore.swagger.io?url=https://raw.githubusercontent.com/jupyter/notebook/master/notebook/services/api/api.yaml)

## Build

```bash
cd $DLAHOME/repos/jupyter-notebook && \
  pip install -e . && \
  npm run build && \
  npm run build:watch
```

## Start

```bash
# open http://localhost:8000
jupyter notebook
jupyter notebook --version
jupyter notebook --log-level DEBUG --port 8081 --notebook-dir ~/notebooks
```

## List Notebooks

```bash
jupyter notebook list
jupyter notebook list --jsonlist
```

```python
# List running servers...
from notebook import notebookapp
servers = list(notebookapp.list_running_servers())
print(servers)
```

## Examples

Try the Datalayer [Examples](https://github.com/datalayer/datalayer/tree/master/etc/jupyter-notebook).

```bash
echo http://localhost:8010
CONF=base-url && \
  jupyter \
    notebook \
    --JupyterApp.config_file=$DLAHOME/etc/examples/jupyter/${CONF}/jupyter_notebook_config.py \
    --NotebookApp.notebook_dir=~/ \
    --log-level=DEBUG \
    --port 8010
```

## Extensions

- https://jupyter-contrib-nbextensions.readthedocs.io/en/latest

- https://jupyter-contrib-nbextensions.readthedocs.io/en/latest/nbextensions/tree-filter/readme.html
- https://github.com/jdfreder/jupyter-tree-filter

## Extend with a new API

```python
"""Module to initialize the Notebook Server Extension.
"""
import os, logging, json
from jupyterlab_twitter.handlers import setup_handlers

def _jupyter_server_extension_paths():
    """
    Declare Jupyter Server Extension Paths.
    """
    return [{
        'module': 'jupyterlab_twitter',
    }]

def _jupyter_nbextension_paths():
    """
    Declare Jupyter Notebook Extension Paths.
    """
    return [{
        "section": "notebook", 
        "dest": "jupyterlab_twitter",
    }]

def load_jupyter_server_extension(nbapp):
    """
    Load JupyterLab Datalayer Server Extension.
    """    
    logging.basicConfig(level=logging.DEBUG)
    logging.info('Loading Jupyter Datalayer Server Extension.')
    openid_user_info_env = os.getenv('OPENID_USER_INFO')
    logging.info('openid_user_info_env: {}'.format(openid_user_info_env))
    if openid_user_info_env:
        import ast
        dic_j = ast.literal_eval(openid_user_info_env.replace(' false', ' False').replace(' true', ' True'))
        openid_user_info = json.loads(json.dumps(dic_j))
        print('openid_user_info: {}'.format(openid_user_info))
        logging.info('openid_user_info: {}'.format(openid_user_info))
        nbapp.web_app.settings['openid_user_info'] = openid_user_info
    else:
        nbapp.web_app.settings['openid_user_info'] = {
            'preferred_username': 'jdoe',
            'given_name': 'Jane',
            'family_name': 'Doe',
            'name': 'Jane Doe',
            }
    nbapp.web_app.settings['xsrf_cookies'] = False
    nbapp.web_app.settings['twitter_consumer_key'] = os.environ['DLA_TWITTER_CONSUMER_KEY']
    nbapp.web_app.settings['twitter_consumer_secret'] = os.environ['DLA_TWITTER_CONSUMER_SECRET']
    nbapp.web_app.settings['cookie_secret'] = "32oETzKXQAGaYdkL5gEmGeJJFuYh7EQnp2XdTP1o/Vo="
    nbapp.web_app.settings['debug'] = True
    setup_handlers(nbapp.web_app)
```

```bash
pip install -e . && \
  jupyter serverextension enable --py jupyterlab --sys-prefix
```

Server extension enable options.

```
--user
    Perform the operation for the current user
--system
    Perform the operation system-wide
--sys-prefix
    Use sys.prefix as the prefix for installing server extensions
```
