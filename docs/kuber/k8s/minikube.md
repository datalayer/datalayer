---
title: Install Minikube
---

# Install Minikube

> Quick Start the Datalayer Science Platform on your local minikube.
>
> Check the [requirements](/requirements.md) to setup your local environment.

Install and start Minikube on your local env.

```bash
dla minikube-install && \
  dla minikube-start
```

Read more about [Minikube on GitHub](https://github.com/kubernetes/minikube).

## Validate

List the Pods.

```bash
k get pods --all-namespaces --watch
```

Test with a simple HTTP Headers echo.

```bash
kubectl apply -f $DLAHOME/etc/examples/k8s/echo/echo.yaml
minikube service echoheaders --url
curl $(minikube service echoheaders --url)
kubectl delete -f $DLAHOME/etc/examples/k8s/echo/echo.yaml
```

# Addons

List the Minikube addons.

```bash
dla minikube-addons
```

## Commands

Some useful Minikube commands.

```bash
minikube status
minikube ssh
minikube ip
minikube update-context
minikube logs -f
minikube start
minikube stop
minikube delete
```

## Local Registry

Share your Docker Images with a Minikube hosted local registry.

**Option 1 - Docker Env**

```bash
# This command sets up docker to use the same docker daemon as your minikube cluster does.
# This means images you build are directly available to the cluster.
eval $(minikube docker-env)
# When you no longer wish to use the minikube host, you can undo this change.
eval $(minikube docker-env -u)
```

**Option 2 - Minikube Registry Addon**

```bash
minikube addons enable registry
kubectl create -f $DLAHOME/etc/examples/k8s/registry/kube-registry.yaml
kubectl port-forward --namespace kube-system $(kubectl get po -n kube-system | grep kube-registry-v0 | awk '{print $1;}') 5000:5000
```

```bash
minikube ssh
curl http://localhost:5000
kubectl port-forward --namespace kube-system $(kubectl get po -n kube-system | grep kube-registry-v0 | awk '{print $1;}') 5000:5000
curl http://localhost:5000
```

See also https://github.com/Faithlife/minikube-registry-proxy

## Host Folder

From https://github.com/kubernetes/minikube/blob/master/docs/host_folder_mount.md

`minikube mount /path/to/dir/to/mount:/vm-mount-path` is the recommended way to mount directories into minikube so that they can be used in your local Kubernetes cluster. The command works on all supported platforms. Below is an example workflow for using `minikube mount`:

```shell
# terminal 1
$ mkdir ~/mount-dir
$ minikube mount ~/mount-dir:/mount-9p
Mounting /home/user/mount-dir/ into /mount-9p on the minikubeVM
This daemon process needs to stay alive for the mount to still be accessible...
ufs starting
# This process has to stay open, so in another terminal...
```

```shell
# terminal 2
echo "hello from host" > ~/mount-dir/hello-from-host
kubectl run -i --rm --tty ubuntu --overrides='
{
  "apiVersion": "v1",
  "kind": "Pod",
  "metadata": {
    "name": "ubuntu"
  },
  "spec": {
        "containers": [
          {
            "name": "ubuntu",
            "image": "ubuntu:14.04",
            "args": [
              "bash"
            ],
            "stdin": true,
            "stdinOnce": true,
            "tty": true,
            "workingDir": "/mount-9p",
            "volumeMounts": [{
              "mountPath": "/mount-9p",
              "name": "host-mount"
            }]
          }
        ],
    "volumes": [
      {
        "name": "host-mount",
        "hostPath": {
          "path": "/mount-9p"
        }
      }
    ]
  }
}
' --image=ubuntu:14.04 --restart=Never -- bash

Waiting for pod default/ubuntu to be running, status is Pending, pod ready: false
Waiting for pod default/ubuntu to be running, status is Running, pod ready: false
# ======================================================================================
# We are now in the pod
#=======================================================================================
root@ubuntu:/mount-9p# cat hello-from-host
hello from host
root@ubuntu:/mount-9p# echo "hello from pod" > /mount-9p/hello-from-pod
root@ubuntu:/mount-9p# ls
hello-from-host  hello-from-pod
root@ubuntu:/mount-9p# exit
exit
Waiting for pod default/ubuntu to terminate, status is Running
pod "ubuntu" deleted
# ======================================================================================
# We are back on the host
#=======================================================================================
$ cat ~/mount-dir/hello-from-pod
hello from pod
```

Some drivers themselves provide host-folder sharing options, but we plan to deprecate these in the future as they are all implemented differently and they are not configurable through minikube.

## Others

See [kind](/k8s/kind.md) for a docker based local multinode cluster.

See also.

+ [DIND](https://github.com/kubernetes-sigs/kubeadm-dind-cluster).
+ [MicroK8S](https://microk8s.io), https://github.com/ubuntu/microk8s).
+ [KubeSpawn](https://github.com/kinvolk/kube-spawn).
+ [Virtuakube](https://github.com/danderson/virtuakube).
