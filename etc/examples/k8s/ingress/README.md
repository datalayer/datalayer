[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Ingress Examples

## Minikube

+ https://kubernetes.io/docs/tasks/access-application-cluster/ingress-minikube
+ https://medium.com/@Oskarr3/setting-up-ingress-on-minikube-6ae825e98f82
+ https://medium.com/@awkwardferny/getting-started-with-kubernetes-ingress-nginx-on-minikube-d75e58f52b6c
+ https://matthewpalmer.net/kubernetes-app-developer/articles/kubernetes-ingress-guide-nginx-example.html
+ https://medium.com/@Oskarr3/setting-up-ingress-on-minikube-6ae825e98f82

```bash
dla minikube-start
eval $(minikube docker-env)
dla helm-deploy
kubectl get pods -n kube-system
minikube addons enable ingress
# export RELEASE=ingress
# export NAMESPACE=ingress
# helm upgrade \
#   --install $RELEASE \
#   stable/nginx-ingress \
#   --namespace $NAMESPACE \
#   --timeout 99999
# helm ls
```

```bash
kubectl run web --image=gcr.io/google-samples/hello-app:1.0 --port=8080
kubectl expose deployment web --target-port=8080 --type=NodePort
kubectl get service web
minikube service web --url
```

```bash
kubectl run web2 --image=gcr.io/google-samples/hello-app:2.0 --port=8080
kubectl expose deployment web2 --target-port=8080 --type=NodePort
kubectl get service web2
minikube service web2 --url
```

```bash
kubectl apply -f $DLAHOME/etc/examples/ingress/ingress.yaml
kubectl get ingress
# Wait until you see an ADDRESS
# Note: This can take a couple of minutes.
# NAME              HOSTS                   ADDRESS   PORTS   AGE
# example-ingress   minikube.datalayer.io.local             80      3m44s
minikube ip
# Add the following line to the bottom of the /etc/hosts file.
192.168.64... minikube.datalayer.io.local
```

```bash
curl minikube.datalayer.io.local
# Hello, world!
# Version: 1.0.0
# Hostname: web-55b8c6998d-8k564
```

```bash
curl minikube.datalayer.io.local/v2
# Hello, world!
# Version: 2.0.0
# Hostname: web-55b8c6998d-8k564
```

```bash
kubectl delete -f $DLAHOME/etc/examples/ingress/ingress.yaml
```

## Ingress

```bash
kubectl run nginx --image=nginx --port=80
kubectl run echoserver --image=gcr.io/google_containers/echoserver:1.4 --port=8080
kubectl get deployments
```

```bash
kubectl expose deployment nginx --target-port=80 --type=NodePort
kubectl expose deployment echoserver --target-port=8080 --type=NodePort
```

```bash
kubectl get service nginx
kubectl get service echoserver
```

## Ingress AWS

```yaml
#    service.beta.kubernetes.io/aws-load-balancer-ssl-cert: arn:aws:acm:us-west-1:<account number>:certificate/<certificate id>
cat << EOF | kubectl apply -f -
apiVersion: v1
kind: Service
metadata:
  name: nginx-svc
  annotations:
    service.beta.kubernetes.io/aws-load-balancer-backend-protocol: http
spec:
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 80
  selector:
    run: nginx
EOF
```

See also.

+ https://aws.amazon.com/blogs/opensource/kubernetes-ingress-aws-alb-ingress-controller
+ https://github.com/kubernetes/ingress-nginx/issues/1624
+ https://kubernetes-on-aws.readthedocs.io/en/latest/user-guide/ingress.html
+ https://akomljen.com/aws-alb-ingress-controller-for-kubernetes

## Ingress

```yaml
cat << EOF | kubectl apply -f -
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
 name: fanout-ingress
spec:
 rules:
 - http:
     paths:
     - path: /
       backend:
         serviceName: nginx
         servicePort: 80
     - path: /echo
       backend:
         serviceName: echoserver
         servicePort: 8080
EOF
```

```bash
kubectl get ingress fanout-ingress
```

## Ingress Nginx

```bash
curl https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/namespace.yaml \
    | kubectl apply -f -
curl https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/default-backend.yaml \
    | kubectl apply -f -
curl https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/configmap.yaml \
    | kubectl apply -f -
curl https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/tcp-services-configmap.yaml \
    | kubectl apply -f -
curl https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/udp-services-configmap.yaml \
    | kubectl apply -f -
```

```bash
# Without RBAC.
curl https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/without-rbac.yaml \
    | kubectl apply -f -
```

```bash
# Install with RBAC roles.
# Please check the RBAC document.
curl https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/rbac.yaml \
    | kubectl apply -f -
curl https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/with-rbac.yaml \
    | kubectl apply -f -
```

```bash
# AWS
kubectl patch deployment -n ingress-nginx nginx-ingress-controller --type='json' \
  --patch="$(curl https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/patch-deployment.yaml)"
# For L4:
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/provider/aws/service-l4.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/provider/aws/patch-configmap-l4.yaml
# For L7:
# Change line of the file provider/aws/service-l7.yaml replacing the dummy id with a valid one # "arn:aws:acm:us-west-2:XXXXXXXX:certificate/XXXXXX-XXXXXXX-XXXXXXX-XXXXXXXX" Then execute:
kubectl apply -f provider/aws/service-l7.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/provider/aws/patch-configmap-l7.yaml
# This example creates an ELB with just two listeners, one in port 80 and another in port 443
```

```bash
# RBAC
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/provider/patch-service-without-rbac.yaml
```

```bash
# No RBAC
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/provider/patch-service-with-rbac.yaml
```

```bash
kubectl get pods --all-namespaces -l app=ingress-nginx --watch
NAMESPACE       NAME                                       READY     STATUS    RESTARTS   AGE
ingress-nginx   nginx-ingress-controller-8dcfb95b9-kvm9g   1/1       Running   0          7m
```

```bash
POD_NAMESPACE=ingress-nginx
POD_NAME=$(kubectl get pods -n $POD_NAMESPACE -l app=ingress-nginx -o jsonpath={.items[0].metadata.name})
kubectl exec -it $POD_NAME -n $POD_NAMESPACE -- /nginx-ingress-controller --version
-------------------------------------------------------------------------------
NGINX Ingress controller
  Release:    0.9.0
  Build:      git-6816630
  Repository: https://github.com/kubernetes/ingress-nginx
-------------------------------------------------------------------------------
```

## Test

```
kubectl --namespace default get services -o wide -w k8s-nginx-nginx-ingress-controller
```

```yaml
cat << EOF | kubectl create -f -
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  annotations:
    kubernetes.io/ingress.class: nginx
  name: nginx2
  namespace: default
spec:
  rules:
  - http:
      paths:
      - path: /
        backend:
          serviceName: k8s-dashboard-kubernetes-dashboard
          servicePort: 9090
EOF
```

```yaml
cat << EOF | kubectl create -f -
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  annotations:
    kubernetes.io/ingress.class: nginx
  name: nginx-ingress-nginx
  namespace: default
spec:
  rules:
  - http:
      paths:
      - path: /
        backend:
          serviceName: nginx
          servicePort: 80
EOF
```

## Rules Examples

```
Inbound security rules
Priority	Name	Port	Protocol	Source	Destination	Action	
1010	ssh-inbound	22	TCP	Any	Any	Allow	…
1020	http-inbound	80	TCP	Any	Any	Allow	…
1030	https-inbound	443	TCP	Any	Any	Allow	…
1040	https-apiserver	6443	TCP	Any	Any	Allow	…
1050	kubenetes-nodeport	30000-32767	TCP	Any	Any	Allow	…
1060	dns-inbound	53	TCP	VirtualNetwork	VirtualNetwork	Allow	…
1070	http-insecure-apiserver	8080	TCP	VirtualNetwork	VirtualNetwork	Allow	…
1080	etcd-inbound-4001	4001	TCP	VirtualNetwork	VirtualNetwork	Allow	…
1090	etcd-inbound	2379-2380	TCP	VirtualNetwork	VirtualNetwork	Allow	…
1100	kubelet	10250	TCP	VirtualNetwork	VirtualNetwork	Allow	…
1110	deny-inbound	0-65535	TCP	Any	Any	Deny	…
65000	AllowVnetInBound	Any	Any	VirtualNetwork	VirtualNetwork	Allow	…
65001	AllowAzureLoadBalancerInBound	Any	Any	AzureLoadBalancer	Any	Allow	…
65500	DenyAllInBound	Any	Any	Any	Any	Deny	…
Outbound security rules
Priority	Name	Port	Protocol	Source	Destination	Action	
1120	any-outbound	Any	Any	Any	Any	Allow	…
65000	AllowVnetOutBound	Any	Any	VirtualNetwork	VirtualNetwork	Allow	…
65001	AllowInternetOutBound	Any	Any	Any	Internet	Allow	…
65500	DenyAllOutBound	Any	Any	Any	Any	Deny	…
```

Outbound security rules
Priority Name Port Protocol Source Destination Action
1120 any-outbound Any Any Any Any Allow 65000 Allow
VnetOutBound Any Any VirtualNetwork VirtualNetwork Allow 65001 AllowInternetOutBound Any Any Any Internet Allow 65500 DenyAllOutBound Any Any Any Any Deny

```
https://api.stackpoint.io/cluster/778/kubeui/api/v1/proxy/namespaces/kube-system/services/kubernetes-dashboard/#!/role?namespace=_all
```
