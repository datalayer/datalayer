# AWS Kubeadm Terraform

```bash
MASTER_IP=$(tf11 output kubernetes_controlplane_public_ip)
ssh -i key ubuntu@$MASTER_IP
```

```bash
alias k=kubectl
df -k
k get nodes
k get pods -A
```

+ [Storage Class](./storageclass.md).
+ [Route53](./route53.md).
+ [Helm](./helm.md).
+ [K8S Dashboard](./k8s-dashboard.md).
+ [Ingress](./ingress.md).
+ [HackMD](./hackmd.md).
+ [Spark](./spark.md).
+ [JupyerHub](./jupyterhub.md).
+ [Kube2IAM](./kube2iam.md).
+ [STS](./sts.md).
