[![Datalayer](https://raw.githubusercontent.com/datalayer/datalayer/main/res/logo/datalayer-25.svg?sanitize=true)](https://datalayer.io)

# Datalayer MinIO Helm Chart

- https://github.com/minio
- https://github.com/minio/minio

- https://min.io

- https://blog.min.io/object_storage_as_a_service_on_minio

- https://docs.min.io

- https://github.com/helm/charts/tree/master/stable/minio
- https://medium.com/faun/minio-object-storage-deployment-on-kubernetes-83f81fba1d03

## Prerequisites for MinIO

```bash
cat <<EOF | kubectl create -f -
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: minio-storage
# provisioner: kubernetes.io/no-provisioner
provisioner: k8s.io/minikube-hostpath
volumeBindingMode: WaitForFirstConsumer
EOF
```

```bash
# Install the MinIO Plugin using krew.
kubectl krew update && \
  kubectl krew install minio
```

## MinIO Helm Chart

- https://github.com/minio/operator/tree/master/helm/minio-operator

- https://docs.min.io/minio/k8s

```bash
# Configure MinIO Helm repo.
helm repo add minio https://operator.min.io
# Installing the Chart.
# The command deploys MinIO Operator on the Kubernetes cluster in the default configuration.
helm install dsp-minio \
  --namespace minio-operator \
  --create-namespace \
  --version 4.0.3 \
  minio/minio-operator
```

```bash
# Get the JWT for logging in to the console.
kubectl get secret $(kubectl get serviceaccount console-sa --namespace minio-operator -o jsonpath="{.secrets[0].name}") \
  --namespace minio-operator \
  -o jsonpath="{.data.token}" | base64 --decode && echo
# Get the Operator Console URL by running these commands:
kubectl --namespace minio-operator port-forward svc/console 9090:9090
echo "Visit the MinIO Operator Console at http://localhost:9090"
```

```bash
# Creating a Tenant.
# Once Chart is successfully installed, create a MinIO Tenant.
# kubectl apply -f https://github.com/minio/operator/blob/master/examples/tenant.yaml
kubectl apply -f ./specs/tenant.yaml
```

```bash
# Other examples on https://github.com/minio/operator/tree/master/examples
```

```bash
kubectl get tenants -n dsp-minio -w
kubectl get tenants -n dsp-minio
kubectl get tenant dsp-minio -n dsp-minio -o yaml
```

## MinIO Operator

- https://github.com/minio/operator

- https://docs.min.io/minio/k8s

```bash
# Run the following command to initialize the Operator.
kubectl minio init
# MinIO Operator Namespace minio-operator: created
# CustomResourceDefinition tenants.minio.min.io: created
# ClusterRole minio-operator-role: created
# ServiceAccount minio-operator: created
# ClusterRoleBinding minio-operator-binding: created
# MinIO Operator Service operator: created
# MinIO Operator Deployment minio-operator: created
# MinIO Console Deployment: created
# -----------------
# To open Operator UI, start a port forward using this command:
# kubectl minio proxy
# -----------------
kubectl minio delete
```

```bash
kubectl create ns dsp-minio
```

```bash
# Create a New Tenant.
# The following kubectl minio command creates a MinIO Tenant with 1 nodes, 3 volumes, and a total capacity of 3Mi.
# This configuration requires at least 4 Persistent Volumes.
# The analogy we used to represent a MinIO Object Storage cluster is Tenant. We did this to communicate that with the MinIO Operator one can allocate multiple Tenants within the same Kubernetes cluster. Each tenant, in turn, can have different capacity (i.e: a small 500GB tenant vs a 100TB tenant), resources (1000m CPU and 4Gi RAM vs 4000m CPU and 16Gi RAM) and servers (4 pods vs 16 pods), as well a separate configurations regarding Identity Providers, Encryption and versions.
kubectl minio tenant \
  create dsp-minio \
  --servers 1 \
  --volumes 4 \
  --capacity 4Mi \
  --namespace dsp-minio \
  --storage-class standard
#  --storage-class minio-storage
```

```
MinIO outputs credentials for connecting to the MinIO Tenant as part of the creation process:
Tenant 'dsp-minio' created in 'dsp-minio' Namespace
  Username: admin
  Password: ...
+-------------+------------------------+------------------+--------------+-----------------+
| APPLICATION |      SERVICE NAME      |     NAMESPACE    | SERVICE TYPE | SERVICE PORT(S) |
+-------------+------------------------+------------------+--------------+-----------------+
| MinIO       | minio                  | dsp-minio        | ClusterIP    | 443             |
| Console     | dsp-minio-console      | dsp-minio        | ClusterIP    | 9090,9443       |
+-------------+------------------------+------------------+--------------+-----------------+
Copy the credentials to a secure location, such as a password protected key manager. MinIO does not display these credentials again.
```

```bash
kubectl get tenants -n dsp-minio -w
kubectl get tenants -n dsp-minio
kubectl get tenant dsp-minio -n dsp-minio -o yaml
```

```bash
# Expand Tenant.
kubectl minio \
  tenant expand dsp-minio \
  --servers 4 \
  --volumes 16 \
  --capacity 16Mi
```

## SSL

```bash
# MinIO Tenants deploy with TLS enabled by default, where the MinIO Operator uses the Kubernetes certificates.k8s.io API to generate the required x.509 certificates. Each certificate is signed using the Kubernetes Certificate Authority (CA) configured during cluster deployment. While Kubernetes mounts this CA on Pods in the cluster, Pods do not trust that CA by default. You must copy the CA to a directory such that the update-ca-certificates utility can find and add it to the system trust store to enable validation of MinIO TLS certificates.
# https://support.kerioconnect.gfi.com/hc/en-us/articles/360015200119-Adding-Trusted-Root-Certificates-to-the-Server
# MacOS.
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain ca.crt
# Linux.
cp /var/run/secrets/kubernetes.io/serviceaccount/ca.crt /usr/local/share/ca-certificates/
update-ca-certificates
```

```bash
# patch python aiohttp::client.py with verify_ssl: Optional[bool] = False,
```

## MinIO MC

```bash
dla minio-mc-install
# https://docs.min.io/docs/minio-client-quickstart-guide.html
# Terminal 1.
kubectl port-forward svc/minio 9000:443 -n dsp-minio
open https://minio.dsp-minio.svc.cluster.local:9000/minio
# Terminal 2.
mc alias set dsp-minio \
  https://local.dsp-minio-hl.dsp-minio.svc.cluster.local:9000 \
  --insecure # Access_Key Secret_Key
mc admin info dsp-minio --insecure
mc tree dsp-minio --insecure
mc mb dsp-minio/test1 --insecure
mc ls dsp-minio --insecure
```

## MinIO UI

```bash
# For applications external to the Kubernetes cluster, you must configure Ingress or a Load Balancer to expose the MinIO Tenant services.
# Alternatively, you can use the kubectl port-forward command to temporarily forward traffic from the localhost to the MinIO Tenant.
# The minio service provides access to MinIO Object Storage operations.
# The dsp-minio-console service provides access to the MinIO Console. The MinIO Console supports GUI administration of the MinIO Tenant.
# export POD_NAME=$(kubectl get pods -n dsp-minio -o jsonpath="{ .items[0].metadata.name }") && \
#   echo "Visit http://localhost:8080/info to access the minio service" && \
#   kubectl port-forward -n dsp-minio $POD_NAME 443:443
# minikube service minio -n dsp-minio
```

```bash
# MinIO Browser.
kubectl port-forward svc/minio 9000:443 -n dsp-minio
open https://minio.dsp-minio.svc.cluster.local:9000/minio
# MinIO Operator Console.
kubectl port-forward svc/dsp-minio-console 9090:9443 -n dsp-minio
open https://minio.dsp-minio.svc.cluster.local:9090/minio
# MinIO Operator Console (with kubectl proxy).
kubectl minio proxy
open http://minio.dsp-minio.svc.cluster.local:9090/login
```

## Minio Python

- https://github.com/minio/minio-py
- https://github.com/minio/minio-py/blob/master/docs/API.md

```py
from minio import Minio

# Create client with anonymous access.
client = Minio("play.min.io")

# Create client with access and secret key.
client = Minio("s3.amazonaws.com", "ACCESS-KEY", "SECRET-KEY")

# Create client with access key and secret key with specific region.
client = Minio(
    "play.minio.io:9000",
    access_key="...",
    secret_key="...",
    region="my-region",
)

# Create client with custom HTTP client using proxy server.
import urllib3
client = Minio(
    "SERVER:PORT",
    access_key="ACCESS_KEY",
    secret_key="SECRET_KEY",
    secure=True,
    http_client=urllib3.ProxyManager(
        "https://PROXYSERVER:PROXYPORT/",
        timeout=urllib3.Timeout.DEFAULT_TIMEOUT,
        cert_reqs="CERT_REQUIRED",
        retries=urllib3.Retry(
            total=5,
            backoff_factor=0.2,
            status_forcelist=[500, 502, 503, 504],
        ),
    ),
)
```

- https://docs.python.org/3/library/ssl.html#ssl.SSLContext.verify_mode This attribute must be one of CERT_NONE, CERT_OPTIONAL or CERT_REQUIRED.
