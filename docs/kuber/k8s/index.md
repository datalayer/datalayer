---
title: Kubernetes
---

# Kubernetes

> Kubernetes (K8S) is an open-source system for automating deployment, scaling, and management of containerized applications.

The Kubernetes [Web Site](https://kubernetes.io) and the [GitHub](https://github.com/kubernetes) repositories.

Join the [discussions](https://discuss.kubernetes.io) around Kubernetes.

[GitHub Org for Kubernetes SIG-related work](https://github.com/kubernetes-sigs).

The [Slack](http://kubernetes.slack.com) channels.

The [Landscape](https://landscape.cncf.io) (search for logo, e.g. [etcd](https://landscape.cncf.io/selected=etcd)).

## Playground

[Katacoda](https://www.katacoda.com/courses/kubernetes/playground) or [Play with K8S](https://labs.play-with-k8s.com/).

## Info

[TGIK](https://github.com/heptio/tgik/blob/master/playlist.md).

## CI / CD

[Test Grid](https://k8s-testgrid.appspot.com).

[Gubernator PR Dashboard](https://gubernator.k8s.io).

## Useful Tools

Install [minikube](/install/k8s/minikube.md) for local Kubernetes Cluster.

```bash
dla minikube-install
eval $(minikube docker-env)
dla minikube-start
```

Install Kubectl, the CLI control command for Kubernetes.

```bash
dla kubectl-install
echo "source <(kubectl completion bash)" >> ~/.bashrc
source ~/.bashrc
```

Install [helm](/k8s/helm.md), the package manager for Kubernetes.

```bash
dla helm-install
dla helm-deploy
```

## Useful Tutorials

[Kubernetes by Example](http://kubernetesbyexample.com), see also the [GitHub repository](https://github.com/openshift-evangelists/kbe) - This page borrows content from that great tutorial.

[Kuard](https://github.com/kubernetes-up-and-running/kuard), Demo app for `Kubernetes Up and Running` book, see also the [examples](https://github.com/kubernetes-up-and-running/examples).

[Kubernetes workshop for newbies](https://github.com/zoobab/kubernetes-workshop).

## Kubectl Basics

[Accessing a Cluster](https://kubernetes.io/docs/tasks/access-application-cluster/access-cluster).

Basic `Kubectl` commands, just teasers...

```bash
# kubectl run echoserver --generator=run-pod/v1 --image=gcr.io/google_containers/echoserver:1.10 --port=8080
kubectl run echoserver --generator=deployment/apps.v1 --image=gcr.io/google_containers/echoserver:1.10 --port=8080
kubectl expose deployment echoserver --type=NodePort
curl $(minikube service echoserver --url)
kubectl delete services echoserver
kubectl delete deployment echoserver
```

```bash
kubectl run nginx --image=nginx --port=8080
kubectl run -it echoserver2 --image-pull-policy=IfNotPresent --image=gcr.io/google_containers/echoserver:1.10 --restart=Never -- bash
```

```bash
kubectl run -it busybox --image=busybox --restart=Never -- sh
```

```bash
kubectl run --restart=Never --image=gcr.io/kuar-demo/kuard-amd64:1 kuard
echo http://localhost:8080
kubectl port-forward kuard 8080:8080
curl localhost:8080
```

```bash
kubectl get pods
kubectl get pods -o wide
kubectl get pods -o yaml
kubectl get pods --all-namespaces
kubectl get deployments
```

```bash
# watch.
kubectl get pods --watch
watch kubectl get pods --all-namespaces
```

Force delete a pod.

```bash
kubectl delete pods echoserver --grace-period=0 --force
```

**Kubectl with STDIN - Option 1**

```bash
cat << EOF | kubectl apply -f -
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  name: dla-rbac
subjects:
  - kind: ServiceAccount
    # Reference to upper's metadata.name
    name: default
    # Reference to upper's metadata.namespace
    namespace: default
roleRef:
  kind: ClusterRole
  name: cluster-admin
  apiGroup: rbac.authorization.k8s.io
EOF
```

**Kubectl with STDIN - Option 2**

```bash
echo """
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  name: dla-rbac
subjects:
  - kind: ServiceAccount
    # Reference to upper's `metadata.name`
    name: default
    # Reference to upper's `metadata.namespace`
    namespace: default
roleRef:
  kind: ClusterRole
  name: cluster-admin
  apiGroup: rbac.authorization.k8s.io
""" | kubectl create -f -
```

**Kubectl from URL**

```bash
curl https://raw.githubusercontent.com/datalayer/datalayer/master/lab/k8s/pods/pod.yaml \
  | kubectl apply -f -
```

**Kubectl from File**

```bash
cat << EOF >>pod.yaml
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  name: dla-rbac
subjects:
  - kind: ServiceAccount
    # Reference to upper's metadata.name
    name: default
    # Reference to upper's metadata.namespace
    namespace: default
roleRef:
  kind: ClusterRole
  name: cluster-admin
  apiGroup: rbac.authorization.k8s.io
EOF
kubectl apply -f pod.yaml
```

## Kubectl Query

Use selectors.

```bash
kubectl get po --field-selector=status.phase==Running -l app=k8s-watcher
```

Use [jq](https://stedolan.github.io/jq).

```bash
kubectl get pods -a --all-namespaces -o json  | jq -r '.items[] | select(.status.phase != "Running" or ([ .status.conditions[] | select(.type == "Ready" and .status == "False") ] | length ) == 1 ) | .metadata.namespace + "/" + .metadata.name'
```

## Configuration

Typical configuration locations.

```bash
export KUBECONFIG=~/.kube/config
export KUBECONFIG=~/.kube/admin.conf
export KUBECONFIG=/etc/kubernetes/admin.conf
```

```bash
kubectl --kubeconfig ~/.kube/config get pods
```

```bash
kubectl config view
kubectl config view --flatten=true
```

```yaml
apiVersion: v1
clusters:
- cluster:
    certificate-authority: ~/.minikube/ca.crt
    server: https://192.168.64.3:8443
  name: minikube
contexts:
- context:
    cluster: minikube
    user: minikube
  name: minikube
current-context: minikube
kind: Config
preferences: {}
users:
- name: minikube
  user:
    client-certificate: ~/.minikube/client.crt
    client-key: ~/.minikube/client.key
```

```bash
openssl rsa -in ~/.minikube/client.key -check
openssl x509 -in ~/.minikube/ca.crt -text -noout
openssl x509 -in ~/.minikube/client.crt -text -noout
```

## Nodes

In Kubernetes, the nodes are the worker machines where your pods run.

As a developer you typically don't deal with nodes, however as an admin you might want to familiarize yourself with node [operations](https://kubernetes.io/docs/concepts/nodes/node).

To list available nodes in your cluster (note that the output will depend on the environment you're using.

```bash
kubectl get nodes
```

One interesting task, from a developer point of view, is to make Kubernetes schedule a pod on a certain node. For this, we first need to label the node we want to target.

```bash
kubectl label nodes 192.168.99.100 shouldrun=here
```

Now we can create a [pod](https://github.com/datalayer/datalayer/blob/master/lab/k8s/nodes/pod.yaml) that gets scheduled on the node with the label `shouldrun=here`.

```bash
kubectl create -f https://raw.githubusercontent.com/datalayer/datalayer/master/lab/k8s/nodes/pod.yaml
kubectl get pods --output=wide
```

To learn more about a specific node, `192.168.99.100` in our case, do.

```bash
kubectl describe node 192.168.99.100
```

```bash
kubectl get nodes
kubectl describe nodes
```

Taint master to host pods.

```bash
# This will remove the node-role.kubernetes.io/master taint from any nodes that have it, including the master node, meaning that the scheduler will then be able to schedule pods everywhere
kubectl taint nodes --all node-role.kubernetes.io/master-
```

Marking a node as unschedulable will prevent new pods from being scheduled to that node, but will not affect any existing pods on the node.
This is useful as a preparatory step before a node reboot, etc.

```bash
# For example, mark a node unschedulable.
kubectl cordon $NODENAME
kubectl uncordon $NODENAME
```

## Security

[Access the Cluster](https://kubernetes.io/docs/tasks/access-application-cluster/access-cluster).

[Controlling Access](https://kubernetes.io/docs/reference/access-authn-authz/controlling-access) to the Kubernetes API.

[Info on Kubernetes Security](https://kubernetes-security.info), see also the [GitHub k8s-sec](https://github.com/k8s-sec/k8s-sec.github.io) repository.

## Authentication

Kubernetes has two categories of users to [authenticate](https://kubernetes.io/docs/reference/access-authn-authz/authentication):

+ `Service Accounts`: Managed by Kubernetes. Service accounts are users managed by the Kubernetes API. They are bound to specific namespaces, and created automatically by the API server or manually through API calls. Service accounts are tied to a set of credentials stored as Secrets, which are mounted into pods allowing in-cluster processes to talk to the Kubernetes API.
+ `Normal Users`: Normal users are assumed to be managed by an outside, independent service. An admin distributing private keys, a user store like Keystone or Google Accounts, even a file with a list of usernames and passwords. In this regard, Kubernetes does not have objects which represent normal user accounts. Normal users cannot be added to a cluster through an API call.

Once TLS is established, the HTTP request moves to the Authentication step. The cluster creation script or cluster admin configures the API server to run one or more Authenticator Modules. Authenticators are described in more detail here.

The input to the authentication step is the entire HTTP request, however, it typically just examines the headers and/or client certificate. Authentication modules include:

+ Client Certificates.
+ Password.
+ Plain Tokens
+ [Bootstrap Tokens](https://kubernetes.io/docs/reference/access-authn-authz/bootstrap-tokens).
+ JWT Tokens used for service accounts.
+ [OpenID Connect Tokens](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#openid-connect-tokens).

API requests are tied to either a normal user or a service account, or are treated as anonymous requests. This means every process inside or outside the cluster, from a human user typing kubectl on a workstation, to kubelets on nodes, to members of the control plane, must authenticate when making requests to the API server, or be treated as an anonymous user.

```bash
kubectl config set-credentials eric --username eric --password eric123
kubectl config set-credentials eric --token erictoken
```

+ https://medium.com/@pmvk/step-by-step-guide-to-integrate-ldap-with-kubernetes-1f3fe1ec644e

## Service Account

[Service Account](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account)

```bash
kubectl get sa --all-namespaces
kubectl create serviceaccount datalayer
kubectl get serviceaccounts datalayer -o yaml
# The created secret holds the public CA of the API server and a signed JSON Web Token (JWT).
kubectl get secret datalayer-token-... -o yaml
```

Values are base64 encoded because secrets are always base64 encoded. The signed JWT can be used as a bearer token to authenticate as the given service account.

```
Authorization: Bearer ...
```

Normally these secrets are mounted into pods for in-cluster access to the API server, but can be used from outside the cluster as well.

Service accounts authenticate with the username system:serviceaccount:(NAMESPACE):(SERVICEACCOUNT), and are assigned to the groups system:serviceaccounts and system:serviceaccounts:(NAMESPACE).

WARNING: Because service account tokens are stored in secrets, any user with read access to those secrets can authenticate as the service account. Be cautious when granting permissions to service accounts and read capabilities for secrets.

### OpenID Connect Tokens

Read more about [OpenID Connect Tokens](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#openid-connect-tokens).

![K8S OIDC Login](/_images/k8s/k8s_oidc_login.svg "K8S OIDC Login")

## Authorization

Kubernetes supports multiple [Authorization modules](https://kubernetes.io/docs/reference/access-authn-authz/authorization), such as ABAC mode, RBAC Mode, and Webhook mode. When an administrator creates a cluster, they configured the authorization modules that should be used in the API server. If more than one authorization modules are configured, Kubernetes checks each module, and if any module authorizes the request, then the request can proceed. If all of the modules deny the request, then the request is denied (HTTP status code 403).

## RBAC

Read about [Authorization](https://kubernetes.io/docs/reference/access-authn-authz/authorization) and [RBAC Authorization](https://kubernetes.io/docs/reference/access-authn-authz/rbac).

```bash
cat << EOF | kubectl apply -f -
apiVersion: v1
kind: ServiceAccount
metadata:
  name: default
  namespace: default
EOF
```

```bash
cat << EOF | kubectl apply -f -
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  name: dla-rbac
subjects:
  - kind: ServiceAccount
    # Reference to upper's `metadata.name`
    name: default
    # Reference to upper's `metadata.namespace`
    namespace: default
roleRef:
  kind: ClusterRole
  name: cluster-admin
  apiGroup: rbac.authorization.k8s.io
EOF
```

```bash
kubectl create clusterrolebinding default-admin --clusterrole=cluster-admin --user=eric
```

```bash
kubectl auth can-i create pods
kubectl auth can-i create configmap
kubectl auth can-i create secretskubectl auth can-i list pods
kubectl auth can-i list configmap
kubectl auth can-i list secrets 
```

DO NOT DO THIS, you are granting all permissions...

```bash
kubectl create clusterrolebinding add-on-cluster-admin \
  --clusterrole=cluster-admin \
  --serviceaccount=kube-system:default
```

```yaml
kind: Role
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  namespace: accounting
  name: pod-reader
rules:
- apiGroups: [""] # "" indicates the core API group
  resources: ["pods"]
  verbs: ["get", "watch", "list"]
```

## Admission Control

[Admission Control modules](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers) are software modules that can modify or reject requests. In addition to the attributes available to Authorization Modules, Admission Control Modules can access the contents of the object that is being created or updated. They act on objects being created, deleted, updated or connected (proxy), but not reads.

Multiple admission controllers can be configured. Each is called in order. Unlike Authentication and Authorization Modules, if any admission controller module rejects, then the request is immediately rejected. In addition to rejecting objects, admission controllers can also set complex defaults for fields. Once a request passes all admission controllers, it is validated using the validation routines for the corresponding API object, and then written to the object store.

## API

[Access the Cluster](https://kubernetes.io/docs/tasks/access-application-cluster/access-cluster).

## OutCluster API

```bash
kubectl proxy --port=8001
open http://localhost:8001/api/v1
```

```bash
kubectl proxy --port=8001
curl http://localhost:8001/api
open http://localhost:8001/swagger-ui
curl -s http://localhost:8001/api/v1/nodes
curl -s http://kuberenetes:8001/api/v1/nodes
curl -s http://localhost:8001/api/v1/nodes | jq '.items[] .metadata.labels'
```

```bash
APISERVER=$(kubectl config view --minify | grep server | cut -f 2- -d ":" | tr -d " ")
TOKEN=$(kubectl describe secret $(kubectl get secrets | grep "^default" | cut -f1 -d ' ') | grep -E '^token' | cut -f2 -d':' | tr -d " ")
curl $APISERVER/api --header "Authorization: Bearer $TOKEN" --insecure
```

## InCluster API

When accessing the API from a pod, locating and authenticating to the apiserver are somewhat different.

The recommended way to locate the apiserver within the pod is with the kubernetes.default.svc DNS name, which resolves to a Service IP which in turn will be routed to an apiserver.

The recommended way to authenticate to the apiserver is with a service account credential. By kube-system, a pod is associated with a service account, and a credential (token) for that service account is placed into the filesystem tree of each container in that pod, at /var/run/secrets/kubernetes.io/serviceaccount/token.

If available, a certificate bundle is placed into the filesystem tree of each container at /var/run/secrets/kubernetes.io/serviceaccount/ca.crt, and should be used to verify the serving certificate of the apiserver.

Finally, the default namespace to be used for namespaced API operations is placed in a file at /var/run/secrets/kubernetes.io/serviceaccount/namespace in each container.

From within a pod the recommended ways to connect to API are:

Run kubectl proxy in a sidecar container in the pod, or as a background process within the container. This proxies the Kubernetes API to the localhost interface of the pod, so that other processes in any container of the pod can access it.
Use the Go client library, and create a client using the rest.InClusterConfig() and kubernetes.NewForConfig() functions. They handle locating and authenticating to the apiserver. [example](https://github.com/kubernetes/client-go/blob/master/examples/in-cluster-client-configuration/main.go).

In each case, the credentials of the pod are used to communicate securely with the apiserver.

Run env command inside a pod.

```bash
echo $KUBERNETES_SERVICE_HOST
echo $KUBERNETES_SERVICE_PORT
```

```bash
cat /var/run/secrets/kubernetes.io/serviceaccount/token
cat /var/run/secrets/kubernetes.io/serviceaccount/namespace
cat /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
```

## Go Client

To get the library, run the following command: go get k8s.io/client-go/<version number>/kubernetes, see INSTALL.md for detailed installation instructions. See https://github.com/kubernetes/client-go to see which versions are supported.

Write an application atop of the client-go clients. Note that client-go defines its own API objects, so if needed, please import API definitions from client-go rather than from the main repository, e.g., import "k8s.io/client-go/1.4/pkg/api/v1" is correct.

The Go client can use the same kubeconfig file as the kubectl CLI does to locate and authenticate to the apiserver. See this example.

If the application is deployed as a Pod in the cluster, please refer to the next section.

[Building stuff with the Kubernetes API (Part 4) — Using Go](https://medium.com/programming-kubernetes/building-stuff-with-the-kubernetes-api-part-4-using-go-b1d0e3c1c899).

[Using the Kubernetes API with Go](https://www.katacoda.com/mhausenblas/scenarios/k8s-go).

[Programming Kubernetes with the Go SDK](https://www.youtube.com/watch?v=qiB4RxCDC8o).

[Using Kubernetes API from Go](https://www.youtube.com/watch?v=QIMz4V9WxVc).

## Python client

To use Python client, run the following command: pip install kubernetes. See Python Client Library page for more installation options.

The Python client can use the same kubeconfig file as the kubectl CLI does to locate and authenticate to the apiserver. See [this example](https://github.com/kubernetes-client/python/tree/master/examples/example1.py).

## Pod

> A pod is a collection of containers sharing a network and mount namespace and is the basic unit of deployment in Kubernetes.

All containers in a pod are scheduled on the same node.

To launch a pod using the container [image datalayer/simple:0.0.3](https://hub.docker.com/r/datalayer/simple) and exposing a HTTP API on port `9876`, execute.

```bash
kubectl run dla --image=datalayer/simple:0.0.3 --port=9876
```

We can now see that the pod is running.

```bash
kubectl get pods
kubectl describe pod dla-... | grep IP:
```

From within the cluster (e.g. via `minikube ssh`) this pod is accessible via the pod IP `172.17.0.3`, which we've learned from the `kubectl describe` command above.

```bash
curl 172.17.0.3:9876/info
{"host": "172.17.0.3:9876", "version": "0.5.0", "from": "172.17.0.1"}
```

Note that `kubectl run` creates a deployment, so in order to get rid of the pod you have to execute `kubectl delete deployment dla`.

You can also create a pod from a specification file. In this case the [pod](https://github.com/datalayer/datalayer/blob/master/lab/k8s/pods/pod.yaml) is running the already known `simple` image from above along with a generic `CentOS` container.

```bash
kubectl create -f https://raw.githubusercontent.com/datalayer/datalayer/master/lab/k8s/pods/pod.yaml
kubectl get pods | grep twocontainers
```

Now we can exec into the `centos` container and access the `simple` on localhost.

```bash
kubectl exec twocontainers -c shell -i -t -- bash
curl -s localhost:9876/info
{"host": "localhost:9876", "version": "0.5.0", "from": "127.0.0.1"}
```

Specify the `resources` field in the pod to influence how much CPU and/or RAM a container in a [pod](https://github.com/datalayer/datalayer/blob/master/lab/k8s/pods/constraint-pod.yaml) can use (here: `64MB` of RAM and `0.5` CPUs).

```bash
kubectl create -f https://raw.githubusercontent.com/datalayer/datalayer/master/lab/k8s/pods/constraint-pod.yaml
kubectl describe pod constraintpod
```

Learn more about resource constraints in Kubernetes via the docs [here](https://kubernetes.io/docs/tasks/configure-pod-container/assign-cpu-ram-container) and [here](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container).

To remove all the pods created, run.

```bash
kubectl delete pod twocontainers
kubectl delete pod constraintpod
```

To sum up, launching one or more containers (together) in Kubernetes is simple, however doing it directly as shown above comes with a serious limitation: you have to manually take care of keeping them running in case of a failure. A better way to supervise pods is to use [replication controllers](#rcs), or even better [deployments](#deployments), giving you much more control.

```bash
cat <<EOF | kubectl create -f -
apiVersion: v1
kind: Pod
metadata:
  name: aws-cli
  labels:
    name: aws-cli
  annotations:
    iam.amazonaws.com/role: arn:aws:iam::xxx:role/kubeadm_role
#    iam.amazonaws.com/external-id: external-id
spec:
  containers:
  - image: fstab/aws-cli
    command: [ "/bin/bash", "-c", "--" ]
    args: [ "while true; do sleep 30; done;" ]
#      - "/home/aws/aws/env/bin/aws"
#      - "s3"
#      - "ls"
    name: aws-cli
EOF
kubectl logs aws-cli
kubectl exec -it aws-cli -n default -- bash
kubectl delete pod aws-cli
```

## Pod Exec

```bash
kubectl exec -it <pod_name> -c <container_name> -- <cmd> <args>
```

## Pod File Transfer

```bash
kubectl cp <file-spec-src> <file-spec-dest>
# POD in a specific container.
kubectl cp <file-spec-src> <file-spec-dest> -c <specific-container>
#  Copy /tmp/foo local file to /tmp/bar in a remote pod in namespace.
kubectl cp /tmp/foo <some-namespace>/<some-pod>:/tmp/bar
# Copy /tmp/foo from a remote pod to /tmp/bar locally.
kubectl cp <some-namespace>/<some-pod>:/tmp/foo /tmp/bar
```

## Namespace

Namespaces provide for a scope of Kubernetes objects. You can think of it as a workspace you're sharing with other users. Many objects such as pods and services are namespaced, while some (like nodes) are not. As a developer you'd usually simply use an assigned namespace, however admins may wish to manage them, for example to set up access control or resource quotas.

Let's list all namespaces (note that the output will depend on the environment you're using.

```bash
kubectl get ns
```

You can learn more about a namespace using the `describe` verb, for example.

```bash
kubectl describe ns default
```

Let's now create a new [namespace](https://github.com/datalayer/datalayer/blob/master/lab/k8s/ns/ns.yaml) called `test` now.

```bash
kubectl create -f https://raw.githubusercontent.com/datalayer/datalayer/master/lab/k8s/ns/ns.yaml
kubectl get ns
```

To launch a [pod](https://github.com/datalayer/datalayer/blob/master/lab/k8s/ns/pod.yaml) in the newly created namespace `test`, do.

```bash
kubectl create --namespace=test -f https://raw.githubusercontent.com/datalayer/datalayer/master/lab/k8s/ns/pod.yaml
```

Note that using above method the namespace becomes a runtime property, that is, you can easily deploy the same pod or service, or RC, etc. into multiple namespaces (for example: `dev` and `prod`). If you however prefer to hard-code the namespace, you can define it directly in the `metadata` like so.

```
apiVersion: v1
kind: Pod
metadata:
  name: podintest
  namespace: test
```

To list namespaced objects such as our pod `podintest`, run following command as.

```bash
kubectl get pods --namespace=test
```

You can remove the namespace (and everything inside) with.

```bash
kubectl delete ns test
```

If you're an admin, you might want to check out the [docs](https://kubernetes.io/docs/tasks/administer-cluster/namespaces/) for more info how to handle namespaces.

```bash
kubectl get ns
kubectl describe ns default
```

## Logs

Logging is one option to understand what is going on inside your applications and the cluster at large. Basic logging in Kubernetes makes the output a container produces available, which is a good use case for debugging. More advanced [setups](http://some.ops4devs.info/logging) consider logs across nodes and store them in a central place, either within the cluster or via a dedicated (cloud-based) service.

Let's create a [pod](https://github.com/datalayer/datalayer/blob/master/lab/k8s/logging/pod.yaml) called `logme` that runs a container writing to `stdout` and `stderr`.

```bash
kubectl create -f https://raw.githubusercontent.com/datalayer/datalayer/master/lab/k8s/logging/pod.yaml
```

To view the five most recent log lines of the `gen` container in the `logme` pod, execute.

```bash
kubectl logs --tail=5 logme -c gen
```

To stream the log of the `gen` container in the `logme` pod (like `tail -f`), do.

```bash
kubectl logs -f --since=10s logme -c gen
```

Note that if you wouldn't have specified `--since=10s` in the above command, you would have gotten all log lines from the start of the container.

You can also view logs of pods that have already completed their lifecycle. For this we create a [pod](https://github.com/datalayer/datalayer/blob/master/lab/k8s/logging/oneshotpod.yaml) called `oneshot` that counts down from 9 to 1 and then exits. Using the `-p` option you can print the logs for previous instances of the container in a pod.

```bash
kubectl create -f https://raw.githubusercontent.com/datalayer/datalayer/master/lab/k8s/logging/oneshotpod.yaml
kubectl logs -p oneshot -c gen
```

You can remove the created pods with.

```bash
kubectl delete pod/logme pod/oneshot
```

```bash
kubectl logs -f <pod>
```

## Health Check

In order to verify if a container in a pod is healthy and ready to serve traffic, Kubernetes provides for a range of health checking mechanisms. Health checks, or probes as they are called in Kubernetes, are carried out by the [kubelet](https://kubernetes.io/docs/admin/kubelet) to determine when to restart a container (for `livenessProbe`) and by [services](#services) to determine if a pod should receive traffic or not (for `readinessProbe`).

We will focus on HTTP health checks in the following. Note that it is the responsibility of the application developer to expose a URL that the kubelet can use to determine if the container is healthy (and potentially ready).

Let's create a [pod](https://github.com/datalayer/datalayer/blob/master/lab/k8s/healthz/pod.yaml) that exposes an endpoint `/health`, responding with a HTTP `200` status code.

```bash
kubectl create -f https://raw.githubusercontent.com/datalayer/datalayer/master/lab/k8s/healthz/pod.yaml
```

In the pod specification we've defined the following.

```
livenessProbe:
  initialDelaySeconds: 2
  periodSeconds: 5
  httpGet:
    path: /health
    port: 9876
```

Above means that Kubernetes will start checking `/health` endpoint in every 5 seconds after waiting 2 seconds for the first check.

If we now look at the pod we can see that it is considered healthy.

```bash
kubectl describe pod hc
```

Now we launch a [bad pod](https://github.com/datalayer/datalayer/blob/master/lab/k8s/healthz/badpod.yaml), that is, a pod that has a container that randomly (in the time range 1 to 4 sec) does not return a 200 code.

```bash
kubectl create -f https://raw.githubusercontent.com/datalayer/datalayer/master/lab/k8s/healthz/badpod.yaml
```

Looking at the events of the bad pod, we can see that the health check failed:

```bash
kubectl describe pod badpod
```

This can also be verified as follows.

```bash
kubectl get pods
```

From above you can see that the `badpod` had already been re-launched 4 times, since the health check failed.

In addition to a `livenessProbe` you can also specify a `readinessProbe`, which can be configured in the same way but has a different use case and semantics: it's used to check the start-up phase of a container in the pod. Imagine a container that loads some data from external storage such as S3 or a database that needs to initialize some tables. In this case you want to signal when the container is ready to serve traffic.

Let's create a [pod](https://github.com/datalayer/datalayer/blob/master/lab/k8s/healthz/ready.yaml) with a `readinessProbe` that kicks in after 10 seconds.

```bash
kubectl create -f https://raw.githubusercontent.com/datalayer/datalayer/master/lab/k8s/healthz/ready.yaml
```

Looking at the events of the pod, we can see that, eventually, the pod is ready to serve traffic:

```bash
kubectl describe pod ready
```

You can remove all the created pods with.

```bash
kubectl delete pod/hc pod/ready pod/badpod
```

Learn more about configuring probes, including TCP and command probes, via the [docs](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes).

## Replication Controller

A replication controller `RC` is a supervisor for long-running pods.

An RC will launch a specified number of pods called `replicas` and makes sure that they keep running, for example when a node fails or something inside of a pod, that is, in one of its containers goes wrong.

Let's create an [RC](https://github.com/datalayer/datalayer/blob/master/lab/k8s/rc/rc.yaml) that supervises a single replica of a pod.

```bash
kubectl create -f https://raw.githubusercontent.com/datalayer/datalayer/master/lab/k8s/rc/rc.yaml
```

You can see the RC and the pod it looks after like so.

```bash
kubectl get rc
kubectl get pods --show-labels
```

Note two things here.

1. The supervised pod got a random name assigned (`rcex-qrv8j`).
1. The way the RC keeps track of its pods is via the label, here `app=dla`.

To scale up, that is, to increase the number of replicas, do.

```bash
kubectl scale --replicas=3 rc/rcex
kubectl get pods -l app=dla
```

Finally, to get rid of the RC and the pods it is supervising, use.

```bash
kubectl delete rc rcex
```

Note that, going forward, the RCs are called [replica sets](https://kubernetes.io/docs/concepts/workloads/controllers/replicaset) (RS), supporting set-based selectors. The RS are already in use in the context of [deployments](#deployments).

## Deployment

A deployment is a supervisor for [pods](#pods) and [replica sets](#rcs), giving you fine-grained control over how and when a new pod version is rolled out as well as rolled back to a previous state.

Let's create a [deployment](https://github.com/datalayer/datalayer/blob/master/lab/k8s/deployments/d09.yaml) called `dla-deploy` that supervises two replicas of a pod as well as a replica set.

```bash
kubectl create -f https://raw.githubusercontent.com/datalayer/datalayer/master/lab/k8s/deployments/d09.yaml
```

You can see the deployment, the replica set and the pods it looks after like so.

```bash
kubectl get deploy
kubectl get rs
kubectl get pods
```

Note the naming of the pods and replica set, derived from the deployment name.

At this point in time the `dla` containers running in the pods are configured to return the version `0.9`. Let's verify that from within the cluster (using `kubectl describe` first to get the IP of one of the pods):

```bash
curl 172.17.0.3:9876/info
{"host": "172.17.0.3:9876", "version": "0.9", "from": "172.17.0.1"}
```

Let's now see what happens if we change that version to `1.0` in an updated [deployment](https://github.com/datalayer/datalayer/blob/master/lab/k8s/deployments/d10.yaml).

```bash
kubectl apply -f https://raw.githubusercontent.com/datalayer/datalayer/master/lab/k8s/deployments/d10.yaml
```

Note that you could have used `kubectl edit deploy/dla-deploy` alternatively to achieve the same by manually editing the deployment.

What we now see is the rollout of two new pods with the updated version `1.0` as well as the two old pods with version `0.9` being terminated.

```bash
kubectl get pods
```

Also, a new replica set has been created by the deployment.

```bash
kubectl get rs
```

Note that during the deployment you can check the progress using `kubectl rollout status deploy/dla-deploy`.

To verify that if the new `1.0` version is really available, we execute from within the cluster (again using `kubectl describe` get the IP of one of the pods).

```bash
curl 172.17.0.5:9876/info
{"host": "172.17.0.5:9876", "version": "1.0", "from": "172.17.0.1"}
```

A history of all deployments is available via.

```bash
kubectl rollout history deploy/dla-deploy
```

If there are problems in the deployment Kubernetes will automatically roll back to the previous version, however you can also explicitly roll back to a specific revision, as in our case to revision 1 (the original pod version).

```bash
kubectl rollout undo deploy/dla-deploy --to-revision=1
kubectl rollout history deploy/dla-deploy
kubectl get pods
```

At this point in time we're back at where we started, with two new pods serving again version `0.9`.

Finally, to clean up, we remove the deployment and with it the replica sets and pods it supervises.

```bash
kubectl delete deploy dla-deploy
```

See also the [docs](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) for more options on deployments and when they are triggered.

## Rollout Status

```bash
kubectl rollout status -w deployment/tiller-deploy --namespace=kube-system
```

## Networking

```bash
# CIDR
kubectl get nodes -o json | grep -i podCIDR
```

CoreDNS is used to resolve IP address to names.

```bash
kubectl run -it busybox --image=busybox --restart=Never -- sh
cat /etc/resolv.conf
nslookup kubernetes.default
nslookup datalayer.io
```

```bash
# cat /etc/resolv.conf
nameserver 10.96.0.10
search default.svc.cluster.local svc.cluster.local cluster.local us-west-2.compute.internal
options ndots:5
# nslookup kubernetes.default
Server:    10.96.0.10
Address 1: 10.96.0.10 kube-dns.kube-system.svc.cluster.local

Name:      kubernetes.default
Address 1: 10.96.0.1 kubernetes.default.svc.cluster.local
# nslookup datalayer.io
Server:    10.96.0.10
Address 1: 10.96.0.10 kube-dns.kube-system.svc.cluster.local

Name:      datalayer.io
Address 1: 40.114.91.190
```

```bash
kubectl apply -f https://raw.githubusercontent.com/datalayer/datalayer/master/lab/k8s/dns/dns-cm.yaml
kubectl create -f https://raw.githubusercontent.com/datalayer/datalayer/master/lab/k8s/dns/dns-1.yaml
kubectl get pods dla-dns-test -w
kubectl exec dla-dns-test cat /etc/resolv.conf
kubectl exec -it dla-dns-test -- nslookup kubernetes.default
kubectl create -f https://raw.githubusercontent.com/datalayer/datalayer/master/lab/k8s/dns/dns-2.yaml
kubectl get pods dla-dns-test-2 -w
kubectl exec dla-dns-test-2 cat /etc/resolv.conf
kubectl exec -it dla-dns-test-2 -- nslookup kubernetes.default
  Server:    10.0.0.10
  Address 1: 10.0.0.10
  Name:      kubernetes.default
  Address 1: 10.0.0.1
```

```bash
kubectl exec -it dla-dns-test-2 -- nslookup dla-dns-test
```

KubeDNS is deprecated.

```yaml
vi /etc/kubernetes/addons/kube-dns-cm.yaml
apiVersion: v1
kind: ConfigMap 
metadata:
  name: kube-dns
  namespace: kube-system
data:
#  stubDomains: |
#    {“acme.local”: [“1.2.3.4”]}
  upstreamNameservers: |
    [“8.8.8.8”, “8.8.4.4”]
```
    
```bash
kubectl patch configmap/kube-dns -p '{"dnsPolicy": "ClusterFirstWithHostNet"}' --namespace=kube-system
kubectl patch deployment kube-dns -p '{"spec": {"dnsPolicy": "ClusterFirstWithHostNet"}}' --namespace=kube-system
kubectl patch deployment kube-dns -p '{"spec": {"template": {"dnsPolicy": "ClusterFirstWithHostNet"}}}' --namespace=kube-system
```

## Service

A service is an abstraction for pods, providing a stable, virtual IP (VIP) address.

While pods may come and go, services allow clients to reliably connect to the containers running in the pods, using the VIP. The `virtual` in VIP means it’s not an actual IP address connected to a network interface but its purpose is purely to forward traffic to one or more pods. Keeping the mapping between the VIP and the pods up-to-date is the job of [kube-proxy](https://kubernetes.io/docs/admin/kube-proxy/), a process that runs on every node, which queries the API server to learn about new services in the cluster.

Let's create a pod supervised by an [RC](https://github.com/datalayer/datalayer/blob/master/lab/k8s/services/rc.yaml) and a [service](https://github.com/datalayer/datalayer/blob/master/lab/k8s/services/svc.yaml) along with it.

```bash
kubectl create -f https://raw.githubusercontent.com/datalayer/datalayer/master/lab/k8s/services/rc.yaml
kubectl create -f https://raw.githubusercontent.com/datalayer/datalayer/master/lab/k8s/services/svc.yaml
```

Now we have the supervised pod running.

```bash
kubectl get pods -l app=dla
kubectl describe pod rcdla-6nq3k
```

You can, from within the cluster, access the pod directly via its assigned IP `172.17.0.3`:

```bash
curl 172.17.0.3:9876/info
{"host": "172.17.0.3:9876", "version": "0.5.0", "from": "172.17.0.1"}
```

This is however, as mentioned above, not advisable since the IPs assigned to pods may change. Hence, enter the `simple` we've created:

```bash
kubectl get svc
kubectl describe svc simple
```

The service keeps track of the pods it forwards traffic to through the label, in our case `app=dla`.

From within the cluster we can now access `simple` like so.

```bash
curl 172.30.228.255:80/info
{"host": "172.30.228.255", "version": "0.5.0", "from": "10.0.2.15"}
```

What makes the VIP `172.30.228.255` forward the traffic to the pod?

The answer is: [IPtables](https://wiki.centos.org/HowTos/Network/IPTables), which is essentially a long list of rules that tells the Linux kernel what to do with a certain IP package.

Looking at the rules that concern our service (executed on a cluster node) yields.

```bash
sudo iptables-save | grep simple
-A KUBE-SEP-4SQFZS32ZVMTQEZV -s 172.17.0.3/32 -m comment --comment "default/simple:" -j KUBE-MARK-MASQ
-A KUBE-SEP-4SQFZS32ZVMTQEZV -p tcp -m comment --comment "default/simple:" -m tcp -j DNAT --to-destination 172.17.0.3:9876
-A KUBE-SERVICES -d 172.30.228.255/32 -p tcp -m comment --comment "default/simple: cluster IP" -m tcp --dport 80 -j KUBE-SVC-EZC6WLOVQADP4IAW
-A KUBE-SVC-EZC6WLOVQADP4IAW -m comment --comment "default/simple:" -j KUBE-SEP-4SQFZS32ZVMTQEZV
```

Above you can see the four rules that `kube-proxy` has thankfully added to the routing table, essentially stating that TCP traffic to `172.30.228.255:80` should be forwarded to `172.17.0.3:9876`, which is our pod.

Let’s now add a second pod by scaling up the RC supervising it.

```bash
kubectl scale --replicas=2 rc/rcdla
kubectl get pods -l app=dla
```

When we now check the relevant parts of the routing table again we notice the addition of a bunch of IPtables rules.

```bash
sudo iptables-save | grep simple
-A KUBE-SEP-4SQFZS32ZVMTQEZV -s 172.17.0.3/32 -m comment --comment "default/simple:" -j KUBE-MARK-MASQ
-A KUBE-SEP-4SQFZS32ZVMTQEZV -p tcp -m comment --comment "default/simple:" -m tcp -j DNAT --to-destination 172.17.0.3:9876
-A KUBE-SEP-PXYYII6AHMUWKLYX -s 172.17.0.4/32 -m comment --comment "default/simple:" -j KUBE-MARK-MASQ
-A KUBE-SEP-PXYYII6AHMUWKLYX -p tcp -m comment --comment "default/simple:" -m tcp -j DNAT --to-destination 172.17.0.4:9876
-A KUBE-SERVICES -d 172.30.228.255/32 -p tcp -m comment --comment "default/simple: cluster IP" -m tcp --dport 80 -j KUBE-SVC-EZC6WLOVQADP4IAW
-A KUBE-SVC-EZC6WLOVQADP4IAW -m comment --comment "default/simple:" -m statistic --mode random --probability 0.50000000000 -j KUBE-SEP-4SQFZS32ZVMTQEZV
-A KUBE-SVC-EZC6WLOVQADP4IAW -m comment --comment "default/simple:" -j KUBE-SEP-PXYYII6AHMUWKLYX
```

In above routing table listing we see rules for the newly created pod serving at `172.17.0.4:9876` as well as an additional rule.

```
-A KUBE-SVC-EZC6WLOVQADP4IAW -m comment --comment "default/simple:" -m statistic --mode random --probability 0.50000000000 -j KUBE-SEP-4SQFZS32ZVMTQEZV
```

This causes the traffic to the service being equally split between our two pods by invoking the `statistics` module of IPtables.

You can remove all the resources created by doing.

```bash
kubectl delete svc simple
kubectl delete rc rcdla
```

## Service Discovery

Service discovery is the process of figuring out how to connect to a [service](#service).

Typically, there are several services which are started on a cluster by kube-system. Get a list of these with the `kubectl cluster-info` command.

Read the [discovering services](https://kubernetes.io/docs/concepts/services-networking/service/#discovering-services) docs.

Manually constructing apiserver proxy URLs

As mentioned above, you use the kubectl cluster-info command to retrieve the service’s proxy URL. To create proxy URLs that include service endpoints, suffixes, and parameters, you simply append to the service’s proxy URL.

http://kubernetes_master_address/api/v1/namespaces/namespace_name/services/service_name[:port_name]/proxy

If you haven’t specified a name for your port, you don’t have to specify port_name in the URL.

By default, the API server proxies to your service using http. To use https, prefix the service name with https:: http://kubernetes_master_address/api/v1/namespaces/namespace_name/services/https:service_name:[port_name]/proxy

The supported formats for the name segment of the URL are:

+ <service_name> - proxies to the default or unnamed port using http
+ <service_name>:<port_name> - proxies to the specified port using http
+ https:<service_name>: - proxies to the default or unnamed port using https (note the trailing colon)
+ https:<service_name>:<port_name> - proxies to the specified port using https

While there is a service discovery option based on [environment variables](https://kubernetes.io/docs/concepts/services-networking/connect-applications-service/#environment-variables) available, the DNS-based service discovery is preferable. Note that DNS is a [cluster add-on](https://github.com/kubernetes/kubernetes/blob/master/cluster/addons/dns/README.md) so make sure your Kubernetes distribution provides for one or install it yourself.

Let's create a [service](https://github.com/datalayer/datalayer/blob/master/lab/k8s/sd/svc.yaml) named `thesvc` and an [RC](https://github.com/datalayer/datalayer/blob/master/lab/k8s/sd/rc.yaml) supervising some pods along with it:

```bash
kubectl create -f https://raw.githubusercontent.com/datalayer/datalayer/master/lab/k8s/sd/rc.yaml
kubectl create -f https://raw.githubusercontent.com/datalayer/datalayer/master/lab/k8s/sd/svc.yaml
```

Now we want to connect to the `thesvc` service from within the cluster, say, from another service. To simulate this, we create a [jump pod](https://github.com/datalayer/datalayer/blob/master/lab/k8s/sd/jumpod.yaml) in the same namespace (`default`, since we didn't specify anything else).

```bash
kubectl create -f https://raw.githubusercontent.com/datalayer/datalayer/master/lab/k8s/sd/jumpod.yaml
```

The DNS add-on will make sure that our service `thesvc` is available via the FQDN `thesvc.default.svc.cluster.local` from other pods in the cluster. Let's try it out.

```bash
kubectl exec jumpod -c shell -i -t -- ping thesvc.default.svc.cluster.local
```

The answer to the `ping` tells us that the service is available via the cluster IP `172.30.251.137`. We can directly connect to and consume the service (in the same namespace) like so:

 ```bash
 kubectl exec jumpod -c shell -i -t -- curl http://thesvc/info
{"host": "thesvc", "version": "0.5.0", "from": "172.17.0.5"}
```

Note that the IP address `172.17.0.5` above is the cluster-internal IP address of the jump pod.

To access a service that is deployed in a different namespace than the one you're accessing it from, use a FQDN in the form `$SVC.$NAMESPACE.svc.cluster.local`.

Let's see how that works by creating.

1. a [namespace](https://github.com/datalayer/datalayer/blob/master/lab/k8s/sd/other-ns.yaml) `other`.
1. a [service](https://github.com/datalayer/datalayer/blob/master/lab/k8s/sd/other-svc.yaml) `thesvc` in namespace `other`.
1. an [RC](https://github.com/datalayer/datalayer/blob/master/lab/k8s/sd/other-rc.yaml) supervising the pods, also in namespace `other`.

If you're not familiar with namespaces, check out the [namespace examples](#ns) first.

```bash
kubectl create -f https://raw.githubusercontent.com/datalayer/datalayer/master/lab/k8s/sd/other-ns.yaml
kubectl create -f https://raw.githubusercontent.com/datalayer/datalayer/master/lab/k8s/sd/other-rc.yaml
kubectl create -f https://raw.githubusercontent.com/datalayer/datalayer/master/lab/k8s/sd/other-svc.yaml
```

We're now in the position to consume the service `thesvc` in namespace `other` from the `default` namespace (again via the jump pod).

 ```bash
kubectl exec jumpod -c shell -i -t -- curl http://thesvc.other/info
{"host": "thesvc.other", "version": "0.5.0", "from": "172.17.0.5"}
```

Summing up, DNS-based service discovery provides a flexible and generic way to connect to services across the cluster.

You can destroy all the resources created with.

```bash
kubectl delete pods jumpod
kubectl delete svc thesvc
kubectl delete rc rcdla
kubectl delete ns other
```

Keep in mind that removing a namespace will destroy every resource inside.

## Environment Variable

You can set environment variables for containers running in a pod and in addition, Kubernetes exposes certain runtime infos via environment variables automatically.

Let's launch a [pod](https://github.com/datalayer/datalayer/blob/master/lab/k8s/envs/pod.yaml) that we pass an environment variable `SIMPLE_SERVICE_VERSION` with the value `1.0`.

```bash
kubectl create -f https://raw.githubusercontent.com/datalayer/datalayer/master/lab/k8s/envs/pod.yaml
kubectl describe pod envs | grep IP:
```

Now, let's verify from within the cluster if the application running in the pod has picked up the environment variable `SIMPLE_SERVICE_VERSION`:

```bash
curl 172.17.0.3:9876/info
{"host": "172.17.0.3:9876", "version": "1.0", "from": "172.17.0.1"}
```

And indeed it has picked up the user-provided environment variable (the default, response would be `"version": "0.5.0"`).

You can check what environment variables Kubernetes itself provides automatically (from within the cluster, using a dedicated endpoint that the [app](https://github.com/datalayer/datalayer/tree/master/lab/etc/simple/docker) exposes):

```bash
curl 172.17.0.3:9876/env
{"version": "1.0", "env": "{'HOSTNAME': 'envs', 'DOCKER_REGISTRY_SERVICE_PORT': '5000', 'KUBERNETES_PORT_443_TCP_ADDR': '172.30.0.1', 'ROUTER_PORT_80_TCP_PROTO': 'tcp', 'KUBERNETES_PORT_53_UDP_PROTO': 'udp', 'ROUTER_SERVICE_HOST': '172.30.246.127', 'ROUTER_PORT_1936_TCP_PROTO': 'tcp', 'KUBERNETES_SERVICE_PORT_DNS': '53', 'DOCKER_REGISTRY_PORT_5000_TCP_PORT': '5000', 'PATH': '/usr/local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin', 'ROUTER_SERVICE_PORT_443_TCP': '443', 'KUBERNETES_PORT_53_TCP': 'tcp://172.30.0.1:53', 'KUBERNETES_SERVICE_PORT': '443', 'ROUTER_PORT_80_TCP_ADDR': '172.30.246.127', 'LANG': 'C.UTF-8', 'KUBERNETES_PORT_53_TCP_ADDR': '172.30.0.1', 'PYTHON_VERSION': '2.7.13', 'KUBERNETES_SERVICE_HOST': '172.30.0.1', 'PYTHON_PIP_VERSION': '9.0.1', 'DOCKER_REGISTRY_PORT_5000_TCP_PROTO': 'tcp', 'REFRESHED_AT': '2017-04-24T13:50', 'ROUTER_PORT_1936_TCP': 'tcp://172.30.246.127:1936', 'KUBERNETES_PORT_53_TCP_PROTO': 'tcp', 'KUBERNETES_PORT_53_TCP_PORT': '53', 'HOME': '/root', 'DOCKER_REGISTRY_SERVICE_HOST': '172.30.1.1', 'GPG_KEY': 'C01E1CAD5EA2C4F0B8E3571504C367C218ADD4FF', 'ROUTER_SERVICE_PORT_80_TCP': '80', 'ROUTER_PORT_443_TCP_ADDR': '172.30.246.127', 'ROUTER_PORT_1936_TCP_ADDR': '172.30.246.127', 'ROUTER_SERVICE_PORT': '80', 'ROUTER_PORT_443_TCP_PORT': '443', 'KUBERNETES_SERVICE_PORT_DNS_TCP': '53', 'KUBERNETES_PORT_53_UDP_ADDR': '172.30.0.1', 'KUBERNETES_PORT_53_UDP': 'udp://172.30.0.1:53', 'KUBERNETES_PORT': 'tcp://172.30.0.1:443', 'ROUTER_PORT_1936_TCP_PORT': '1936', 'ROUTER_PORT_80_TCP': 'tcp://172.30.246.127:80', 'KUBERNETES_SERVICE_PORT_HTTPS': '443', 'KUBERNETES_PORT_53_UDP_PORT': '53', 'ROUTER_PORT_80_TCP_PORT': '80', 'ROUTER_PORT': 'tcp://172.30.246.127:80', 'ROUTER_PORT_443_TCP': 'tcp://172.30.246.127:443', 'SIMPLE_SERVICE_VERSION': '1.0', 'ROUTER_PORT_443_TCP_PROTO': 'tcp', 'KUBERNETES_PORT_443_TCP': 'tcp://172.30.0.1:443', 'DOCKER_REGISTRY_PORT_5000_TCP': 'tcp://172.30.1.1:5000', 'DOCKER_REGISTRY_PORT': 'tcp://172.30.1.1:5000', 'KUBERNETES_PORT_443_TCP_PORT': '443', 'ROUTER_SERVICE_PORT_1936_TCP': '1936', 'DOCKER_REGISTRY_PORT_5000_TCP_ADDR': '172.30.1.1', 'DOCKER_REGISTRY_SERVICE_PORT_5000_TCP': '5000', 'KUBERNETES_PORT_443_TCP_PROTO': 'tcp'}"}
```

Alternatively, you can also use `kubectl exec` to connect to the container and list the environment variables directly, there.

```bash
kubectl exec envs -- printenv
```

You can destroy the created pod with.

```bash
kubectl delete pod/envs
```

In addition to the above provided environment variables, you can expose more using the [downward API](https://kubernetes.io/docs/user-guide/downward-api).

```bash
cat << EOF | kubectl apply -f -
apiVersion: v1
kind: Pod
metadata:
  name: envar-demo
  labels:
    purpose: demonstrate-envars
spec:
  containers:
  - name: envar-demo-container
    image: gcr.io/google-samples/node-hello:1.0
    env:
    - name: DEMO_GREETING
      value: "Hello from the environment"
EOF
```

```bash
kubectl get pods -l purpose=demonstrate-envars
kubectl exec -it envar-demo -- /bin/bash
```

## Secrets

You don't want sensitive information such as a database password or an API key kept around in clear text. Secrets provide you with a mechanism
to use such information in a safe and reliable way with the following properties:

+ Secrets are namespaced objects, that is, exist in the context of a namespace.
+ You can access them via a volume or an environment variable from a container running in a pod.
+ The secret data on nodes is stored in [tmpfs](https://www.kernel.org/doc/Documentation/filesystems/tmpfs.txt) volumes.
+ A per-secret size limit of 1MB exists.
+ The API server stores secrets as plaintext in etcd.

Create a secret `apikey` that holds a (made-up) API key.

```bash
echo -n "A19fh68B001j" > ./apikey.txt
kubectl create secret generic apikey --from-file=./apikey.txt
kubectl describe secrets/apikey
```

Use the secret in a [pod](https://github.com/datalayer/datalayer/blob/master/lab/k8s/secrets/pod.yaml) via a [volume](#volumes):

```bash
kubectl create -f https://raw.githubusercontent.com/datalayer/datalayer/master/lab/k8s/secrets/pod.yaml
```

If we now exec into the container we see the secret mounted at `/tmp/apikey`.

```
kubectl exec consumesec -c shell -i -t -- bash
mount | grep apikey
cat /tmp/apikey/apikey.txt
```

Note that for service accounts Kubernetes automatically creates secrets containing credentials for accessing the API and modifies your pods to use this type of secret.

You can remove both the pod and the secret.

```bash
kubectl delete pod/consumesec secret/apikey
```

```bash
echo -n "A19fh68B001j" > /tmp/dla-secret.txt
kubectl create secret generic dla-secret --from-file=/tmp/dla-secret.txt
kubectl describe secrets dla-secret
kubectl delete secret dla-secret
```

```bash
echo -n "A19fh68B001j" > /tmp/aws-id-secret
kubectl create secret generic aws-id-secret --from-file=/tmp/aws-id-secret
kubectl describe secrets aws-id-secret
kubectl delete secret aws-id-secret
```

```bash
echo -n "A19fh68B001j" > /tmp/dla-secret.txt
kubectl create secret generic dla-secret --type="kubernetes.io/dla" --from-file=/tmp/dla-secret.txt --from-literal=apiUsername=dla --from-literal=apiPassword=dla --namespace=default
kubectl describe secrets dla-secret
```

```bash
kubectl create secret generic dla-secret --type="kubernetes.io/dla" --from-literal=apiAddress=tcp://localhost:5705 --from-literal=apiUsername=dla --from-literal=apiPassword=dla --namespace=default
```

## Label

Labels are the mechanism you use to organize Kubernetes objects. A label is a key-value pair with certain [restrictions](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#syntax-and-character-set) concerning length and allowed values but without any pre-defined meaning.

So you're free to choose labels as you see fit, for example, to express environments such as 'this pod is running in production' or ownership,
like 'department X owns that pod'.

Create a [pod](https://github.com/datalayer/datalayer/blob/master/lab/k8s/labels/pod.yaml) that initially has one label (`env=development`).

```bash
kubectl create -f https://raw.githubusercontent.com/datalayer/datalayer/master/lab/k8s/labels/pod.yaml
kubectl get pods --show-labels
```

In above `get pods` command note the `--show-labels` option that output the labels of an object in an additional column.

You can add a label to the pod as.

```bash
kubectl label pods labelex owner=michael
kubectl get pods --show-labels
```

To use a label for filtering, for example to list only pods that have an `owner` that equals `michael`, use the `--selector` option.

```bash
kubectl get pods --selector owner=michael
```

The `--selector` option can be abbreviated to `-l`, so to select pods that are labelled with `env=development`, do.

```bash
kubectl get pods -l env=development
```

Oftentimes, Kubernetes objects also support set-based selectors. Let's launch [another pod](https://github.com/datalayer/datalayer/blob/master/lab/k8s/labels/anotherpod.yaml) that has two labels (`env=production` and `owner=michael`).

```bash
kubectl create -f https://raw.githubusercontent.com/datalayer/datalayer/master/lab/k8s/labels/anotherpod.yaml
```

Now, let's list all pods that are either labelled with `env=development` or with `env=production`.

```bash
kubectl get pods -l 'env in (production, development)'
```

Other verbs also support label selection, for example, you could remove both of these pods with.

```bash
kubectl delete pods -l 'env in (production, development)'
```

Beware that this will destroy any pods with those labels.

You can also delete them normally with.

```bash
kubectl delete pods labelex
kubectl delete pods labelexother
```

Note that labels are not restricted to pods. In fact you can apply them to all sorts of objects, such as nodes or services.

```bash
kubectl label nodes datalayer-001 hdfs-namenode-selector=hdfs-namenode-0
kubectl label nodes ip-10-0-100-40.eu-central-1.compute.internal kuber-role=node
```

## Job

A job is a supervisor for pods carrying out batch processes, that is, a process that runs for a certain time to completion, for example a calculation or a backup operation.

Let's create a [job](https://github.com/datalayer/datalayer/blob/master/lab/k8s/jobs/job.yaml) called `countdown` that supervises a pod counting from 9 down to 1.

```bash
kubectl create -f https://raw.githubusercontent.com/datalayer/datalayer/master/lab/k8s/jobs/job.yaml
```

You can see the job and the pod it looks after like so.

```bash
kubectl get jobs
kubectl get pods --show-all
```

To learn more about the status of the job, do.

```bash
kubectl describe jobs/countdown
```

And to see the output of the job via the pod it supervised, execute.

```bash
kubectl logs countdown-lc80g
```

To clean up, use the `delete` verb on the job object which will remove all the supervised pods.

```bash
kubectl delete job countdown
```

Note that there are also more advanced ways to use jobs, for example, by utilizing a [work queue](https://kubernetes.io/docs/tasks/job/coarse-parallel-processing-work-queue/) or scheduling the execution at a certain time via [cron jobs](https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/).

## Ingress

### HTTP

```bash
helm install \
  stable/nginx-ingress \
  -f nginx-ingress-values.yaml \
  -n nginx-ingress
```

```bash
cat << EOF | kubectl apply -f -
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: coffee-rc
spec:
  replicas: 2
  template:
    metadata:
      labels:
        app: coffee
    spec:
      containers:
      - name: coffee
        image: nginxdemos/hello
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: coffee-svc
  labels:
    app: coffee
spec:
  ports:
  - port: 80
    targetPort: 80
    protocol: TCP
    name: http
  selector:
    app: coffee
EOF
```
    
```bash
cat << EOF | kubectl apply -f -
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: tea-rc
spec:
  replicas: 3
  template:
    metadata:
      labels:
        app: tea
    spec:
      containers:
      - name: tea
        image: nginxdemos/hello
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: tea-svc
  labels:
    app: tea
spec:
  ports:
  - port: 80
    targetPort: 80
    protocol: TCP
    name: http
  selector:
    app: tea
EOF
```

```bash
cat << EOF | kubectl apply -f -
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: cafe-ingress-nginx
  annotations:
    kubernetes.io/ingress.class: "nginx"
spec:
  rules:
  - host: cafe.example.com
    http:
      paths:
      - path: /tea
        backend:
          serviceName: tea-svc
          servicePort: 80
      - path: /coffee
        backend:
          serviceName: coffee-svc
          servicePort: 80
EOF
```

```bash
kubectl get ingress cafe-ingress-nginx
kubectl edit ingress cafe-ingress-nginx
kubectl replace -f 
```

```bash
k exec -it datalayer-ingress-nginx-ingress-controller-56dddfd79c-fp99g bash
vi /etc/nginx/nginx.conf
```

### WebSocket

```bash
echo "
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: ws-example
spec:
  replicas: 3
  template:
    metadata:
      labels:
        app: wseg
    spec:
      containers:
      - name: websocketexample
        image: nicksardo/websocketexample
        imagePullPolicy: Always
        ports:
        - name: http
          containerPort: 8080
        env:
        - name: podname
          valueFrom:
            fieldRef:
              fieldPath: metadata.name
---
apiVersion: v1
kind: Service
metadata:
  name: ws-example-svc
  labels:
    app: wseg
spec:
  type: NodePort
  ports:
  - port: 80
    targetPort: 8080
    protocol: TCP
  selector:
    app: wseg
---

apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: ws-example-svc
spec:
  rules:
  - host: websocket.uswest2-01.rocket-science.io
    http:
      paths:
      - backend:
          serviceName: ws-example-svc
          servicePort: 80
" | kubectl create -f -
```

Using http://www.websocket.org/echo.html set ws://websocket.uswest2-01.rocket-science.io as test location.

```bash
kuber-app ingress
helm install --name kube-lego stable/kube-lego --set config.LEGO_EMAIL=eric@datalayer.io
```

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: example
  namespace: foo
  annotations:
    kubernetes.io/ingress.class: nginx
    # Add to generate certificates for this ingress
    kubernetes.io/tls-acme: 'true'
spec:
  rules:
    - host: www.example.com
      http:
        paths:
          - backend:
              serviceName: exampleService
              servicePort: 80
            path: /
  tls:
    # With this configuration kube-lego will generate a secret in namespace foo called `example-tls`
    # for the URL `www.example.com`
    - hosts:
        - "www.example.com"
      secretName: example-tls
```

### Whitelist

[Whitelist IP Address Source Range](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/#whitelist-source-range).

## Storage Class

```bash
cat << EOF | kubectl apply -f -
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: standard
  annotations:
    storageclass.kubernetes.io/is-default-class: "true"
provisioner: kubernetes.io/aws-ebs
parameters:
  type: gp2
#  zones: eu-west-1a, eu-west-1b
#  iopsPerGB: "10" 
#  fsType: ext4
reclaimPolicy: Retain
mountOptions:
  - debug
volumeBindingMode: Immediate
EOF
kubectl get storageclass
```

```bash
cat << EOF | kubectl apply -f -
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: slow
  labels:
    app: nginx
spec:
  storageClassName: standard
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
EOF
```

## Volume

A Kubernetes volume is essentially a directory accessible to all containers running in a pod. In contrast to the container-local filesystem, the data in volumes is preserved across container restarts. The medium backing a volume and its contents are determined by the volume type.

- node-local types such as `emptyDir` or `hostPath`
- file-sharing types such as `nfs`
- cloud provider-specific types like `awsElasticBlockStore`, `azureDisk`, or `gcePersistentDisk`
- distributed file system types, for example `glusterfs` or `cephfs`
- special-purpose types like `secret`, `gitRepo`

A special type of volume is `PersistentVolume`, which we will cover elsewhere.

Let's create a [pod](https://github.com/datalayer/datalayer/blob/master/lab/k8s/volumes/pod.yaml) with two containers that use an `emptyDir` volume to exchange data.

```bash
kubectl create -f https://raw.githubusercontent.com/datalayer/datalayer/master/lab/k8s/volumes/pod.yaml
kubectl describe pod sharevol
```

We first exec into one of the containers in the pod, `c1`, check the volume mount and generate some data.

```bash
kubectl exec sharevol -c c1 -i -t -- bash
[root@sharevol /]# mount | grep xchange
/dev/sda1 on /tmp/xchange type ext4 (rw,relatime,data=ordered)
[root@sharevol /]# echo 'some data' > /tmp/xchange/data
```

When we now exec into `c2`, the second container running in the pod, we can see the volume mounted at `/tmp/data` and are able to read the data created in the previous step:

```bash
kubectl exec sharevol -c c2 -i -t -- bash
[root@sharevol /]# mount | grep /tmp/data
/dev/sda1 on /tmp/data type ext4 (rw,relatime,data=ordered)
[root@sharevol /]# cat /tmp/data/data
some data
```

Note that in each container you need to decide where to mount the volume and that for `emptyDir` you currently can not specify resource consumption limits.

You can remove the pod with.

```bash
kubectl delete pod/sharevol
```

As already described, this will destroy the shared volume and all its contents.

```bash
KUBE_FEATURE_GATES="PersistentLocalVolumes=true" NODE_LOCAL_SSDS=1 cluster/kube-up.sh
```

```bash
kubectl get sc
kubectl apply -f k8s/dla-vol-local.1.yaml
kubectl apply -f k8s/dla-vol-local.2.yaml
kubectl delete -f k8s/dla-vol-local.1.yaml
kubectl apply -f k8s/dla-vol-local-claim.yaml
kubectl describe pvc dla-vol-local-claim-1
kubectl describe pvc pvc-480952e7-f8e0-11e6-af8c-08002736b526
kubectl delete -f k8s/dla-vol-local-claim.yaml
```

```bash
kubectl describe sc standard
```

AWS Static PVC.

```bash
# Watch out the availabilty zone
aws ec2 create-volume --region=us-west-2 --availability-zone=us-west-2a --size=10 --volume-type=gp2 --profile=kuber
aws ec2 describe-volumes --region=us-west-2 --profile=kuber
```

```bash
cat << EOF | kubectl apply -f -
kind: PersistentVolume
apiVersion: v1
metadata:
  name: test-pv
  labels:
    type: amazonEBS
spec:
  capacity:
    storage: 10Gi
  accessModes:
    - ReadWriteMany
  awsElasticBlockStore:
    volumeID: vol-0afea076d67a639ba
    fsType: ext4
  persistentVolumeReclaimPolicy: Retain
  storageClassName: default
EOF
kubectl get pv
```

```bash
cat << EOF | kubectl apply -f -
kind: PersistentVolumeClaim
apiVersion: v1
metadata:
  name: test-pvc
  labels:
    type: amazonEBS
spec:
  accessModes:
    - ReadWriteMany
  resources:
    requests:
      storage: 10Gi
  storageClassName: default
  volumeName: test-pv
EOF
kubectl get pvc # Should be bound after a few seconds...
```

```bash
cat << EOF | kubectl apply -f -
apiVersion: v1
kind: Pod
metadata:
  name: test-ebs
spec:
  containers:
  - image: busybox
    name: test-ebs
    command:
      - sleep
      - "3600"
    volumeMounts:
    - mountPath: /test-ebs
      name: test-volume
  volumes:
  - name: test-volume
    persistentVolumeClaim:
      claimName: test-pvc
EOF
kubectl get pods -w
kubectl exec -it test-ebs -- ls /test-ebs
```

AWS Dynamic PVC

```bash
cat << EOF | kubectl apply -f -
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: pvc-dyn
  namespace: default
spec:
  accessModes:
  - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi
  storageClassName: default
EOF
kubectl get pvc # Should be bound...
```

```bash
cat << EOF | kubectl apply -f -
apiVersion: v1
kind: Pod
metadata:
  name: test-ebs
spec:
  containers:
  - image: busybox
    name: test-ebs
    command:
      - sleep
      - "3600"
    volumeMounts:
    - mountPath: /test-ebs
      name: test-volume
  volumes:
  - name: test-volume
    persistentVolumeClaim:
      claimName: test-pvc
EOF
kubectl exec -it test-ebs -- ls /test-ebs
```

## CRD - Custom Resources Definition

```bash
kubectl get crd
```

## Microservices Sample

```
kubectl create namespace sock-shop
kubectl apply -n sock-shop -f "https://github.com/microservices-demo/microservices-demo/blob/master/deploy/kubernetes/complete-demo.yaml?raw=true"
kubectl -n sock-shop get svc front-end
http://<ip>:30001
kubectl delete namespace sock-shop
```

## Other Examples

```bash
kubectl version
kubectl cluster-info
kubectl cluster-info dump
kubectl get nodes
kubectl describe nodes
kubectl get pods
kubectl describe pods
kubectl get pods -o wide --show-all --all-namespaces

kubectl run -it busybox --image=busybox --restart=Never -- sh

kubectl run dla-bash --image=datalayer/bash:centos-7
kubectl run dla-bash --image=datalayer/bash:centos-7 --command /bin/bash
kubectl expose deployment dla-bash
kubectl exec -it dla-bash -- /bin/bash

kubectl run dla-echo --image=gcr.io/google_containers/echoserver:1.10 --port=8080
kubectl get deployments
kubectl describe pods dla-echo

kubectl get pods -w
watch kubectl get pods

kubectl logs dla-echo-2335152361-b5b0f
kubectl logs dla-echo-2335152361-b5b0f -f
kubectl logs dla-echo-2335152361-b5b0f -p

kubectl exec -it dla-echo-2335152361-b5b0f -- /bin/bash
kubectl exec dla-echo-2335152361-b5b0f -- /bin/ls -l
kubectl exec dla-echo-2335152361-b5b0f -- printenv | grep SERVICE

kubectl expose deployment dla-echo --type=NodePort
kubectl get svc dla-echo
kubectl get svc --all-namespaces
kubectl describe svc dla-echo

kubectl get replicasets
kubectl describe replicasets

kubectl expose deployment dla-echo --type=LoadBalancer --name=dla-echo-pub
kubectl get svc dla-echo-pub
kubectl describe svc dla-echo-pub

kubectl set image deployment dla-echo dla-echo=gcr.io/google_containers/echoserver:1.10
kubectl scale deployment dla-echo --replicas=10
kubectl scale deployment dla-echo --replicas=0
kubectl delete deployment dla-echo --grace-period=0 --force
```

```bash
kubectl run hello-nodejs --image=hello-nodejs:v1 --port=8080
kubectl get deployments
kubectl get pods
kubectl expose deployment hello-nodejs --type=NodePort
kubectl get services
curl $(minikube service hello-nodejs --url)
```

```bash
kubectl run dla-nginx --image=nginx:stable-alpine
kubectl get deployment
kubectl get pods --output=wide
kubectl run -i -t --rm cli --image=tutum/curl --restart=Never curl http://localhost

kubectl logs -f dla-nginx-3905153451-4bg00
kubectl exec -it dla-nginx-3905153451-4bg00 -c dla-nginx -- /bin/bash
kubectl exec dla-nginx-3905153451-4bg00 -- /bin/ls -l

kubectl run dla-nginx --image=nginx:alpine --replicas=2 --port=80 --record
kubectl expose deployment dla-nginx --type=LoadBalancer --port=80

kubectl get pods -o wide
kubectl get services
kubectl logs -f dla-nginx-858393261-21dsv
kubectl logs -f dla-nginx-858393261-h3xw9

kubectl scale --replicas=2 deployment/dla-nginx
watch kubectl get pods
kubectl get pods
kubectl scale --replicas=10 deployment/dla-nginx
kubectl get pods

kubectl set image deployment/dla-nginx dla-nginx=datalayer/spitfire
watch kubectl get pods
kubectl logs -f dla-nginx-1570827950-wz79h
```
