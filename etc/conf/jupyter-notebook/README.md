[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Jupyter Examples

## Environement

```bash
conda deactivate && \
  conda remove --name jupyter -y --all && \
  conda create --name jupyter -y python=3.7 jupyter && \
  conda activate jupyter
```

# Start

```bash
# default configuration.
conda activate jupyter && \
  jupyter notebook
```

```bash
# simple configuration.
conda activate jupyter && \
  jupyter notebook --config $DLAHOME/etc/examples/jupyter/simple/jupyter_notebook_config.py
```

```bash
# base-url configuration.
conda activate jupyter && \
  jupyter notebook --config $DLAHOME/etc/examples/jupyter/base-url/jupyter_notebook_config.py
```

## Usage

```bash
jupyter notebook --help
```

```bash
jupyter notebook --log-level DEBUG --port 8080 --notebook-dir ~ --NotebookApp.base_project_url=datalayer 
```

```
usage: jupyter [-h] [--version] [--config-dir] [--data-dir] [--runtime-dir]
               [--paths] [--json]
               [subcommand]

Jupyter: Interactive Computing

positional arguments:
  subcommand     the subcommand to launch

optional arguments:
  -h, --help     show this help message and exit
  --version      show the jupyter command's version and exit
  --config-dir   show Jupyter config dir
  --data-dir     show Jupyter data dir
  --runtime-dir  show Jupyter runtime dir
  --paths        show all Jupyter paths. Add --json for machine-readable
                 format.
  --json         output paths as machine-readable json

Available subcommands: bundlerextension kernel kernelspec lab labextension
labhub migrate nbconvert nbextension notebook run serverextension troubleshoot
trust
```
