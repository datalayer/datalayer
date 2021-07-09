[![Datalayer](https://raw.githubusercontent.com/datalayer/datalayer/main/res/logo/datalayer-25.svg?sanitize=true)](https://datalayer.io)

# Jupyter Platform for Crossplane

## Environment

```bash
# Setup your development environment.
conda deactivate && \
  make env-rm # If you want to reset your env.
make env && \
  conda activate crossplane-jupyter
```

```bash
./sbin/create-kind.sh
# Change the RAND random number to fit your project name `crossplane-jupyter-$RAND`
./sbin/crossplane-gcp-min.sh 78025
```

## Define a Jupyter Platform

```bash
kubectl create -f ./platform
```

## Create a Jupyter Platform

```bash
kubectl create -f ./example/claim
kubectl get managed
kubectl get jupyter
```

## Access Kubernetes

```bash
# Connect to the workload GKE cluster.
K8S_SECRET=$(kubectl get secrets -n crossplane-system | grep gkecluster | awk '{print $1;}')
echo $K8S_SECRET
kubectl describe secret $K8S_SECRET -n crossplane-system
kubectl get secret $K8S_SECRET -n crossplane-system -o jsonpath='{.data.kubeconfig}' | base64 --decode > kubeconfig
kubectl --kubeconfig kubeconfig get pods -A
```

## Access JupyterHub

```bash
# Browse Jupyter with a proxy.
echo open http://localhost:8001/api/v1/namespaces/jupyterhub/services/http:jupyterhub:8888/proxy/
kubectl --kubeconfig kubeconfig proxy
```

```bash
# Browse Jupyter.
kubectl  --kubeconfig kubeconfig --namespace=jupyterhub get svc proxy-public
```

## Access the JupyterHub Database

```bash
# Connect to the database.
# DB_SECRET=$(kubectl get secrets -n crossplane-system | grep postgresql | awk '{print $1;}')
# kubectl describe secret $DB_SECRET -n crossplane-system
DB_SECRET=$(kubectl get secrets -n crossplane-system | grep role-jupyterhub-postgresql | awk '{print $1;}')
echo $DB_SECRET
kubectl describe secret $DB_SECRET -n crossplane-system
export DB_ENDPOINT=$(kubectl get secret $DB_SECRET -n crossplane-system -o jsonpath='{.data.endpoint}' | base64 --decode)
export DB_USERNAME=$(kubectl get secret $DB_SECRET -n crossplane-system -o jsonpath='{.data.username}' | base64 --decode)
export DB_PASSWORD=$(kubectl get secret $DB_SECRET -n crossplane-system -o jsonpath='{.data.password}' | base64 --decode)
PGPASSWORD=$DB_PASSWORD psql "dbname=jupyterhub user=$DB_USERNAME hostaddr=$DB_ENDPOINT"
\l
\c jupyterhub
# You are now connected to database "crossplane_examples" as user "crossplane-example-role".
\dt
                  List of relations
 Schema |        Name         | Type  |    Owner     
--------+---------------------+-------+--------------
 public | alembic_version     | table | jupyter-role
 public | api_tokens          | table | jupyter-role
 public | groups              | table | jupyter-role
 public | oauth_access_tokens | table | jupyter-role
 public | oauth_clients       | table | jupyter-role
 public | oauth_codes         | table | jupyter-role
 public | servers             | table | jupyter-role
 public | services            | table | jupyter-role
 public | spawners            | table | jupyter-role
 public | user_group_map      | table | jupyter-role
 public | users               | table | jupyter-role
select * from users;
\q
```

## Teardown Jupyter Platform

```bash
kubectl delete -f ./example/claim
kubectl delete -f ./platform
```
