[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Datalayer Lab JupyterHub API

This folder provides a service to be deployed in your [JupyterHub](https://github.com/jupyterhub/jupyterhub) to query the exposed JupyterHub API endpoints.

![API Browser](https://raw.githubusercontent.com/datalayer/datalayer/master/lab/jupyterhub-api/browser/docs/img/api-browser.png "API Browser")

## Environment

Ensure you have a working [Miniconda](https://conda.io/miniconda.html).

```bash
# Prepare a conda env.
conda deactivate && \
  conda remove -y --name jupyterhub_api --all && \
  conda config --add channels conda-forge && \
  conda create -y --name jupyterhub_api python=3.7 jupyterlab jupyterhub sudospawner yarn pycurl && \
  conda activate jupyterhub_api
# Install the javascript libraries and build the frontend.
# For frontend iterative development, use `yarn watch` instead of `yarn build`.
cd $DLAHOME/lab/jupyterhub-api/browser && \
  yarn install && \
  yarn build
```

## Start JupyterHub

```bash
# Start jupyterhub with the provided ./jupyterhub_config.py configuration.
jupyterhub \
  --config $DLAHOME/lab/jupyterhub-api/browser/jupyterhub_config.py \
  --no-db \
  --pid-file /tmp/jupyterhub.pid \
  --ip 127.0.0.1 \
  --port 8907 \
  --debug
# Authenticate as an admin user, which will be the user you are running the server - Run whoami to get that user.
# If you run the service with HubOAuthenticated, Authorize the OAuth access.
http://127.0.0.1:8907/services/api-browser/info
# Open the service URL in your favorite browser - Don't forget the trailing slash...
open http://127.0.0.1:8907/services/api-browser/
```

## Info

![Info](https://raw.githubusercontent.com/datalayer/datalayer/master/lab/jupyterhub-api/browser/docs/img/info.png "Info")

## Users

![Users](https://raw.githubusercontent.com/datalayer/datalayer/master/lab/jupyterhub-api/browser/docs/img/user.png "Users")

## User Management

![User Management](https://raw.githubusercontent.com/datalayer/datalayer/master/lab/jupyterhub-api/browser/docs/img/users.png "User Management")
