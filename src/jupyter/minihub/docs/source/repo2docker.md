---
title: JupyterHub Repo2Docker
---

# JupyterHub Repo2Docker

Repo2Docker [GitHub](https://github.com/jupyterhub/repo2docker) repository.

Repo2Docker [Docs](http://repo2docker.readthedocs.io).

```bash
pip install jupyter-repo2docker
jupyter-repo2docker <YOUR-GITHUB-REPOSITORY> --image=dockerhub.io/<PROJECT-NAME>/<IMAGE-NAME>:<TAG> --no-run
docker push ...
```
