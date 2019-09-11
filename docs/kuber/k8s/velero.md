---
title: Velero
---

# Velero

Install Velero Service.

```bash
kubectl apply -f $DLAHOME/repos/k8s-velero/examples/common/00-prereqs.yaml
kubectl apply -f $DLAHOME/repos/k8s-velero/examples/minio
kubectl apply -f $DLAHOME/repos/k8s-velero/examples/common/10-deployment.yaml
```

```bash
kubectl apply -f $DLAHOME/repos/k8s-velero/examples/nginx-app/base.yaml
```

```bash
kubectl get deployments -l component=velero --namespace=heptio-velero
kubectl get deployments --namespace=nginx-example
open $(minikube -n nginx-example service my-nginx --url)
```

```bash
velero backup create nginx-backup --selector app=nginx
velero backup get nginx-backup
velero backup describe nginx-backup
```

```bash
kubectl delete namespace nginx-example
kubectl get deployments --namespace=nginx-example
kubectl get services --namespace=nginx-example
kubectl get namespace nginx-example
```

```bash
velero restore create --from-backup nginx-backup
velero restore get
velero restore describe nginx-backup-20180412153148
kubectl get namespace nginx-example
kubectl get deployments --namespace=nginx-example
kubectl get services --namespace=nginx-example
open $(minikube -n nginx-example service my-nginx --url)
```

```bash
velero backup delete nginx-backup
velero backup get nginx-backup
```

```bash
kubectl delete -f $DLAHOME/repos/k8s-velero/examples/common
kubectl delete -f $DLAHOME/repos/k8s-velero/examples/minio
kubectl delete -f $DLAHOME/repos/k8s-velero/examples/nginx-app/base.yaml
```

## Plugin Example

+ https://github.com/heptio/velero
+ https://github.com/heptio/velero-plugin-example

+ https://github.com/portworx/velero-plugin

+ https://www.digitalocean.com/community/tutorials/how-to-back-up-and-restore-a-kubernetes-cluster-on-digitalocean-using-heptio-velero
