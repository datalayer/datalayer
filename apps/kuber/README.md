[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Datalayer Kuber

:boat: :anchor: Create, Manage and Share K8S Clusters

Read more on the [Kuber Website](https://kuber.sh).

You need a running minikube instance and a running K8S proxy.

```bash
dla minikube-start && \
  dla minikube-dashboard && \
  make k8s-proxy
```

Start the local Kuber server.

```bash
make build && \
  make start
```

Build and install Kuber.

```bash
make build && \
  make install
```

![Kuber](https://raw.githubusercontent.com/datalayer/datalayer/master/docs/_images/what/kuber.svg?sanitize=true "Kuber")
