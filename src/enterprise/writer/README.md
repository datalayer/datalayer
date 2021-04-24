[![Datalayer](https://raw.githubusercontent.com/datalayer/datalayer/main/res/logo/datalayer-25.svg?sanitize=true)](https://datalayer.io)

# ✍️ 🖌️ Writer

> `Writer`, JupyterLab extension to publish on social networks

![JupyterLab Twitter](https://raw.githubusercontent.com/datalayer/writer/main/docs/jupyterlab-datalayer.gif "JupyterLab Twitter")

To start or develop, you first have to build `JupyterLab` (replace `$DLAREPOS` in the following commands with whatever your local env looks like).

```bash
# build jupyterlab.
cd $DLAREPOS/jupyterlab && \
  git checkout master && \
  pip install -e . && \
#  cd $DLAREPOS/jupyterlab//cells && \
#  yarn install && \
#  yarn build && \
  jupyter lab build
```

You also have to build `@datalayer-jupyterlab/jupyterlab-twitter` extension and enable the extension.

```bash
# build and enable `jupyterlab-datalayer` extension.
cd $DLAREPOS/jupyterlab-twitter && \
#  make clean && \
  make install && \
  make build && \
  make ext-enable && \
  jupyter lab build
```

Start JupyterLab with a environment variable that defines the Twitter callback URL.

```bash
DLA_TWITTER_OAUTH_CALLBACK_URL=http://localhost:8888/twitter/auth/popup && \
  jupyter lab
```

Develop on source code.

```bash
# Prerequisite: install development version of the ui server.
cd $DLAREPOS/jupyterlab-twitter && \
  pip install -e .
```

```bash
# Shell #1 - watch the extension.
cd $DLAREPOS/jupyterlab-twitter && \
  make watch
# Shell #2 - run and watch jupyter lab.
#    --dev-mode \
#    --browser chromium-browser \
cd $DLAREPOS/jupyterlab-twitter && \
  DLA_TWITTER_OAUTH_CALLBACK_URL=http://localhost:8888/twitter/auth/popup && \
  jupyter lab \
    --watch \
    --config ./jupyter_server_config.py
```

<!--
A React.js UI backed by JupyterLab components that allow data guys to access, view, manipulate datasets with code..., and share and publish their results. Other guys can reuse the publication and reproduce them.
-->
