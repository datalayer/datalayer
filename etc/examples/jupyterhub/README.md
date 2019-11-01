[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# JupyterHub Examples

## Install

```bash
# Install with Conda.
conda deactivate && \
  conda remove -y --name jupyterhub --all && \
  conda config --add channels conda-forge && \
  conda create --name jupyterhub -y python=3.7 pip notebook jupyter jupyterlab jupyterhub pycurl && \
  conda activate jupyterhub
```

```bash
jupyterhub --version
jupyterhub --help
jupyterhub --help-all
```

```bash
configurable-http-proxy --version
configurable-http-proxy --help
```

## Examples

Use the `<auth>`-`<spawner>-<<option>>` pattern to try various configuration.

```bash
# $DLAHOME/etc/examples/jupyterhub/README.md for `<auth>`-`<spawner>` examples combo.
conda activate jupyterhub
pip install oauthenticator oauthlib dockerspawner jupyterhub_oauth_spawner
open http://127.0.0.1:8000
jupyterhub -f $DLAHOME/etc/examples/jupyterhub/pam-local/jupyterhub_config.py
jupyterhub -f $DLAHOME/etc/examples/jupyterhub/github-local/jupyterhub_config.py
jupyterhub -f $DLAHOME/etc/examples/jupyterhub/github-docker/jupyterhub_config.py
```

```bash
# A typical configuration is `pam-docker`.
cd pam-docker
# Clean remaining DB.
rm *.sqllite
# Lanch jupyterhub.
echo http://localhost:8000
jupyterhub
```

The [generated](./generated) folder contains the default `generated` configuration obtained with `jupyterhub --generate-config`.
