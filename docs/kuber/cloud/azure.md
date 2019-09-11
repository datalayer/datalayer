---
title: Microsoft Azure
---

# Microsoft Azure

## CLI

```bash
curl -L https://aka.ms/InstallAzureCli | bash
exec -l $SHELL
```

```bash
az login
az configure
az feedback
az account list --all --out table
az account set --subscription "xxx"
az account set --subscription "xxx"
az logout
```

## Apps and Service Principal

Option 1

```bash
az group create -n "spceastus" -l "eastus"
```

```bash
# Optional...
az ad sp create-for-rbac --name xyz-eric --role Contributor --scopes /subscriptions/4798...
AppId                                 DisplayName               Name                             Password                              Tenant
------------------------------------  ------------------------  -------------------------------  ------------------------------------  ------------------------------------
7bb... xyz-eric-echarles  http://xyz-eric-echarles  c-...  575...
```

```bash
az ad sp create-for-rbac --role Contributor --scopes="/subscriptions/47981fb.../resourceGroups/spceastus"
AppId                                 DisplayName                    Name                                  Password                              Tenant
------------------------------------  -----------------------------  ------------------------------------  ------------------------------------  ------------------------------------
e4f-...  azure-cli-2017-12-30-08-24-26  http://azure-cli-2017-12-30-08-24-26  f695ec14-3f9f-...  573dff35-c5a9-...
```

```bash
az role assignment create --assignee e4f-... --role Contributor
Name
------------------------------------
94fb6d96-1d01-....
```

```bash
az role assignment list
Principal                                             Role         Scope
----------------------------------------------------  -----------  ---------------------------------------------------
er...#EXT#@ericdat...  Owner        /subscriptions/4798....
http://xyz-eric-echarles                       Contributor  /subscriptions/47981fb0-d,,,,
http://azure-cli-2017-12-3                  Contributor  /subscriptions/47981fb0-d82a-....
```

```bash
AZURE_SUBSCRIPTION_ID: 47981fb0-d...
AZURE_TENANT_ID: 573dff35-c5a9...
AZURE_CLIENT_ID: e4fcb2ff-9cd0-....
AZURE_CLIENT_SECRET: xxx
```

```bash
az login --service-principal --username 551.... --password 66b....--tenant 57...
az group create -n xyz2 -l westus
az group list
az group delete -n xyz2
```

Option 2

```bash
az ad app list
az ad app list --display-name DatalayerApp2
az ad sp create-for-rbac --name xyz --password "xxx"
az ad sp create-for-rbac --name xyz --create-cert
az ad sp show --id xyz
az login --service-principal -u xyz --password {password-or-path-to-cert} --tenant {tenant}
az role assignment create --assignee xyz  6c...278e --role Reader
az role assignment delete --assignee xyz --role Contributor
az ad sp reset-credentials --name xyz --password {new-password}
```

## Certificates

Once signed up you might right away go ahead an create a management certificate for your account which you’ll need to use the Azure API.

The certificate is created locally on your machine then uploaded to the account using the management portal.

With the following instructions a certificate valid for the next year can be created.

```bash
openssl req -x509 -nodes -days 365 -newkey rsa:1024 -keyout ~/.ssh/azure_mgnt.pem -out ~/.ssh/azure_mgnt.pem
openssl x509 -inform pem -in ~/.ssh/azure_mgnt.pem -outform der -out ~/.ssh/azure_mgnt.cer
```

The azure_mgnt.cer file is uploaded to the portal, while the  azure_mgnt.pem file is being used for access.

> Hint: Try to use no password for the certificate so you can use it in an automated fashion, obviously this is considered less secure.
> You should always set the correct access rights for any certificate, which would be 0400 ideally.

Use the management portal (API Mamangement left menu) to deposit the certificate with your account. Go to the Settings tab choosing Management Certificates.

*Creating a Machine User Certificate*

Running a virtual machine requires a user account. Azure uses same as with the management account a public/private key approach to grant access to the virtual machines for you.

Therefor in addition to the management certificate you would also need to create a user certificate for your virtual machine user (by default azureuser).

You can create the credentials like this:

```bash
ssh-keygen -t rsa -f ~/.ssh/azure.id
openssl req -x509 -days 3650 -new -key azure.id -out azure.pem
```

The azure.pem file is uploaded to the machines, while the key file is used for accessing the virtual machines.

Here you should also think about using a password or not for the generated key.

## Blob Storage

```bash
export AZURE_STORAGE_ACCOUNT=...
export AZURE_STORAGE_ACCESS_KEY=...
azure storage blob upload test.txt abc test.txt
```

```bash
azure storage blob list abc
info:    Executing command storage blob list
+ Getting blobs in container abc
data:    Name                                            BlobType   Length    Content-Type                                                               Last-Modified                  SnapshotTime
data:    ----------------------------------------------  ---------  --------  -------------------------------------------------------------------------  -----------------------------  ------------
data:    brief-i...          BlockBlob  74900     
```

## Misc

```bash
sudo waagent -deprovision
```
