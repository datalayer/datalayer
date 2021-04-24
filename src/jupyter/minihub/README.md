[![Datalayer](https://raw.githubusercontent.com/datalayer/datalayer/main/res/logo/datalayer-25.svg?sanitize=true)](https://datalayer.io)

# ⚙️ MiniHub

> MiniHub, a JupyterHub for Developers.

## Environment

```bash
# Install with Conda.
conda deactivate && \
  conda remove -y --name minihub --all && \
  conda env create -f environment.yml && \
  conda activate minihub
```

```bash
# JupyterHub.
export JUPYTERHUB_SINGLEUSER_APP='jupyter_server.serverapp.ServerApp'
jupyterhub --version
jupyterhub --help
jupyterhub --help-all
```

```bash
# Configurable HTTP Proxy.
configurable-http-proxy --version
configurable-http-proxy --help
```
