[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Bastion with Terraform

This folder allows you to create and destroy a AWS VPC and EC2 Bastion instance with Terraform.

+ You need `Terraform` >= 0.12.5.
+ The used region is `eu-west-2`. You can change that in `variables.tf` and `main.tf`.

In `variables.tf`, only your current IP address will be allowed to connect.

You may enable S3 backend in `versions.tf`, in this case, replace `bucket = "tf-state-tut"` with an existing S3 bucket you manage.

```bash
# Connect to Bastion with SSH.
BASTION_IP=$(terraform output bastion-eip-public-ip)
ssh -i ./../../key ubuntu@$BASTION_IP
```
