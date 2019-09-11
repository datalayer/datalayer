# Route53

```bash
cat <<EOF | kubectl create -f -
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  name: route53-clusterrole-binding
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: default
  namespace: kube-system
EOF
kubectl describe clusterrolebinding route53-clusterrole-binding
```

```bash
# kubectl apply -f https://raw.githubusercontent.com/kubernetes/kops/master/addons/route53-mapper/v1.3.0.yml
cat << EOF | kubectl apply -f -
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: route53-mapper
  namespace: kube-system
  labels:
    app: route53-mapper
    k8s-addon: route53-mapper.addons.k8s.io
spec:
  replicas: 1
  selector:
    matchLabels:
      app: route53-mapper
  template:
    metadata:
      labels:
        app: route53-mapper
      annotations:
        scheduler.alpha.kubernetes.io/tolerations: '[{"key":"dedicated", "value":"master"}]'
    spec:
#      nodeSelector:
#        kubernetes.io/role: master
      containers:
        - image: quay.io/molecule/route53-kubernetes:v1.3.0
          name: route53-mapper
EOF
```
