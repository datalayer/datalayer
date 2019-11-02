---
title: BinderHub
---

# BinderHub

> BinderHub allows you to BUILD and REGISTER a Docker image from a Git repository, then CONNECT with JupyterHub, allowing you to create a public IP address that allows users to interact with the code and environment within a live JupyterHub instance. You can select a specific branch name, commit, or tag to serve.

```
                                          +--- AUTH
                                          |
                       +--- JUPYTERHUB ---+--- SPAWNER --- SINGLE USER SERVER --- KERNEL
                       |                  |
BROWSER --- BINDERHUB -+                  +--- SERVICES
                       |
                       +--- REPO2DOCKER
```

BinderHub ties together:

+ JupyterHub to provide a scalable system for authenticating users and spawning single user Jupyter Notebook servers, and
+ Repo2Docker which generates a Docker image using a Git repository hosted online.

BinderHub is built with Python, kubernetes, tornado, npm, webpack, and sphinx.

![BinderHub Flow from https://twitter.com/choldgraf/status/1083037513336274944](https://pbs.twimg.com/media/DwYDGULWkAASgjS.jpg)

BinderHub [GitHub](https://github.com/jupyterhub/binderhub) repository.

BinderHub [Docs](https://binderhub.readthedocs.io).

Binder Example [GitHub](https://github.com/binder-examples) repository.

Binder [Gitter Commmunity](https://gitter.im/jupyterhub/binder).

Datalayer [Examples](https://github.com/datalayer/datalayer/tree/master/etc/binderhub).

```bash
dla minikube-start
helm version
cd $DLAHOME/repos/jupyter-binderhub
pip install -e . -r dev-requirements.txt
./testing/minikube/install-hub
eval $(minikube docker-env)
python -m binderhub -f testing/minikube/binderhub_config.py
open http://localhost:8585
```

## BinderHub on OVH

https://www.ovh.com/fr/blog/mybinder-and-ovh-partnership
