[![Datalayer](https://raw.githubusercontent.com/datalayer/datalayer/main/res/logo/datalayer-25.svg?sanitize=true)](https://datalayer.io)

# Docker JupyterHub

```bash
# Build and Start.
cd $DLAHOME/etc/docker/jupyterhub && \
  make build && \
  make start && \
  sleep 3s && \
  open http://localhost:8000
```

```bash
# Stop.
make stop
```

## Community Images

- https://hub.docker.com/r/jupyterhub/k8s-hub 0.11.1
- https://hub.docker.com/r/jupyterhub/k8s-secret-sync 0.11.1
- https://hub.docker.com/r/jupyterhub/k8s-network-tools 0.11.1
- https://hub.docker.com/r/jupyterhub/k8s-singleuser-sample 0.11.1
- https://hub.docker.com/r/jupyterhub/k8s-image-awaiter 0.11.1

## See Also

- [JupyterHub Deploy Docker](https://github.com/jupyterhub/jupyterhub-deploy-docker).
