# Kube2iam

## Prepare

Policy of `kubeadm_role` AWS Role.

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": [
                "sts:AssumeRole"
            ],
            "Effect": "Allow",
            "Resource": [
                "*"
            ]
        },
        {
            "Action": [
                "ec2:*"
            ],
            "Effect": "Allow",
            "Resource": [
                "*"
            ]
        },
        {
            "Action": [
                "s3:*"
            ],
            "Effect": "Allow",
            "Resource": [
                "*"
            ]
        },
        {
            "Action": [
                "elasticloadbalancing:*"
            ],
            "Effect": "Allow",
            "Resource": [
                "*"
            ]
        },
        {
            "Action": "route53:*",
            "Effect": "Allow",
            "Resource": [
                "*"
            ]
        },
        {
            "Action": "ecr:*",
            "Effect": "Allow",
            "Resource": "*"
        }
    ]
}
```

Trust of `kubeadm_role` AWS Role.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    },
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "iam.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    },
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "s3.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    },
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::AWS_ACCOUNT_ID:role/kubeadm_role"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

## K8S

```yaml
cat << EOF | kubectl apply -f -
kind: ClusterRole
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: kube2iam-clusterrole-default
  namespace: default
rules:
- apiGroups: ['']
  resources: ['*']
  verbs: ['get', 'watch', 'list', 'edit', 'create', 'delete']
---
kind: ClusterRoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: kube2iam-clusterrole-binding-default
  namespace: default
subjects:
- kind: User
  name: system:serviceaccount:default:default
  apiGroup: ''
roleRef:
  kind: ClusterRole
  name: kube2iam-clusterrole-default
  apiGroup: ''
EOF
```

```bash
helm install stable/kube2iam \
  --name kube2iam \
  --set extraArgs.base-role-arn=arn:aws:iam::AWS_ACCOUNT_ID:role/ \
  --set extraArgs.default-role=kubeadm_role \
  --set host.iptables=true \
  --set host.interface=cni0+ 
# See https://github.com/jtblin/kube2iam for correct host.interface - cni0 is for flannel.
# See https://github.com/jtblin/kube2iam/issues/41 $HOST_INTERFACE might not exist at runtime #41. <= add a + to the host.interface.
```

## Test 1

```bash
cat <<EOF | kubectl create -f -
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
#  namespace: jupyterhub
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      annotations:
        iam.amazonaws.com/role: kubeadm_role
#       iam.amazonaws.com/external-id: external-id
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.9.1
        ports:
        - containerPort: 80
EOF
```

```bash
POD_NAME=$(kubectl get pods -n default -l app=nginx -o jsonpath="{.items[0].metadata.name}")
kubectl exec -it $POD_NAME -n default -- bash
apt update
apt install -y jq curl python3-pip
pip install awscli
curl http://169.254.169.254/latest/meta-data/iam/security-credentials/
curl http://169.254.169.254/latest/meta-data/iam/security-credentials/kubeadm_role
aws s3 ls
aws sts assume-role --role-arn "arn:aws:iam::AWS_ACCOUNT_ID:role/kubeadm_role" --role-session-name "JHUB"
kubectl delete deploy nginx -n default
```

## Test 2

```bash
cat <<EOF | kubectl create -f -
apiVersion: v1
kind: Pod
metadata:
  name: awscli
  labels:
    name: awscli
  annotations:
    iam.amazonaws.com/role: arn:aws:iam::AWS_ACCOUNT_ID:role/kubeadm_role
#    iam.amazonaws.com/external-id: external-id
spec:
  containers:
  - image: fstab/aws-cli
    command: [ "/bin/bash", "-c", "--" ]
    args: [ "while true; do sleep 30; done;" ]
#      - "/home/aws/aws/env/bin/aws"
#      - "s3"
#      - "ls"
    name: awscli
EOF
kubectl logs awscli
kubectl exec -it awscli -n default -- bash
aws s3 ls
kubectl delete pod awscli
```

## Test 3

```
kubectl run nginx --image=nginx:1.9.1 -n jupyterhub -l app=nginx
POD_NAME=$(kubectl get pods -n jupyterhub -l app=nginx -o jsonpath="{.items[0].metadata.name}")
kubectl exec -it $POD_NAME -n jupyterhub -- bash
apt install -y jq curl python3-pip
pip install awscli
curl http://169.254.169.254/latest/meta-data/iam/security-credentials/
curl http://169.254.169.254/latest/meta-data/iam/security-credentials/kubeadm_role
kubectl delete deploy nginx -n jupyterhub
```
