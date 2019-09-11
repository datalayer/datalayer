[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# JupyterLab Examples

[JupyterLab](https://github.com/jupyterlab/jupyterlab) examples [docs](https://jupyterlab.readthedocs.io/en/latest/developer/examples.html).

See also PR [Add some functionality to the notebook example](https://github.com/jupyterlab/jupyterlab/pull/5833).

## Cell Example

```bash
# cell example.
cd $DLAHOME/etc/examples/jupyter/cell && \
  yarn install && \
  yarn build && \
  python main.py
```

```bash
export KG_URL=http://127.0.0.1:8889
cd $DLAHOME/etc/examples/jupyter/cell && \
  python main.py \
  --NotebookApp.session_manager_class=nb2kg.managers.SessionManager \
  --NotebookApp.kernel_manager_class=nb2kg.managers.RemoteKernelManager \
  --NotebookApp.kernel_spec_manager_class=nb2kg.managers.RemoteKernelSpecManager 
```

## Console Example

```bash
# console example.
cd $DLAHOME/etc/examples/jupyter/console && \
  yarn install && \
  yarn build && \
  python main.py
```

## File Browser Example

```bash
# file browser example.
cd $DLAHOME/etc/examples/jupyter/filebrowser && \
  yarn install && \
  yarn build && \
  python main.py
```

## Notebook Example

```bash
# notebook example.
cd $DLAHOME/etc/examples/jupyter/notebook && \
  yarn install && \
  yarn build && \
  python main.py
```

## App Example

```bash
# app example.
cd $DLAHOME/etc/examples/jupyter/app && \
  yarn install && \
  yarn build && \
  python main.py
```

## Terminal Example

```bash
# terminal example.
cd $DLAHOME/etc/examples/jupyter/terminal && \
  yarn install && \
  yarn build && \
  python main.py
```

## Examples

```bash
# notebooks example.
cd $DLAHOME/etc/examples/jupyter/notebooks && \
  jupyter lab
```

```bash
# vega example.
cd $DLAHOME/etc/examples/jupyter/vega && \
  jupyter lab
```

## Build All Examples

```bash
# Build the examples from the jupyterlab repository.
cd $DLAHOME/repos/jupyterlab && \
  git checkout master && \
  yarn install && \
  jupyter lab build && \
  yarn build:examples
```
