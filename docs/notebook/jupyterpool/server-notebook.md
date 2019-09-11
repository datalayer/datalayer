---
title: Jupyter Notebook
---

# Jupyter Notebook

```
BROWSER --- NOTEBOOK_SERVER --- KERNEL
```

Notebook [GitHub](https://github.com/jupyter/notebook) repository.

Notebook [Docs](https://jupyter-notebook.readthedocs.io).

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
# List running `so-called` servers.
from notebook import notebookapp
servers = list(notebookapp.list_running_servers())
print(servers)
```

## Examples

Try the Datalayer [Examples](https://github.com/datalayer/datalayer/tree/master/etc/jupyter/examples).

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
