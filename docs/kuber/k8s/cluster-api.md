---
title: Kubernetes Cluster API
---

# Cluster API

[Cluster API Repository](https://github.com/kubernetes-sigs/cluster-api)

[Cluster API Book](https://kubernetes-sigs.github.io/cluster-api).

[Doc 1](https://docs.google.com/document/d/1IZ2-AZhe4r3CYiJuttyciS7bGZTTx4iMppcA8_Pr3xE/edit)

[Doc 2](https://docs.google.com/document/d/16ils69KImmE94RlmzjWDrkmFZysgB2J4lGnYMRN89WM/edit)

[Cluster API Goals & Requirements](https://docs.google.com/document/d/1gLaFv85sDXZ6MeURsmChk894yiMl-LVvrN3DRIaBopE).

[Cluster API Use Cases](https://docs.google.com/document/d/13OQjn5lxRyiW9itNPjVuP0aN_JvYJByKznQESQEDDt8).

## Commands

```bash
# Reuse an existing minikube.
clusterctl create cluster --existing-bootstrap-cluster-kubeconfig ~/.kube/config
```

```bash
kubectl get clusters
kubectl get machines
```

## Scaler

[Cluster Autoscaler](https://github.com/kubernetes/autoscaler/tree/master/cluster-autoscaler).

https://github.com/kubernetes/community/pull/2653
