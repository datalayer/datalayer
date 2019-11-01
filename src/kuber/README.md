[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Datalayer Kuber

:boat: :anchor: Kuber is an open source tool to create, manage and share Kubernetes clusters.

The Kuber Server operates Kubernetes.

+ Create (or enroll) K8S clusters.
+ Backup and and disaster recovery for K8S clusters.
+ Autoscale workers.
+ Helm charts manager.
+ Terraform manager.
+ Cerberus manager.
+ Conformance check and alerting.

Read more on the [Kuber Website](https://kuber.sh).

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

Build and install Kuber.

```bash
make build && \
  make install
```

![Kuber](https://raw.githubusercontent.com/datalayer/datalayer/master/docs/_images/what/kuber.svg?sanitize=true "Kuber")
