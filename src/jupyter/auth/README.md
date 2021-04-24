[![Datalayer](https://raw.githubusercontent.com/datalayer/datalayer/main/res/logo/datalayer-25.svg?sanitize=true)](https://datalayer.io)

# 🛡️ Jupyter Auth

The `Jupyter Auth` library provides authentication handler for the [Jupyter Server](https://github.com/jupyter-server/jupyter_server).

It depends on a [open draft WIP pull request](https://github.com/jupyter-server/jupyter_server/pull/391).

For example, to use it with GitHub authentication, you need to crate a [GitHub OAuth application](https://docs.github.com/en/developers/apps/creating-an-oauth-app) in your GitHub profile and export in your shell environment the GitHub client id and secret as the callback url as variable.

```bash
export GITHUB_CLIENT_ID=<oauth-app-client-id>
export GITHUB_CLIENT_SECRET=<oauth-app-client-secret>
export GITHUB_OAUTH_CALLBACK_URL=<oauth-calllback-url>
```

Set the Callback URL to `http://localhost:8888/login`, assuming you are running the Jupyter Server on port 8888.

![](https://raw.githubusercontent.com/datalayer/jupyter-auth/main/docs/source/images/oauth-app-example.png)

## Environment

```bash
conda deactivate && \
  conda remove -y --all -n jupyter-auth
# Create your conda environment
conda env create -f environment.yml
conda activate jupyter-auth
# Install jupyter_auth.
pip install -e .
# Build the extension and link.
jupyter labextension develop --overwrite
# List the jupyterlab extensions.
jupyter labextension list
pip list | grep jupyter-auth
```

```bash
# Run and watch the extension in shell 1.
conda activate jupyter-auth
yarn watch
```

```bash
# Run and watch jupyterlab in shell 2.
conda activate jupyter-auth
jupyter lab \
  --port 8888 \
  --watch \
  --ServerApp.jpserver_extensions="{'jupyter_auth': True}" \
  --ServerApp.login_handler_class=jupyter_auth.github.LoginHandler \
  --notebook-dir=./examples
```
