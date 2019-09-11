[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# JupyterHub API Lab

This folder provides a service to be deployed in your [JupyterHub](https://github.com/jupyterhub/jupyterhub) which allows you to query the exposed API methods.

![API Browser](https://raw.githubusercontent.com/datalayer/datalayer/master/lab/apps/jupyterhub-api/docs/img/api-browser.png "API Browser")

Ensure you have a working [Miniconda](https://conda.io/miniconda.html). Review the provided `jupyterhub_config.py` and check your environment (e.g. when you create a user, you have to ensure it exists on your local Linux system).

```bash
# Prepare a conda env.
conda deactivate && conda remove -y --name jupyterhub --all
conda config --add channels conda-forge
conda create -y --name jupyterhub python=3.7 pip notebook jupyter jupyterlab jupyterhub sudospawner yarn pycurl
conda activate jupyterhub
# Install the javascript libraries and build the frontend.
yarn install && yarn build
# Start jupyterhub in the background with the provided jupyterhub_config.py configuration.
jupyterhub --config jupyterhub_config.py --no-db --pid-file /tmp/jupyterhub.pid --ip 127.0.0.1 --port 8907 &
# Authenticate as a user (or admin user).
open http://127.0.0.1:8907
# Open the service URL in your favorite browser - Don't forget the trailing slash...
open http://127.0.0.1:8907/services/api-browser/
```

For frontend iterative development, use `yarn watch` instead of `yarn build`.

User Management

![User Management](https://raw.githubusercontent.com/datalayer/datalayer/master/lab/apps/jupyterhub-api/docs/img/users.png "User Management")

Users

![Users](https://raw.githubusercontent.com/datalayer/datalayer/master/lab/apps/jupyterhub-api/docs/img/user.png "Users")

Info

![Info](https://raw.githubusercontent.com/datalayer/datalayer/master/lab/apps/jupyterhub-api/docs/img/info.png "Info")
