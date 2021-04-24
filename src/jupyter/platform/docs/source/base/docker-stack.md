---
title: Jupyter Docker Stack
---

# Jupyter Docker Stack

Docker Stacks [GitHub](https://github.com/jupyter/docker-stacks) repository.

Docker Stacks [Docs](https://jupyter-docker-stacks.readthedocs.io/en/latest).

![Stack Hierarchy](https://raw.githubusercontent.com/jupyter/docker-stacks/master/docs/images/inherit.svg?sanitize=true)

Pre-built images can be found on [Docker Hub](https://hub.docker.com/u/jupyter).

```bash
docker run -it --rm -p 8888:8888 jupyter/scipy-notebook:8a1b90cbcba5
open http://localhost:8888
```

```bash
docker run -p 8888:8888 jupyter/scipy-notebook:17aba6048f44
open http://localhost:8888/tree?token=...
open http://localhost:8888/lab?token=...
```
