---
title: Helm
---

# Helm

> [Helm](https://helm.sh) is the package manager for Kubernetes - A way to find, share, and use software built for Kubernetes.

## Install

Install the [binary Helm](https://github.com/helm/helm/blob/master/docs/install.md) on your local env.

```bash
dla helm-install
```

Deploy Tiller.

```bash
dla helm-deploy
dla helm-help
```

If you wish to install helm on another computer, you won’t need to setup tiller again but you still need to initialize helm:

```bash
helm init --client-only
```

Use Helm with CLI commands.

```bash
helm version
helm ls
```

## Deploy

Deploy a simple chart.

```bash
helm install $DLAHOME/lab/etc/simple/helm -n simple
helm ls
helm status simple
kubectl get po
kubectl get svc
```

Browse the `simple` page if you run on Minikube.

```bash
minikube service simple
```

Delete your chart.

```bash
helm delete simple --purge
```

## Options

In case of docker pull timeout, use `--timeout=`.

```bash
helm install --dry-run
```

```bash
helm template
```

## Repository

```bash
cd $DLAHOME/etc/helm
helm package .
helm serve --repo-path .
```

```bash
helm repo rm datalayer
helm repo add datalayer http://helm-charts.datalayer.io
```

```bash
helm reset
```

## Upgrade

```bash
# --wait
helm init --canary-image --upgrade
kubectl patch deploy --namespace kube-system tiller-deploy -p '{"spec":{"template":{"spec":{"serviceAccount":"tiller"}}}}'
helm init --service-account tiller --upgrade
kubectl rollout status -w deployment/tiller-deploy --namespace=kube-system
helm repo list
helm ls -a
```

## Alternatives

+ [KsonNet](https://github.com/ksonnet/ksonnet), see also [official website](https://ksonnet.io).
+ [Flekszible](https://github.com/elek/flekszible).
