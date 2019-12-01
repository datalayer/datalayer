[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Datalayer Notebook

:rocket: JupyterLab Extension for Datalayer.

![JupyterLab Datalayer](https://raw.githubusercontent.com/datalayer/datalayer/master/src/jupyter/lab/twitter/docs/jupyterlab-datalayer.gif "JupyterLab Datalayer")

> Replace `$DLAHOME/libs` in the following commands with whatever your local env looks like.

To start or develop, you first have to build `jupyterlab`.

```bash
# build jupyterlab.
cd $DLAHOME/repos/jupyterlab && \
  git checkout datalayer && \
  pip install -e . && \
  yarn install && \
#  yarn clean && \
#  yarn install && \
#  cd $DLAHOME/repos/jupyterlab/packages/cells && \
#  yarn install && \
#  yarn build && \
  jupyter lab build
```

You also have to build `@datalayer/jupyterlab-twitter` extension and enable the extension.

```bash
# build and enable `jupyterlab-datalayer` extension.
cd $DLAHOME/src/jupyter/lab/twitter && \
  make build && \
  make install && \
  make ext-enable && \
  jupyter lab build
```

Start jupyterlab with the `jupyter-twitter` extension enabled.

```bash
DLA_TWITTER_OAUTH_CALLBACK_URL=http://localhost:8888/twitter/auth/popup && \
  jupyter lab
```

## Develop

```bash
# prerequisite: install development version of the ui server.
cd $DLAHOME/src/jupyter/lab/twitter && \
  pip install -e .
```

```bash
# Shell #1 - watch the extension.
cd $DLAHOME/src/jupyter/lab/twitter && \
  make watch
# Shell #2 - run and watch jupyter lab.
#    --dev-mode \
#    --browser chromium-browser \
cd $DLAHOME/src/jupyter/lab/twitter && \
  DLA_TWITTER_OAUTH_CALLBACK_URL=http://localhost:8888/twitter/auth/popup && \
  jupyter lab \
    --watch \
    --config ./jupyter_notebook_config.py
```

In case of issue (version mismatch...), try.

```bash
jupyter lab clean && \
  jupyter lab build
```

<!--
    "@jupyterlab/cells": "file:/repos/jupyterlab/packages/cells",
-->
