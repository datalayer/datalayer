# Spark

```bash
# kubectl create serviceaccount spark
# kubectl create clusterrolebinding spark-role --clusterrole=edit --serviceaccount=default --namespace=jupyterhub
```

```yaml
cat << EOF | kubectl apply -f -
kind: Role
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: pod-all-jupyterhub
  namespace: jupyterhub
rules:
- apiGroups: ['']
  resources: ['pods']
  verbs: ['get', 'watch', 'list', 'edit', 'create', 'delete']
---
kind: RoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: pod-role-binding-jupyterhub
  namespace: jupyterhub
subjects:
- kind: User
  name: system:serviceaccount:jupyterhub:default
  apiGroup: ''
roleRef:
  kind: Role
  name: pod-all-jupyterhub
  apiGroup: ''
EOF
```

```bash
kubectl create namespace spark
# kubectl run spark --image=jupyter/pyspark-notebook:82d1d0bf0867 -n jupyterhub -l app=spark
kubectl run spark --image=datalayer/spark-k8s:0.0.1 -n spark -l app=spark
POD_NAME=$(kubectl get pods -n spark -l app=spark -o jsonpath="{.items[0].metadata.name}")
kubectl exec -it $POD_NAME -n spark -- bash
```

```bash
cat /var/run/secrets/kubernetes.io/serviceaccount/namespace
#  --conf spark.kubernetes.container.image=elyra/kernel-spark-py:2.0.0 \
$SPARK_HOME/bin/pyspark \
  --conf spark.app.name=spark-cli \
  --conf spark.kubernetes.namespace=jupyterhub \
  --conf spark.master=k8s://https://kubernetes.default.svc:443 \
  --conf spark.kubernetes.container.image=datalayer/kernel-spark-py:0.0.1 \
  --conf spark.kubernetes.container.image.pullPolicy=IfNotPresent \
  --conf spark.driver.host=$(hostname -i) \
  --conf spark.submit.deployMode=client \
  --conf spark.sql.catalogImplementation=in-memory \
  --conf spark.driver.memory=1g \
  --conf spark.executor.memory=1g \
  --conf spark.executor.instances=3
#  --conf spark.kubernetes.authenticate.driver.serviceAccountName=spark \
#  --conf spark.kubernetes.authenticate.submission.caCertFile=/var/run/secrets/kubernetes.io/serviceaccount/apiserver.crt
```

```python
spark
sc
l = [1, 2, 3, 4]
df = spark.createDataFrame(l, IntegerType())
df.toPandas()
```

```bash
kubectl delete deploy spark -n jupyterhub
```

```bash
curl http://169.254.169.254/latest/meta-data/iam/security-credentials/kubeadm_role
```

```bash
AWS_DEFAULT_REGION=ap-northeast-2
J=$(curl http://169.254.169.254/latest/meta-data/iam/security-credentials/kubeadm_role)
AWS_ACCESS_KEY_ID=$(echo $J | jq -r ".AccessKeyId")
AWS_SECRET_ACCESS_KEY=$(echo $J | jq -r ".SecretAccessKey")
AWS_SESSION_TOKEN=$(echo $J | jq -r ".Token")
```
