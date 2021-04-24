[![Datalayer](https://raw.githubusercontent.com/datalayer/datalayer/main/res/logo/datalayer-25.svg?sanitize=true)](https://datalayer.io)

# Datalayer Landing Helm Chart

## GKE

```bash
# IP.
gcloud compute addresses create sample-app-ip --global
gcloud compute addresses describe sample-app-ip --global
```

```bash
# Deployment.
cat <<EOF | kubectl apply -f -
apiVersion: apps/v1
kind: Deployment
metadata:
  name: sample-deployment
  labels:
    app: sample-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: sample-app
  template:
    metadata:
      labels:
        app: sample-app
    spec:
      containers:
      - name: sample-container
        image: gcr.io/datalayer-dev-1/dla-landing:0.0.3
        env:
          - name: DLAHOST
            value: "sample1.dla.io"
          - name: DSP_JWT_SECRET
            value: "${DSP_JWT_SECRET}"
        ports:
        - name: http
          containerPort: 9500
          protocol: TCP
        readinessProbe:
          httpGet:
            path: /
            port: 9500
          successThreshold: 1
          failureThreshold: 1
          initialDelaySeconds: 5
          periodSeconds: 5
EOF
```

```bash
# Service.
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Service
metadata:
  name: sample-app-service
  labels:
    app: sample-app
spec:
  type: NodePort
  selector:
    app: sample-app
  ports:
    - name: http
      protocol: TCP
      port: 9500
      targetPort: 9500
EOF
```

```bash
# Ingress.
cat <<EOF | kubectl apply -f -
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: sample-app-ingress
  annotations:
    kubernetes.io/ingress.global-static-ip-name: sample-app-ip
    # kubernetes.io/ingress.allow-http: "false"
    cert-manager.io/cluster-issuer: letsencrypt-prod
    acme.cert-manager.io/http01-edit-in-place: "true"
  labels:
    app: sample-app
spec:
  tls:
  - hosts:
    - sample1.dla.io
    secretName: sample-app-cert-secret
  rules:
  - host: sample1.dla.io
    http:
      paths:
      - path: /*
        backend:
          serviceName: sample-app-service
          servicePort: 9500
EOF
kubectl get ingress sample-app-ingress
kubectl get certificate sample-app-cert-secret
kubectl describe certificate sample-app-cert-secret
# You may also need to delete the existing secret, which cert-manager is watching.
# This will cause it to reprocess the request with the updated issuer.
kubectl delete secret sample-app-cert-secret
kubectl describe certificate sample-app-cert-secret
kubectl describe order sample-app-cert-secret-lph6m
kubectl describe challenge sample-app-cert-secret-lph6m-1030678367-1430374347
kubectl describe certificate sample-app-cert-secret
# Test.
curl http://<IP>
curl http://sample1.dla.io
open http://sample1.dla.io
curl https://sample1.dla.io
open https://sample1.dla.io
```
