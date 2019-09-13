[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Datalayer Studio

:chart_with_upwards_trend: :bar_chart: Discover, Collaborate and Analyze Data.

This folder contains the `Datalayer Studio` source code that allows accessing the `Datalayer Science Platform` in a visual way.

The Studio will help you create and manage your `K8S` cluster and transform it into a powerful `JupyterLab` solution for your Big Data Science projects.

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

## Minikube Services

Install the services on [minikube](https://docs.datalayer.io/install/minikube) until the `keycloak` service (included).

Then skip the deployment of the `iam` service and deploy `solr` service.

Don't further deploy the other services as we will run them locally.

```bash
# Ensure locally run services are down.
dla dsp-k8s-down iam,kuber,jupyterhub,library,studio
```

## Local Services

Run `iam`, `kuber`, `jupyterhub`, `library` and `studio` services on your `local` environment (aka `dev` mode).

```bash
cd $DLAHOME/apps/ui/studio && \
  make dev
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
