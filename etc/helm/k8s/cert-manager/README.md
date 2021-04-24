[![Datalayer](https://raw.githubusercontent.com/datalayer/datalayer/main/res/logo/datalayer-25.svg?sanitize=true)](https://datalayer.io)

# Datalayer Certificates Manager

- https://github.com/jetstack/cert-manager

- https://cert-manager.io

- https://cert-manager.io/docs/installation/kubernetes

- Renew https://medium.com/dzerolabs/how-to-renew-lets-encrypt-certificates-managed-by-cert-manager-on-kubernetes-2a74f9a0975d

## GCloud GKE

### GKE Recipes

- https://github.com/GoogleCloudPlatform/gke-networking-recipes/tree/master/ingress/secure-ingress
- https://github.com/GoogleCloudPlatform/gke-networking-recipes/blob/master/ingress/secure-ingress/secure-ingress.yaml

```bash
gcloud compute addresses create sample-app-ip --global
gcloud compute addresses describe sample-app-ip --global
gcloud compute ssl-policies create gke-ingress-ssl-policy \
  --profile MODERN \
  --min-tls-version 1.2
kubectl apply -f ./gke-example/secure-ingress.yml
kubectl get ingress secure-ingress
curl http://sample.dla.io
curl https://sample.dla.io
kubectl describe ingress secure-ingress
kubectl delete -f ./gke-example/secure-ingress.yml
gcloud compute addresses delete sample-app-ip --global
gcloud compute ssl-policies delete gke-ingress-ssl-policy
```

### GKE Example

- https://medium.com/google-cloud/https-with-cert-manager-on-gke-49a70985d99b
- https://kosyfrances.github.io/ingress-gce-letsencrypt

```bash
# https://kosyfrances.github.io/ingress-gce-letsencrypt

# Google Kubernetes Engine (GKE) provides a built-in and managed Ingress controller called GKE Ingress.
# When you create an Ingress object, the GKE Ingress controller creates a Google Cloud HTTP(S) load balancer and configures it according to the information in the Ingress and its associated Services.

# This article describes how to setup Ingress for External HTTP(S) Load Balancing, install cert-manager certificate provisioner and setup up a Let’s Encrypt certificate.
# This was written based on GKE v1.14.10-gke.17, cert-manager v0.13 and Helm v3.

# Prerequisites
# A GKE Kubernetes cluster
# Helm
# Kubectl

# A global static IP with DNS configured for your domain for example, as example.your-domain.com. Regional IP addresses do not work with GKE Ingress.

# You should see the issuer listed with a registered account.
gcloud compute addresses create sample-app-ip --global

# !!! Add a DNS entry for the given host sample.dla.io to the following IP Address !!!
gcloud compute addresses describe sample-app-ip --global

# Note that a Service exposed through an Ingress must respond to health checks from the load balancer. According to the docs, your app must either serve a response with an HTTP 200 status to GET requests on the / path, or you can configure an HTTP readiness probe, serving a response with an HTTP 200 status to GET requests on the path specified by the readiness probe.

# Create a deployment
cat <<EOF | kubectl apply -f -
apiVersion: apps/v1
kind: Deployment
metadata:
  name: sample-deployment
  labels:
    app: sample-app
spec:
  replicas: 1
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
        image: hashicorp/http-echo
        args:
          - "-text=hello simple-echo"
        ports:
        - name: http
          containerPort: 5678
          protocol: TCP
        readinessProbe:
          httpGet:
            path: /
            port: 5678
          successThreshold: 1
          failureThreshold: 1
          initialDelaySeconds: 5
          periodSeconds: 5
EOF

# Create a service
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
      port: 8080
      targetPort: 5678
EOF

# Install cert-manager

# cert-manager runs within your Kubernetes cluster as a series of deployment resources. It utilizes CustomResourceDefinitions to configure Certificate Authorities and request certificates. The following steps installs cert-manager on your Kubernetes cluster.

# Create the namespace for cert-manager.
kubectl create namespace cert-manager

# Add the Jetstack Helm repository.
helm repo add jetstack https://charts.jetstack.io
# Update your local Helm chart repository cache.
helm repo update

# Install the cert-manager Helm chart.
helm install \
  cert-manager jetstack/cert-manager \
  --namespace cert-manager \
  --version v1.2.0 \
  --create-namespace \
  --set installCRDs=true

# Verify the installation.
kubectl get pods --namespace cert-manager -w
# NAME                                       READY   STATUS    RESTARTS   AGE
# cert-manager-5c6866597-zw7kh               1/1     Running   0          2m
# cert-manager-cainjector-577f6d9fd7-tr77l   1/1     Running   0          2m
# cert-manager-webhook-787858fcdb-nlzsq      1/1     Running   0          2m

# You should see the cert-manager, cert-manager-cainjector, and cert-manager-webhook pod in a Running state.
# It may take a minute or so for the TLS assets required for the webhook to function to be provisioned.

# Create an Issuer to test the webhook works okay.
cat <<EOF > /tmp/test-resources.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: cert-manager-test
---
apiVersion: cert-manager.io/v1
kind: Issuer
metadata:
  name: test-selfsigned
  namespace: cert-manager-test
spec:
  selfSigned: {}
---
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: selfsigned-cert
  namespace: cert-manager-test
spec:
  dnsNames:
    - example.com
  secretName: selfsigned-cert-tls
  issuerRef:
    name: test-selfsigned
EOF

# Create the test resources.
kubectl apply -f /tmp/test-resources.yaml

# Check the status of the newly created certificate. You may need to wait a few seconds before cert-manager processes the certificate request.
kubectl describe certificate -n cert-manager-test
# ...
# Spec:
#   Common Name:  example.com
#   Issuer Ref:
#     Name:       test-selfsigned
#   Secret Name:  selfsigned-cert-tls
# Status:
#   Conditions:
#     Last Transition Time:  2020-01-29T17:34:30Z
#     Message:               Certificate is up to date and has not expired
#     Reason:                Ready
#     Status:                True
#     Type:                  Ready
#   Not After:               2020-04-29T17:34:29Z
# Events:
#   Type    Reason      Age   From          Message
#   ----    ------      ----  ----          -------
#   Normal  CertIssued  4s    cert-manager  Certificate issued successfully

# Clean up the test resources.
kubectl delete -f /tmp/test-resources.yaml

# If all the above steps have completed without error, you are good to go!

# Create issuer

# The Let’s Encrypt production issuer has very strict rate limits. When you are experimenting and learning, it is very easy to hit those limits, and confuse rate limiting with errors in configuration or operation. Start with Let’s Encrypt staging environment and switch to Let’s Encrypt production after it works fine. In this article, we will be creating a ClusterIssuer.

# Create a clusterissuer definition and update the email address to your own. This email is required by Let’s Encrypt and used to notify you of certificate expiration and updates.

cat <<EOF | kubectl apply -f -
apiVersion: cert-manager.io/v1alpha2
kind: ClusterIssuer
metadata:
  name: letsencrypt-staging
spec:
  acme:
    # The ACME server URL
    server: https://acme-staging-v02.api.letsencrypt.org/directory
    # Email address used for ACME registration
    email: eric@datalayer.io # Update to yours
    # Name of a secret used to store the ACME account private key
    privateKeySecretRef:
      name: letsencrypt-staging
    # Enable the HTTP-01 challenge provider
    solvers:
    - http01:
        ingress:
            class: ingress-gce
EOF

# Check on the status of the clusterissuer after you create it:
kubectl describe clusterissuer letsencrypt-staging
# Name:         letsencrypt-staging
# ...
# Status:
#   Acme:
#     Last Registered Email:  you@youremail.com
#     Uri:                    https://acme-staging-v02.api.letsencrypt.org/acme/acct/123456
#   Conditions:
#     Last Transition Time:  2020-02-24T18:33:56Z
#     Message:               The ACME account was registered with the ACME server
#     Reason:                ACMEAccountRegistered
#     Status:                True
#     Type:                  Ready
# Events:                    <none>

cat <<EOF | kubectl apply -f -
apiVersion: cert-manager.io/v1alpha2
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    # The ACME server URL
    server: https://acme-v02.api.letsencrypt.org/directory
    # Email address used for ACME registration
    email: eric@datalayer.io # Update to yours
    # Name of a secret used to store the ACME account private key
    privateKeySecretRef:
      name: letsencrypt-prod
    # Enable the HTTP-01 challenge provider
    solvers:
    - http01:
        ingress:
            class: ingress-gce
EOF

# Check on the status of the clusterissuer after you create it:
kubectl describe clusterissuer letsencrypt-prod

# Deploy a TLS Ingress Resource

# Create an ingress definition.

cat <<EOF > /tmp/ingress.yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: sample-app-ingress
  annotations:
    # specify the name of the global IP address resource to be associated with the HTTP(S) Load Balancer.
    kubernetes.io/ingress.global-static-ip-name: sample-app-ip
    # add an annotation indicating the issuer to use.
    cert-manager.io/cluster-issuer: letsencrypt-staging
    # controls whether the ingress is modified ‘in-place’,
    # or a new one is created specifically for the HTTP01 challenge.
    acme.cert-manager.io/http01-edit-in-place: "true"
  labels:
    app: sample-app
spec:
  tls: # < placing a host in the TLS config will indicate a certificate should be created
  - hosts:
    - sample.dla.io
    secretName: sample-app-cert-secret # < cert-manager will store the created certificate in this secret
  rules:
  - host: sample.dla.io
    http:
      paths:
      - path: /*
        backend:
          serviceName: sample-app-service
          servicePort: 8080
EOF

# Once edited, apply ingress resource.
kubectl apply -f /tmp/ingress.yaml

# Verify

# View certificate.
kubectl get certificate sample-app-cert-secret
# NAME                    READY     SECRET                AGE
# sample-app-cert-secret   True      sample-app-cert-secret   6m34s

# Describe certificate.
kubectl describe certificate sample-app-cert-secret
# Name:         sample-app-cert-secret
# ...
# Status:
#   Conditions:
#     Last Transition Time:  2020-03-02T16:30:01Z
#     Message:               Certificate is up to date and has not expired
#     Reason:                Ready
#     Status:                True
#     Type:                  Ready
#   Not After:               2020-05-24T17:55:46Z
# Events:                    <none>

# Describe secrets created by cert manager.
kubectl describe secret sample-app-cert-secret
# Name:         sample-app-cert-secret
# ...
# Type:  kubernetes.io/tls
# Data
# ====
# ca.crt:   0 bytes
 #tls.crt:  3598 bytes
# tls.key:  1675 bytes

curl http://<IP>
curl http://sample.dla.io
open http://sample.dla.io
curl https://sample.dla.io
curl https://sample.dla.io --insecure
open https://sample.dla.io

# Switch to Let’s Encrypt Prod

# Now that we are sure that everything is configured correctly, you can update the annotations in the ingress to specify the production issuer:

cat <<EOF > /tmp/ingress.yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: sample-app-ingress
  annotations:
    kubernetes.io/ingress.allow-http: "false"
    # specify the name of the global IP address resource to be associated with the HTTP(S) Load Balancer.
    kubernetes.io/ingress.global-static-ip-name: sample-app-ip
    # add an annotation indicating the issuer to use.
    cert-manager.io/cluster-issuer: letsencrypt-prod
    # controls whether the ingress is modified ‘in-place’,
    # or a new one is created specifically for the HTTP01 challenge.
    acme.cert-manager.io/http01-edit-in-place: "true"
  labels:
    app: sample-app
spec:
  tls: # < placing a host in the TLS config will indicate a certificate should be created
  - hosts:
    - sample.dla.io
    secretName: sample-app-cert-secret # < cert-manager will store the created certificate in this secret
  rules:
  - host: sample.dla.io
    http:
      paths:
      - path: /*
        backend:
          serviceName: sample-app-service
          servicePort: 8080
EOF

# kubectl apply --edit -f ingress.yaml
kubectl create -f /tmp/ingress.yaml
# ingress.extensions "sample-app-ingress" configured

# You will also need to delete the existing secret, which cert-manager is watching. This will cause it to reprocess the request with the updated issuer.
kubectl delete secret sample-app-cert-secret
# secret "sample-app-cert-secret" deleted

# This will start the process to get a new certificate. Use describe to see the status.
kubectl get certificate sample-app-cert-secret
kubectl describe certificate sample-app-cert-secret

# You can see the current state of the ACME Order by running kubectl describe on the Order resource that cert-manager has created for your Certificate:
kubectl describe order sample-app-cert-secret-lph6m
# ...
# Events:
#   Type    Reason      Age   From          Message
#   ----    ------      ----  ----          -------
#   Normal  Created     90s   cert-manager  Created Challenge resource "sample-app-cert-secret-889745041-0" for domain "example.example.com"

# You can describe the challenge to see the status of events by doing:
kubectl describe challenge sample-app-cert-secret-lph6m-1030678367-1430374347

# Once the challenge(s) have been completed, their corresponding challenge resources will be deleted, and the ‘Order’ will be updated to reflect the new state of the Order. You can describe order to verify this.

# Finally, the ‘Certificate’ resource will be updated to reflect the state of the issuance process. ‘describe’ the Certificate and verify that the status is true and type and reason are ready.
kubectl describe certificate sample-app-cert-secret

curl http://<IP>
curl http://sample.dla.io
open http://sample.dla.io
curl https://sample.dla.io
open https://sample.dla.io

# Teradown
kubectl delete -f /tmp/ingress.yaml
gcloud compute addresses delete sample-app-ip --global
```

## Amazon EKS

- https://medium.com/cloud-prodigy/configure-letsencrypt-and-cert-manager-with-kubernetes-3156981960d9
