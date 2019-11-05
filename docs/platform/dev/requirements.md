---
title: Requirements
---

# Requirements

## Operating Systems

To develop with Datalayer, you need a `Linux` or `MacOs` operating system.

## Get the Source Repositories

Use [Git](/dev/tools/git.md) to get the source repositories.

```bash
# 1. Clone the Datalayer repository.
git clone https://github.com/datalayer/datalayer
# 2. Define temporary $DLAHOME and add $DLAHOME/bin to your PATH.
export DLAHOME=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd ) && \
 export PATH=$DLAHOME/bin:$PATH
# 3. Clone the other repositories folder in the $DLAHOME/repos folder.
dla repos-clone
```

## Tooling

To operate an already installed `Datalayer Science Platform`, you need on your `Linux` or `MacOs` operating system.

+ [Docker](/dev/docker/index.md).
+ [Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl) with `dla kubectl-install`.

Ensure you have [Helm](/dev/k8s/helm.md) on your local machine.

```bash
dla helm-install
dla helm-deploy
```
<!--
Add the Datalayer Helm chart repository (for now, we strongly recommend to use the latest and greatest snapshots).

```bash
helm repo add datalayer http://helm-charts.datalayer.io
```
-->
To install on a local machine or develop in the [Datalayer repository](https://github.com/datalayer/datalayer) you also need on your `Linux` or `MacOs` operating system additional tools.

<!--
+ [Node.js 8.x](https://nodejs.org/en/download/releases).
+ [Python 3.x](https://www.python.org).
-->

+ [Miniconda](https://conda.io/miniconda.html) with `dla miniconda-install`.
+ [Golang 1.11](https://blog.golang.org/go1.11).
+ [OpenJDK 8.x](https://openjdk.java.net/install).
+ [Apache Maven](https://maven.apache.org/download.cgi) with `dla mvn-install`.

## Download the Distribution Packages

```bash
# This will pull binaries and packages and will place/extract them at the correct location, 
# typically $DLAHOME/opt, $DLAHOME/bin...
dla dists-pull
```

## Make the Environment

```bash
# Create an nice configured environment.
dla env-make
# Check your environment.
dla env-status
```

## Set your Profile

Create a `dlarc` file in the `~/.datalayer` folder with your system configuration based on [this template](https://raw.githubusercontent.com/datalayer/datalayer/master/etc/env/dlarc.template).

```bash
# Download and edit the ./.datalayer/dlarc file.
mkdir ~/.datalayer && \
  curl -Lo ~/.datalayer/dlarc https://raw.githubusercontent.com/datalayer/datalayer/master/etc/env/dlarc.template
```

Add in your `~/.bashrc`file the [following lines](https://raw.githubusercontent.com/datalayer/datalayer/master/etc/env/bash_profile.template) (update the paths to map your setup).

```bash
# Append to and edit your ~/.bash_profile file.
curl -sS https://raw.githubusercontent.com/datalayer/datalayer/master/etc/env/bash_profile.template >> ~/.bash_profile
```

Use e.g. `openssl rand -hex 32` to generate secrets.

## Aditional Libraries

You may need additional libraries to install some nodejs dependencies.

For Ubuntu, run this.

```bash
sudo apt-get install libcairo2-dev libjpeg8-dev libpango1.0-dev libgif-dev build-essential g++
```

## Configuration

Configure the `~/.datalayer` folder.

## Option for Dev - Create self-signed Certificates

> Only for Development.

```bash
mkdir -p $DLAHOME/var/srv/certs
chmod 755 $DLAHOME/var/srv
chmod 750 $DLAHOME/var/srv/certs

KEY=$DLAHOME/var/srv/certs/swarm.datalayer.io.local.key
CRT=$DLAHOME/var/srv/certs/swarm.datalayer.io.local.crt 
rm $CRT $KEY
openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout $KEY -out $CRT -subj "/C=BE/ST=Brussels Area/L=Brussles/O=Datalayer/OU=Data Analytics/CN=swarm.datalayer.io.local"
chmod 644 $CRT && cat $CRT
chmod 600 $KEY && cat $KEY
openssl x509 -in $CRT -text -noout
openssl rsa -in $KEY -check

KEY=$DLAHOME/var/srv/certs/ldap.datalayer.io.local.key
CRT=$DLAHOME/var/srv/certs/ldap.datalayer.io.local.crt 
rm $CRT $KEY
openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout $KEY -out $CRT -subj "/C=BE/ST=Brussels Area/L=Brussles/O=Datalayer/OU=Data Analytics/CN=ldap.datalayer.io.local"
chmod 644 $CRT && cat $CRT
chmod 600 $KEY && cat $KEY
openssl x509 -in $CRT -text -noout
openssl rsa -in $KEY -check
```
