---
title: Developer Guide
---

# Developer Guide

Follow the following 3 steps:

+ Read about the [communities](/community/index.md) and join.
+ Read the [contribution guidelines](/community/contribute.md).
+ Install the platform with [Minikube](/install/minikube/index.md).

You are now ready to `build`.

```bash
# Useful build and run commands.
make build     # Build the needed binaries and libs.
make k8s-proxy # Start the Kubernetes Proxy.
make api-start # Start the API Server and hack on it.
```

Browse [http://localhost:9091](http://localhost:9091) or make REST call to the API.

```bash
cd $DLAHOME/repos/jupyterhub
python setup.py sdist upload -r pypi
```

```bash
cd $DLAHOME/repos/jupyterhub-k8s
python setup.py sdist && cp dist/datalayer-0.9.1.dev0.tar.gz $DLAHOME/repos/jupyterhub-k8s/images/hub
```

```bash
cd $DLAHOME/repos/jupyterlab-hub
yarn install && yarn build
npm login
npm publish --access=public
```

```bash
cd $DLAHOME/repos/jupyterhub/images/hub
docker build -t datalayer/hub:0.0.1 . && \
  docker tag datalayer/hub:0.0.1 localhost:5000/hub:0.0.1 && docker push localhost:5000/hub:0.0.1
```

```bash
cd $DLAHOME/repos
tar cvfz $DLAHOME/etc/docker/jupyterlab/jupyterlab-datalayer.tgz jupyterlab-datalayer
cd $DLAHOME/repos/datalayer-docker/hub-jupyterlab
docker build -t datalayer/hub-jupyterlab:0.0.1 . && \
  docker tag datalayer/hub-jupyterlab:0.0.1 localhost:5000/hub-jupyterlab:0.0.1 && \
  docker push localhost:5000/hub-jupyterlab:0.0.1
minikube ssh docker pull localhost:5000/hub-jupyterlab:0.0.1
```

```bash
cd $DLAHOME/repos/jupyterhub-k8s
helm delete datalayer --purge
helm install ./jupyterhub \
  --name=datalayer \
  --namespace=datalayer \
  --timeout=99999 \
  -f datalayer-config.yaml
open $(minikube -n datalayer service proxy-public --url)
```

```bash
cd $DLAHOME/repos/jupyterlab
yarn watch
cd $DLAHOME/repos/jupyterlab
jupyter lab --watch
jupyter lab --dev-mode --watch
```
