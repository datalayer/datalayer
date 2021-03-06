---
title: JupyterHub
---

# JupyterHub

> With JupyterHub you can create a multi-user Hub which spawns, manages, and proxies multiple instances of the single-user Jupyter notebook server.

JupyterHub, a multi-user version of the notebook designed for companies, classrooms and research labs.

The Jupyter project has created JupyterHub to support many users. The Hub can offer notebook servers to a class of students, a corporate data science workgroup, a scientific research project, or a high performance computing group.

```
                          +--- AUTH
                          |
BROWSER --- JUPYTERHUB ---+--- SPAWNER --- SINGLE_USER_SERVER --- KERNEL
                          |
                          +--- SERVICES
```

[JupyterHub GitHub](https://github.com/jupyterhub/jupyterhub) repository.

[JupyterHub Docs](https://jupyterhub.readthedocs.io).

![JupyterHub Fluxogram](https://jupyterhub.readthedocs.io/en/latest/_images/jhub-fluxogram.jpeg)

![JupyterHub Parts](https://jupyterhub.readthedocs.io/en/latest/_images/jhub-parts.png)

[Technical Overview](https://jupyterhub.readthedocs.io/en/latest/reference/technical-overview.html).

![JupyterHub Architecture](https://jupyterhub.readthedocs.io/en/latest/_images/jhub-parts.png)

![Architecture Comic from https://discourse.jupyter.org/t/hub-illustrations/1211](https://aws1.discourse-cdn.com/standard11/uploads/jupyter/optimized/1X/5d651530ffd3c349eb7e38d5dbc2a3cfdc3461fe_2_1332x1000.jpeg)

- https://github.com/jupyter-resources/jupyterhub-2016-workshop

## Community

JupyterHub on [Gitter](https://gitter.im/jupyterhub/jupyterhub).

JupyterHub [Team Compass](https://github.com/jupyterhub/team-compass).

## Design

- https://github.com/jupyterhub/design
- https://docs.google.com/presentation/d/11Ag7oj8zaRbbTSLFTMYEAP-7WWCLFJRkKaEjjjE-nSA/edit#slide=id.p

## Install

```bash
# Install jupyterhub and proxy + jupyterlab needed if running the notebook servers locally.
conda create -y -n jupyterhub jupyter jupyterlab jupyterhub==1.0.0
```

## Start

```bash
conda activate jupyterhub
jupyterhub -h
configurable-http-proxy -h
# open http://localhost:8907
jupyterhub --ip localhost --port 8907 --debug --Spawner.default_url="/lab"
```

This will create in your current folder the following files: `jupyterhub-proxy.pid`, `jupyterhub.sqlite`, `jupyterhub_cookie_secret`

Notes from the logs.

```bash
Using Authenticator: `jupyterhub.auth.PAMAuthenticator`
Using Spawner: `jupyterhub.spawner.LocalProcessSpawner`
No admin users, admin interface will be unavailable.
Add any administrative users to `c.Authenticator.admin_users` in config.
Not using whitelist. Any authenticated user will be allowed.
```

```bash
# More options.
jupyterhub --help-all
```

```bash
# open http://localhost:8907
jupyterhub \
  --ip localhost \
  --port 8907 \
  --debug \
  --Authenticator.admin_users="{'echar4'}" \
  --Spawner.notebook_dir="~" \
  --Spawner.default_url="/lab"
```

Notes from the logs.

```bash
Loading state for eric from db
JupyterHub app:1926] Loaded users:
      datalayer admin
```

Once authenticated as `admin`.

```bash
open http://localhost:8907/hub/admin
```

## Examples

Try the JupyterHub Auth and Spawner Datalayer [Examples](https://github.com/datalayer/datalayer/tree/master/etc/jupyterhub/examples).

```bash
echo http://localhost:8010
AUTH=pam && \
  SPAWN=sudo && \
  jupyterhub \
    -f $EXPHOME/etc/jupyterhub/examples/${AUTH}_${SPAWN}/jupyterhub_config.py \
    --log-level=DEBUG \
    --port 8010
```

## Documentation

```bash
cd $DLAHOME/repos/jupyterhub && \
  pip install -r docs/requirements.txt && \
  cd docs && \
  make clean html && \
  open build/html/index.html
```

## API

```
Application configuration
  Module: jupyterhub.app
    JupyterHub
Authenticators
  Module: jupyterhub.auth
    Authenticator
    LocalAuthenticator
    PAMAuthenticator
    DummyAuthenticator
Spawners
  Module: jupyterhub.spawner
    Spawner
    LocalProcessSpawner
Proxies
  Module: jupyterhub.proxy
    Proxy
    ConfigurableHTTPProxy
Users
  Module: jupyterhub.user
    UserDict
    User
Services
  Module: jupyterhub.services.service
    Service
    Services Authentication
  Module: jupyterhub.services.auth
    HubAuth
    HubOAuth
    HubAuthenticated
    HubOAuthenticated
    HubOAuthCallbackHandler
```

## Clients

- https://github.com/quansight/jhub-client
- https://github.com/minrk/jupyterhub-client

## Msc

- https://github.com/yuvipanda/jupyter-desktop-server

## See Also

- https://discourse.jupyter.org/t/request-for-implementation-mapping-notebook-user-identities-to-cloud-provider-identities/7637
- https://discourse.jupyter.org/t/request-for-implementation-jupyterhub-aware-kubernetes-cluster-autoscaler/7669
- https://discourse.jupyter.org/t/request-for-implementations-disabling-downloads-from-a-jupyterhub/7613
