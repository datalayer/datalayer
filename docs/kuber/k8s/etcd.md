---
title: Etcd
---

# Etcd

```bash
# https://github.com/kubernetes/charts/tree/master/incubator/etcd
helm repo add incubator http://storage.googleapis.com/kubernetes-charts-incubator
helm repo update
helm install --name etcd1 incubator/etcd
for i in 0 2; do kubectl exec etcd1-etcd-$i -- sh -c 'etcdctl cluster-health'; done
kubectl exec etcd1-etcd-0 -- sh -c 'etcdctl put foo bar'
```

```bash
helm install stable/etcd-operator --name etcd-operator
kubectl create -f https://coreos.com/operators/etcd/latest/example-etcd-cluster.yaml
kubectl create -f https://raw.githubusercontent.com/coreos/etcd-operator/master/example/example-etcd-cluster.yaml
kubectl create -f https://raw.githubusercontent.com/coreos/etcd-operator/master/example/example-etcd-cluster-nodeport-service.json
export ETCDCTL_API=3
export ETCDCTL_ENDPOINTS=$(minikube service example-etcd-cluster-client-service --url)
etcdctl put foo bar
```

```bash
export ETCDCTL_API=3
HOST_1=10.240.0.17
HOST_2=10.240.0.18
HOST_3=10.240.0.19
ENDPOINTS=$HOST_1:2379,$HOST_2:2379,$HOST_3:2379
etcdctl --endpoints=$ENDPOINTS member list
```

```bash
ETCDCTL_API=3
ETCDCTL_DIAL_TIMEOUT=3s
ETCDCTL_CACERT=/tmp/ca.pem
ETCDCTL_CERT=/tmp/cert.pem
ETCDCTL_KEY=/tmp/key.pem
```

```bash
./etcdctl put foo bar --lease=1234abcd
./etcdctl get foo
./etcdctl put foo --ignore-value # to detache lease

./etcdctl put foo bar --lease=1234abcd
./etcdctl put foo bar1 --ignore-lease # to use existing lease 1234abcd
./etcdctl get foo

./etcdctl put foo bar1 --prev-kv
./etcdctl get foo
```
