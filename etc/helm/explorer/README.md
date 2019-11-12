# Datalayer Studio Helm

```bash
export RELEASE=explorer
export NAMESPACE=explorer
helm upgrade \
  --install $RELEASE \
  $DLAHOME/etc/helm/explorer \
  --namespace $NAMESPACE \
  --timeout 99999
```

```bash
export POD_NAME=$(kubectl get pods -n explorer-l "app=explorer" -o jsonpath="{.items[0].metadata.name}")
echo https://127.0.0.1:9091
kubectl -n explorer port-forward $POD_NAME 9091:9091
```

```bash
helm delete $RELEASE --purge && \
  kubectl delete namespace $NAMESPACE
```

---

`Datalayer Studio` is the WEB user interface to analyse datasets, an innovative WEB Notebook for Data Scientists to better collaborate with Business.

![Datalayer Studio](/_images/what/Studio.svg "Datalayer Studio")

```bash
# --type= ClusterIP | NodePort | LoadBalancer
kubectl expose pod $POD --port=9090 --name=dashboard-ci-9090 --type=ClusterIP
kubectl expose pod $POD --port=9090 --target-port=80 --name=dashboard-np-9090 --type=NodePort
kubectl expose pod $POD --port=9090 --target-port=9090 --name=dashboard-np-9090 --type=NodePort
kubectl expose pod $POD --port=9090 --target-port=9090 --name=dashboard-lb-9090 --type=LoadBalancer
kubectl expose pod $POD --target-port=9090 --name=dashboard-lb-9090 --type=LoadBalancer
helm delete k8s-dashboard --purge
```

```bash
metadata:
  name: xxx-lb
  annotations:
    "service.beta.kubernetes.io/aws-load-balancer-ssl-ports": "443"
    "service.beta.kubernetes.io/aws-load-balancer-ssl-cert": "arn:aws:acm:us-west-2:345579675507:certificate/ce5a63ee-e9e0-472b-a5d6-a28303fe1d6a"
```

```bash
    service.beta.kubernetes.io/aws-load-balancer-backend-protocol: "tcp"
    service.beta.kubernetes.io/aws-load-balancer-proxy-protocol: "*"
    service.beta.kubernetes.io/aws-load-balancer-ssl-cert: "01:27:ae:27:54:fc:02:a3:1c:38:08:ba:61:95:8a:fa"
    service.beta.kubernetes.io/aws-load-balancer-connection-idle-timeout: 3600
```

```bash
cat << EOF | kubectl apply -f -
apiVersion: v1
kind: ConfigMap
metadata:
  name: ingress-config
data:
  80: "default/Studio-kuber:9091"
```

```bash
cat << EOF | kubectl apply -f -
apiVersion: v1
kind: Service
metadata:
  name: explorer-lb
  annotations:
#    service.beta.kubernetes.io/aws-load-balancer-internal: "0.0.0.0/0"
    service.beta.kubernetes.io/aws-load-balancer-connection-idle-timeout: 3600
    service.beta.kubernetes.io/aws-load-balancer-additional-resource-tags: "kuber-role=explorer"
spec:
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 8080
  selector:
    app: explorer
    release: explorer
EOF
```

```bash
kubectl describe services explorer-lb | grep Ingress
```

```bash
cat << EOF | kubectl apply -f -
apiVersion: v1
kind: Service
metadata:
  name: explorer-lb
spec:
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 8080
  selector:
    app: explorer
    release: explorer
EOF
```

```bash
echo http://localhost:8001/api/v1/namespaces/default/services/http:Studio-Studio:9091/proxy/#/
```

```bash
#    service.beta.kubernetes.io/aws-load-balancer-internal: "0.0.0.0/0"
  cat << EOF | kubectl apply -f -
apiVersion: v1
kind: Service
metadata:
  name: Studio-lb
  annotations:
    service.beta.kubernetes.io/aws-load-balancer-connection-idle-timeout: 3600
    service.beta.kubernetes.io/aws-load-balancer-additional-resource-tags: "kuber-role=Studio"
spec:
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 9091
  selector:
    app: Studio
    release: Studio
EOF
```

```bash
cat << EOF | kubectl apply -f -
apiVersion: v1
kind: Service
metadata:
  name: wabco-spark-ui-lb
spec:
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 4040
  selector:
    spark-role: driver
EOF
```
