[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# AWS EKS Terraform

## Tutorial

+ https://github.com/terraform-providers/terraform-provider-aws/tree/master/examples/eks-getting-started
+ https://aws.amazon.com/blogs/startups/from-zero-to-eks-with-terraform-and-helm
+ https://www.awsfeed.com/2019/05/29/from-zero-to-eks-with-terraform-and-helm
+ https://learn.hashicorp.com/terraform/aws/eks-intro
+ https://www.terraform.io/docs/providers/aws/guides/eks-getting-started.html

```bash
git clone https://github.com/terraform-providers/terraform-provider-aws.git
cd terraform-provider-aws/examples/eks-getting-started
terraform init
terraform plan
terraform apply
terraform output kubeconfig>config
export KUBECONFIG=$PWD
```

## Examples

+ https://github.com/howdio/terraform-aws-eks
+ https://github.com/christopherhein/terraform-eks

## JupyterHub

+ https://github.com/parente/z2jh-aws

## Workshop

```bash
# https://eksworkshop.com
# https://eksworkshop.com/terraform.html
git clone https://github.com/wesleycharlesblake/terraform-aws-eks.git
cd terraform-aws-eks
# We start by initializing the Terraform state.
terraform init
# We can now plan our deployment.
terraform plan \
  -var 'cluster-name=eks-tut-1' \
  -var 'desired-capacity=1' \
  -var 'ec2-key=eks-tut-1' \
  -out eks-tut-1
# And if we want to apply that plan.
terraform apply eks-tut-1
# Now that we have the cluster running, we need to create the KubeConfig file that will be used to manage the cluster.
# The terraform module stores the kubeconfig information in it’s state store. We can view it with this command.
terraform output kubeconfig
# And we can save it for use with this command.
terraform output kubeconfig > ${HOME}/.kube/config-eks-tut-1
# We now need to add this new config to the Kubectl Config list.
export KUBECONFIG=${HOME}/.kube/config-eks-tut-1:${HOME}/.kube/config
echo "export KUBECONFIG=${KUBECONFIG}" >> ${HOME}/.bashrc
# The terraform state also contains a config-map we can use for our EKS workers.
# View the configmap.
terraform output config-map
# Save the config-map.
terraform output config-map > /tmp/config-map-aws-auth.yml
# Apply the config-map.
kubectl apply -f /tmp/config-map-aws-auth.yml
# Confirm your nodes.
kubectl get nodes
# Congratulations! You now have a fully working Amazon EKS Cluster that is ready to use!
```

```bash
# In order to delete the resources created for this EKS cluster, run the following commands.
# View the plan.
terraform plan -destroy -out destroy-tf
# Execute the plan:
terraform apply destroy-tf
```

## AWS Module

+ https://github.com/terraform-aws-modules/terraform-aws-eks
+ https://registry.terraform.io/modules/terraform-aws-modules/eks/aws/5.1.0
+ https://www.terraform.io/docs/providers/aws/r/eks_cluster.html

##

+ https://github.com/cloudposse/terraform-aws-eks-cluster
+ https://github.com/anmolnagpal/terraform-eks

##

+ https://www.esentri.com/building-a-kubernetes-cluster-on-aws-eks-using-terraform_part2

##

+ https://aws.amazon.com/blogs/startups/from-zero-to-eks-with-terraform-and-helm
