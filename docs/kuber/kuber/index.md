---
title: Kuber
---

# Kuber

> Quick Start Kuber on AWS in 10 minutes.
>
> Check the [requirements](https://docs.datalayer.io/dev/requirements.html) to setup your local environment.

Check that you understand and have the following requirements.

* An AWS account with valid credentials.
* The [latest Kuber binary release](https://github.com/datalayer/datalayer/releases).

## AWS Credentials

Setup your `AWS` environment with the needed AWS credentials via environment variables.

In your `~/.bashrc` file.

```bash
# Define your valid AWS Credentials.
export AWS_ACCESS_KEY_ID=<your-aws-key-id>
export AWS_SECRET_ACCESS_KEY=<your-aws-key-secret>
```

If you prefer, you can persist those credentials in your home folder.

```bash
# ~/.aws/credentials
[kuber]
aws_access_key_id=<your-aws-key-id>
aws_secret_access_key=<your-aws-key-secret>
```

```bash
# ~/.aws/config
[kuber]
region=us-west-2
```

## Create the K8S Cluster

```bash
# Run the following.
kuber kcreate dla1 -p aws -z us-west-2 && \ # eu-central-1 also supported.
  kuber kapply dla1 -v 4
```

```bash
# Check the cluster is running.
watch kubectl get nodes && \
  watch kubectl get pods --all-namespaces && \
  kubectl proxy
```

This will give the list of nodes and then the list pods (there will be DNS, Calico as the Tiller pods for Helm).

```
NAME                                         STATUS    ROLES     AGE       VERSION
ip-10-0-0-62.us-west-2.compute.internal      Ready     master    1h        v1.9.2
ip-10-0-100-173.us-west-2.compute.internal   Ready     <none>    59m       v1.9.2
ip-10-0-100-227.us-west-2.compute.internal   Ready     <none>    59m       v1.9.2
ip-10-0-100-68.us-west-2.compute.internal    Ready     <none>    59m       v1.9.2
```

```
NAMESPACE     NAME                              READY     STATUS    RESTARTS   AGE
kube-system   calico-etcd-ck42p                 1/1       Running   0          1h
...
kube-system   kube-proxy-z4q67                  1/1       Running   0          1h
kube-system   tiller-deploy-546cf9696c-9k9bk    1/1       Running   0          58m
```

## Install the Services

Follow the [instructions to install the services](https://docs.datalayer.io/install/k8s).

## Terminate the K8S Cluster

To terminate the Cluster, run the following command.

```bash
# Delete the cluster.
kuber kdelete dla1 -v 4 --purge
```
