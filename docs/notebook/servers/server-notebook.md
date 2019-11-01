---
title: Jupyter Notebook
---

# Jupyter Notebook

```
BROWSER --- NOTEBOOK_SERVER --- KERNEL
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
# List running `so-called` servers...
from notebook import notebookapp
servers = list(notebookapp.list_running_servers())
print(servers)
```

## Examples

Try the Datalayer [Examples](https://github.com/datalayer/datalayer/tree/master/etc/examples/jupyter).

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

## API

REST API [Swagger](http://petstore.swagger.io?url=https://raw.githubusercontent.com/jupyter/notebook/master/notebook/services/api/api.yaml)

```bash
GET http://localhost:8888/lab
GET http://localhost:8888/lab/static/vendors~main.fb9d5fc3d20679f8ad92.js
GET http://localhost:8888/lab/static/main.886f8a31649f6428e501.js
```

```bash
GET http://localhost:8888/api/sessions
GET http://localhost:8888/api/kernelspecs?1558625586262
GET http://localhost:8888/api/terminals?1558625586264
GET http://localhost:8888/lab/settings/?1558625586274
GET http://localhost:8888/api/sessions?1558625586526
GET http://localhost:8888/lab/build?1558625586741
GET http://localhost:8888/api/contents/?content=1&1558625586760
GET http://localhost:8888/api/nbconvert?1558625586777
```

```bash
WS ws://localhost:8888/api/kernels/7fbbafe9-021e-4d2e-bf81-ba0ef2239727/channels?session_id=1f8a3c1f-ff63-4221-9183-cc82092839b1&token=18b66314f1108701a8eb0eaed4f0e
```

## Content Manager API

+ [Multi Contents Manager](https://github.com/timkpaine/multicontentsmanager)

## S3 Content Manager

+ [s3contents](https://github.com/danielfrg/s3contents).
+ [jupyters3](https://github.com/uktrade/jupyters3).

## Kernel Manager API

+ https://jupyter-client.readthedocs.io/en/latest/kernel_providers.html

## Conda Kernels

+ https://github.com/Anaconda-Platform/nb_conda_kernels

```json
{
  "NotebookApp": {
    "nbserver_extensions": {
      "nb_conda": true,
      "jupyterlab_twitter": true
    },
    "kernel_spec_manager_class": "nb_conda_kernels.CondaKernelSpecManager"
  }
}
```

## Add API

```python
"""
Module to initialize the Notebook Server Extension.
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
