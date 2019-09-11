[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

:chart_with_upwards_trend: :bar_chart: Discover, Collaborate and Analyze Data.

This folder contains the `Datalayer Studio` source code that allows accessing the `Datalayer Science Platform` in a visual way.

The Studio will help you create and manage your K8S cluster and transform it into a powerful solution for your Big Data Science projects.

## Build

Datalayer UI is built on `react.js` and other javascript libraries.

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

## Dependencies

You are expected to have the following running services.

```bash
# A Kubernetes cluster, eg with minikube.
dla minikube-start && \
  dla minikube-status && \
  dla minikube-dashboard
```

```bash
# A running Kubernetes proxy.
cd $DLAHOME/repos/kuber && \
  open http://localhost:8001 && \
  make k8s-proxy
```

A running Keycloak server integrated with LDAP and a Solr server.

```bash
dla dsp-swarm-up dev && \
  sleep 30s && \
  dla dsp-ldap-seed && \
  dla dsp-solr-seed && \
  # Login on Keycloak.
  open http://localhost:8080/auth/admin/master/console # admin / admin
```

Via the Keycloak Admin UI, create a `datalayer` Realm and then create and a `datalayer` Client with `Root URL` equals `http://localhost:9700`.

Define the `Valid Redirect URIs`:

+ http://localhost:9700/*
+ http://localhost:8000/*
+ http://swarm.datalayer.io.local/*

Set the `datalayer` client Access Type to `confidential`, copy the `Secret Credential` (in the Credentials tab) and update `~/.datalayer/dlarc` with the copied secret and `source ~/.datalayer/dlarc`.

Configure the `ldap` User Federation.

+ Vendor: `Other`.
+ Connection URL: `ldap://ldap` (click on the `Test connection` button).
+ Users DN: `ou=users,dc=datalayer,dc=io`
+ Bind DN: `cn=admin,dc=datalayer,dc=io`
+ Bind Credential: `admin` (click on the `Test authentication` button).
+ Cache Policy: `NO_CACHE`.

... and click on `Synchronize all users` button.

Check `eric` user login on http://localhost:8080/auth/realms/datalayer/account (password is `123`).

## Develop

Run `iam`, `kuber`, `jupyterhub`, `library` and `studio` applications in `dev` mode with a two-liner.

```bash
cd $DLAHOME/apps/ui/studio && \
  make dev
```

If you prefer separated processes, launch them one by one.

```bash
# shell #1: start the ui compiler.
cd $DLAHOME/apps/ui/studio && \
  echo http://localhost:4326?kuberRest=http://localhost:9091 && \
  make yarn-start
# shell #2: start the ui server.
cd $DLAHOME/apps/ui/studio && \
  DLA_STUDIO_INDEX_PAGE=index.html && \
  open http://localhost:9600?kuberRest=http://localhost:9091 && \
  python datalayer_studio/main.py
```

# Get Help

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
