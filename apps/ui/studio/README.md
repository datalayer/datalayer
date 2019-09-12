[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Datalayer Studio

:chart_with_upwards_trend: :bar_chart: Discover, Collaborate and Analyze Data.

This folder contains the `Datalayer Studio` source code that allows accessing the `Datalayer Science Platform` in a visual way.

The Studio will help you create and manage your K8S cluster and transform it into a powerful solution for your Big Data Science projects.

## Build

Datalayer Studio is built on `react.js` and other javascript libraries.

Ensure you fullfill the [requirements](https://docs.datalayer.io/dev/requirements.html).
<!--
```bash
npm install -g @microsoft/rush
rush install
rush build
```
-->
```bash
# Install the dependencies and build.
cd $DLAHOME/apps/ui/studio && \
  make install && \
  make build
```

## Prerequisites on Minikube

Install the services on [minikube](https://docs.datalayer.io/install/minikube) until the `keycloak` service (included).

Skip `iam` service and deploy `solr`

```bash
dla dsp-k8s-up solr
# Port-forward Zookeeper, it will be used by the `library` service.
export ZK_POD_NAME=$(kubectl get pods -n dla-library -l "app=zookeeper,component=server" -o jsonpath="{ .items[0].metadata.name }")
kubectl port-forward -n dla-library $ZK_POD_NAME 2181:2181
```

## Develop

Run `iam`, `kuber`, `jupyterhub`, `library` and `studio` applications in `dev` mode.

```bash
cd $DLAHOME/apps/ui/studio && \
  dla dsp-k8s-down iam,kuber,jupyterhub,library,studio && \
  make dev
```

You can also launch the processes one by one.

```bash
# shell #1: start the studio frontend compiler.
cd $DLAHOME/apps/ui/studio && \
  make yarn-start
# shell #2: start the studio server.
cd $DLAHOME/apps/ui/studio && \
  DLA_STUDIO_INDEX_PAGE=index.html && \
  echo http://minikube.datalayer.io.local:4326?kuberRest=http://minikube.datalayer.io.local:9091 && \
  open http://minikube.datalayer.io.local:9600?kuberRest=http://minikube.datalayer.io.local:9091 && \
  python datalayer_studio/main.py
```

# Help

```bash
# print the help.
cd $DLAHOME/apps/ui/studio && \
  make help
```

<!--
"@datalayer/kuber": "file:./../kuber",
"@types/enzyme": "2.7.9",
tests.js
```
var context = require.context('../lib', true, /.+\.test\.js?$/);
context.keys().forEach(context);
module.exports = context;
```
"@types/react-redux-toastr": "7.0.10",
"react-addons-css-transition-group": "15.5.2",
"react-addons-shallow-compare": "15.5.2",
"react-addons-transition-group": "15.5.2"
-->

![Explorer](https://raw.githubusercontent.com/datalayer/datalayer/master/docs/_images/what/explorer.svg?sanitize=true "Explorer")
