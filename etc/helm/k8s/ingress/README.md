[![Datalayer](https://raw.githubusercontent.com/datalayer/datalayer/main/res/logo/datalayer-25.svg?sanitize=true)](https://datalayer.io)

# Datalayer Nginx Ingress Helm Chart

- [Ingress Nginx](https://kubernetes.github.io/ingress-nginx).
- [Ingress Nginx Deploy](https://kubernetes.github.io/ingress-nginx/deploy).

- [Nginx Ingress Helm Chart](https://github.com/helm/charts/tree/master/stable/nginx-ingress).
- [Ingress Nginx Help Deploy](https://kubernetes.github.io/ingress-nginx/deploy/#using-helm).

- [Cloud Provider AWS](https://kubernetes.io/docs/concepts/cluster-administration/cloud-providers/#aws).
- [aws.go](https://github.com/kubernetes/cloud-provider-aws/blob/master/pkg/cloudprovider/providers/aws/aws.go).
- [Resuse existing ELB?](https://github.com/kubernetes/ingress-nginx/issues/3777).
- [Services of type LoadBalancer and Multiple Ingress Controllers](https://docs.giantswarm.io/guides/services-of-type-loadbalancer-and-multiple-ingress-controllers).

```bash
#  --set controller.scope.namespace=nginx-ingress
helm install stable/nginx-ingress \
  --name k8s-nginx \
  --set controller.stats.enabled=true \
  --set controller.scope.namespace=ingress-nginx
```

An example Ingress that makes use of the controller:

```yaml
  apiVersion: extensions/v1beta1
  kind: Ingress
  metadata:
    annotations:
      kubernetes.io/ingress.class: nginx
    name: example
    namespace: foo
  spec:
    rules:
      - host: www.example.com
        http:
          paths:
            - backend:
                serviceName: exampleService
                servicePort: 80
              path: /
    # This section is only required if TLS is to be enabled for the Ingress.
    tls:
        - hosts:
            - www.example.com
          secretName: example-tls
```

If TLS is enabled for the Ingress, a Secret containing the certificate and key must also be provided:

```yaml
W  apiVersion: v1
  kind: Secret
  metadata:
    name: example-tls
    namespace: foo
  data:
    tls.crt: <base64 encoded cert>
    tls.key: <base64 encoded key>
  type: kubernetes.io/tls
```

```bash
kubectl get pods --all-namespaces -l app=nginx-ingress --watch
NAMESPACE       NAME                                       READY     STATUS    RESTARTS   AGE
ingress-nginx   nginx-ingress-controller-8dcfb95b9-kvm9g   1/1       Running   0          7m
```

```bash
POD_NAMESPACE=default
POD_NAME=$(kubectl get pods -n $POD_NAMESPACE -l app=nginx-ingress -o jsonpath={.items[0].metadata.name})
kubectl exec -it $POD_NAME -n $POD_NAMESPACE --container nginx-ingress-controller -- /nginx-ingress-controller --version
```

## GCloud Example

- https://cloud.google.com/kubernetes-engine/docs/tutorials/configuring-domain-name-static-ip

```bash
cat <<EOF | kubectl apply -f -
apiVersion: apps/v1
kind: Deployment
metadata:
  name: helloweb
  labels:
    app: hello
spec:
  selector:
    matchLabels:
      app: hello
      tier: web
  template:
    metadata:
      labels:
        app: hello
        tier: web
    spec:
      containers:
      - name: hello-app
        image: gcr.io/google-samples/hello-app:1.0
        ports:
        - containerPort: 8080
        resources:
          requests:
            cpu: 200m
EOF

gcloud compute addresses create helloweb-ip --global
gcloud compute addresses describe helloweb-ip --global

cat <<EOF | kubectl apply -f -
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: helloweb
  annotations:
    kubernetes.io/ingress.global-static-ip-name: helloweb-ip
  labels:
    app: hello
spec:
  backend:
    serviceName: helloweb-backend
    servicePort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: helloweb-backend
  labels:
    app: hello
spec:
  type: NodePort
  selector:
    app: hello
    tier: web
  ports:
  - port: 8080
    targetPort: 8080
EOF

kubectl get ingress

curl http://<IP>

# Cleanup
kubectl delete ingress,service -l app=hello
gcloud compute addresses delete helloweb-ip --global
kubectl delete -f helloweb-deployment.yaml
gcloud compute forwarding-rules list
```

## Multiple Namespaces

- https://stackoverflow.com/questions/58739513/google-kubernetes-engine-how-to-define-one-ingress-for-multiple-namespaces

## Redirect

- https://serverfault.com/questions/1028607/kubernetes-nginx-ingress-how-to-redirect-foo-example-org-to-example-org

```yaml
---
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: ingress
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  tls:
    - hosts:
        - example.org
      secretName: prod-tls
  rules:
    - host: example.org
      http:
        paths:
          - path: /
            backend:
              serviceName: app-service
              servicePort: 80
---
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: ingress-redirect
  annotations:
    kubernetes.io/ingress.class: nginx
    # this should be covered by the annotation on the other ingress
    # since it will renew the same certificate
    # cert-manager.io/cluster-issuer: letsencrypt-prod
    ingress.kubernetes.io/configuration-snippet: |
        rewrite ^/(.*)$ https://example.org/$1 permanent;
spec:
  tls:
    - hosts:
        - app.example.org
      secretName: prod-tls
  rules:
    - host: app.example.org
      http:
          paths:
              - path: /
                backend:
                  serviceName: app-service
                  servicePort: 80
```
