[![Datalayer](https://raw.githubusercontent.com/datalayer/datalayer/main/res/logo/datalayer-25.svg?sanitize=true)](https://datalayer.io)

# ⛵️ ⚓️ Kuber

> Kuber, create, manage and share Kubernetes clusters.

This aims to re-implement [kuber-go](https://github.com/datalayer-attic/kuber-go) in Python.

Kuber will support:

- Create (or enroll) K8S clusters.
- Backup and and disaster recovery for K8S clusters.
- Autoscale workers.
- Helm charts manager.
- Terraform manager.
- Cerberus manager.
- Conformance check and alerting.

## GCloud

- https://github.com/googleapis/python-container
- https://github.com/GoogleCloudPlatform/python-docs-samples/tree/master/kubernetes_engine/api-client

## Helm

- https://github.com/zbrookle/avionix
- https://github.com/flaper87/pyhelm
- https://github.com/aiopsclub/python-helm

## QHub

- https://www.quansight.com/post/announcing-qhub
- https://github.com/quansight/qhub
- https://github.com/Quansight/qhub-terraform-modules

<!--
Read more on the [Kuber Website](https://kuber.sh).

Build and install Kuber.

```bash
make build && \
  make install
```

You need a running minikube instance and a running K8S proxy.

```bash
dla minikube-start && \
  dla k8s-dashboard
```

Start the local Kuber server.

```bash
make build && \
  make start
```
-->
