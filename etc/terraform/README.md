[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Terraform Examples

## Prerequistes

Install [Terraform](https://www.terraform.io).

```bash
dla terraform-install
```

## Keypair

```bash
# Create a keypair.
chmod 700 key && rm key
openssl genrsa 2048 > key
chmod 400 key
# openssl rsa -in key -outform PEM -pubout -out key.pub
# sed -e '/----.*PUBLIC KEY----\|^[[:space:]]*$/d' public.pem # Or remove the heading/trailing lines manually.
ssh-keygen -y -f key > key.pub
# Check the fingerprint.
openssl sha1 -c ./key.pub
```

## Get Credentials

```bash
# Ensure you have AWS credentials, with e.g.
export AWS_DEFAULT_PROFILE=datalayer
export AWS_DEFAULT_REGION=eu-west-2
export AWS_ACCESS_KEY_ID=$(cat ~/.aws/credentials | grep aws_access_key_id | awk -F "= " '{print $2}')
export AWS_SECRET_ACCESS_KEY=$(cat ~/.aws/credentials | grep aws_secret_access_key | awk -F "= " '{print $2}')
# AWS_SESSION_TOKEN if needed/available - Typically in STS cases.
export AWS_SESSION_TOKEN=$(cat ~/.aws/credentials | grep aws_session_token | awk -F "= " '{print $2}')
```

```bash
# If you are authenticated as a user.
aws iam get-user
# If you are authenticated via STS...
aws sts get-caller-identity
```

## Deploy

Go into one of the example folders and check the `README` you will find there before applying the next steps.

```bash
terraform workspace list
# Select you workspace.
WORKSPACE=dla-$(date +%F-%I-%M-%S)
# Create you workspace.
WORKSPACE=dla-$(date +%F-%I-%M-%S)
terraform workspace new $WORKSPACE
```

```bash
# Initialize your Terraform modules.
terraform init
```

```bash
# Plan you infrastructure.
# terraform plan -out=".terraform-plan-"$WORKSPACE
terraform plan
```

```bash
# Effectively create your infrastructure in AWS.
terraform apply -auto-approve # !!! This will effectively create your infrastructure in AWS.
```

## Troubleshoot

```bash
# Print outputs.
terraform output
terraform output <my_output>
```

```bash
# Unlock if needed...
# ...or invoke a terraform command with `-lock=false` option
# ...or try `rm -fr terraform.tfstate.d/...`
terraform force-unlock -force <ID>
```

## Validate

```bash
# Take a note of the created EIP or ELB address and connect to your instance via SSH.
ssh -i key ubuntu@ADDRESS
```

```bash
# To try, launch a HTTP Server on an EC2 instance.
echo "Hello, World" > index.html
sudo busybox httpd -f -p 80
```

## Destroy

```bash
# Don't forget to destroy your infrastructure if you don't need it anymore...
terraform destroy -auto-approve # !!! This will directly destroy your infrastructure in AWS.
terraform workspace select default
terraform workspace delete $WORKSPACE
```
