---
title: BinderHub
---

# BinderHub

```
                                          +--- AUTH
                                          |
                       +--- JUPYTERHUB ---+--- SPAWNER --- SINGLE USER SERVER --- KERNEL
                       |                  |
BROWSER --- BINDERHUB -+                  +--- SERVICES
                       |
                       +--- REPO2DOCKER
```

Read more on [BinderHub](/binderhub/index.md).

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
