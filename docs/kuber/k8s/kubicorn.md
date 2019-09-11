---
title: Kubicorn
---

# Kubicorn

> [Kubicorn](http://kubicorn.io) - Simple, cloud native infrastructure for Kubernetes - [GitHub](https://github.com/kubicorn/kubicorn).

## Build and Install

```
go get github.com/kubicorn/kubicorn
```

```
cd $GOPATH/src/github.com/kubicorn/kubicorn
make clean
make
make install
# go install github.com/kubicorn/kubicorn
kubicorn version
kubicorn
```

## Use

```bash
export AWS_ACCESS_KEY_ID=xxx
export AWS_SECRET_ACCESS_KEY=xxx
```

```bash
cd ~/.datalayer/kubicorn
kubicorn create kuber -p aws
```

```bash
# kubicorn apply kuber -v 4 --aws-profile kuber
kubicorn apply kuber -v 4
watch kubectl get nodes; watch kubectl get pods --all-namespaces
```

```bash
ssh -i ~/.ssh/id_rsa ubuntu@<master>
sudo su
cat /var/lib/cloud/instance/scripts/part-001
cat /etc/kubicorn/cluster.json
cat /var/log/cloud-init.log
cat /var/log/cloud-init-output.log
cat /etc/kubicorn/kubeadm-config.yaml
cat /run/cloud-init/result.json 
sudo journalctl -u cloud-final
```

```
systemctl restart kubelet
journalctl -fu kubelet
docker ps
```

```
mkdir ~/.kube
cp /etc/kubernetes/admin.conf ~/.kube/config
alias k=kubectl
# export KUBECONFIG=/etc/kubernetes/kubelet.conf
export KUBECONFIG=/etc/kubernetes/admin.conf
kubectl get pods --all-namespaces
kubectl get svc --all-namespaces
```

```
export AWS_ACCESS_KEY_ID=xxx
export AWS_SECRET_ACCESS_KEY=xxxx
cd ~/.datalayer/kubicorn
kubicorn delete kuber -v 4 --purge
```

## IAM Cleanup

```
aws iam list-roles | grep Kubicorn
aws iam list-instance-profiles | grep Kubicorn
```

```
# Delete Master defined IAM objects
aws iam list-instance-profiles-for-role --role-name kuber-KubicornMasterRole
aws iam list-role-policies --role-name kuber-KubicornMasterRole
aws iam remove-role-from-instance-profile --instance-profile-name kuber-KubicornMasterInstanceProfile --role-name kuber-KubicornMasterRole
aws iam delete-role-policy --role-name kuber-KubicornMasterRole --policy-name MasterPolicy
aws iam delete-role --role-name kuber-KubicornMasterRole
aws iam delete-instance-profile --instance-profile-name kuber-KubicornMasterInstanceProfile
# Delete Worker defined IAM objects
aws iam list-instance-profiles-for-role --role-name kuber-KubicornNodeRole
aws iam list-role-policies --role-name kuber-KubicornNodeRole
aws iam remove-role-from-instance-profile --instance-profile-name kuber-KubicornNodeInstanceProfile --role-name kuber-KubicornNodeRole
aws iam delete-role-policy --role-name kuber-KubicornNodeRole --policy-name NodePolicy
aws iam delete-role --role-name kuber-KubicornNodeRole
aws iam delete-instance-profile --instance-profile-name kuber-KubicornNodeInstanceProfile
```

## Minimum IAM Profile

```
{
    "Version": "2012-10-17",
    "Statement": {
        "Effect": "Allow",
        "Action": [
            "autoscaling:CreateAutoScalingGroup",
            "autoscaling:CreateLaunchConfiguration",
            "autoscaling:CreateOrUpdateTags",
            "autoscaling:DeleteAutoScalingGroup",
            "autoscaling:DeleteLaunchConfiguration",
            "autoscaling:DescribeAutoScalingGroups",
            "autoscaling:DescribeLaunchConfigurations",
            "autoscaling:UpdateAutoScalingGroup",
            "ec2:AssociateRouteTable",
            "ec2:AttachInternetGateway",
            "ec2:AuthorizeSecurityGroupIngress",
            "ec2:CreateInternetGateway",
            "ec2:CreateRoute",
            "ec2:CreateRouteTable",
            "ec2:CreateSecurityGroup",
            "ec2:CreateSubnet",
            "ec2:CreateTags",
            "ec2:CreateVpc",
            "ec2:DeleteInternetGateway",
            "ec2:DeleteRouteTable",
            "ec2:DeleteSecurityGroup",
            "ec2:DeleteSubnet",
            "ec2:DeleteTags",
            "ec2:DeleteVpc",
            "ec2:DescribeInstances",
            "ec2:DescribeInternetGateways",
            "ec2:DescribeRouteTables",
            "ec2:DescribeSecurityGroups",
            "ec2:DescribeSubnets",
            "ec2:DescribeVpcs",
            "ec2:DetachInternetGateway",
            "ec2:DisassociateRouteTable",
            "ec2:ImportKeyPair",
            "ec2:ModifyVpcAttribute",
            "ec2:RunInstances",
            "ec2:TerminateInstances",
            "iam:AddRoleToInstanceProfile",
            "iam:CreateInstanceProfile",
            "iam:CreateRole",
            "iam:DeleteInstanceProfile",
            "iam:DeleteInstanceProfile",
            "iam:DeleteRole",
            "iam:DeleteRolePolicy",
            "iam:GetInstanceProfile",
            "iam:GetRolePolicy",
            "iam:ListRolePolicies",
            "iam:PassRole",
            "iam:PutRolePolicy",
            "iam:RemoveRoleFromInstanceProfile"
        ],
        "Resource": "*"
    }
}

```
<!--
## Deprecated

This are the steps to deploy your development (unsecure) Kubernetes cluster on Amazon with AWS EC2.

We assume you have the needed PVC and network available in your availabilty zone (e.g. `us-west-2`).

You also need a IAM role setup with the correct profile (see at the bottom of this page).

**Create Master**

Deploy a master EC2 machine based on the Ubuntu image `ami-835b4efa` with size `c3.4xlarge` (16vCPU with 30 GB RAM). Ensure you have 32 GB as root storage and open the security group.

To allow reuse on shutdown, associate an fixed Elastic IP to the machine.

Connect with `ssh` to the machine and run the following commands.

```
sudo su
cd
curl https://raw.githubusercontent.com/datalayer/apps/kuber-master/_specs/aws/kuber-aws-master -o $DLAHOME/bin/kuber-aws-master
chmod +x $DLAHOME/bin/kuber-aws-master
kuber-aws-master
```

Take note of the printed kubeadm command, e.g:

```
kubeadm join --token ed5ef9.6c35783ca6cb8994 52.88.44.52:433 --discovery-token-ca-cert-hash sha256:927f1dbe79dac89514ada952a5d283af45e695ddaf5d2c9020d52fa28edb36cb
```

**Join Workers**

Create workers based on the image `ami-4f0ad337` with size `c3.4xlarge`.

If you prefer spot instances, choose the size `r3.4xlarge`:

+ Set the maximum price to e.g. `0.4$`.
+ Select `persistent-request`.
+ Set the IAM role.
+ Define the worker security group.

To setup you worker instance from any other image, follow these steps:

```
sudo su
cd
curl https://raw.githubusercontent.com/datalayer/apps/kuber-master/_specs/aws/kuber-aws-join -o $DLAHOME/bin/kuber-aws-join 
chmod +x $DLAHOME/bin/kuber-aws-join
kuber-aws-join
```
-->
