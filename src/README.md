[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Datalayer Source Code

🔴🔥✅ This is the source code of the `Datalayer Science Platform`.

+ [Common](./common)
+ [Components](./components)
+ [Datalayer Controller](./datalayerctl)
+ [IAM](./iam)
+ [Jupyter StoryBook Addon](./jupyter-storybook)
+ [Jupyter Controller](./jupyterctl)
+ [JupyterLab Extensions](./jupyterlab)
+ [JupyterPool](./jupyterpool)
+ [Kuber](./kuber)
+ [Library](./library)
+ [Studio](./studio)
+ [Widgets](./widgets)

## Legend

| Mark | Description |
| ------------- | ------------- |
| 🏃 | Work in progress |
| ✋ | Blocked task |
| 💪 | Stretch goal for this iteration |
| 🔵 | More investigation required to remove uncertainty |
| ⚫️ | Under discussion within the team |
| 🔴 | Missing issue reference |

## Iteration Plan

Endgame

+ November 11th, 2019: Endgame begins.
+ November 17th, 2019: Endgame done.

The endgame details for this iteration are tracked in the linked issues.

## Plan Items

Below is a summary of the top level plan items.

### Datalayer

[ ] 🏃 [Jupyter Controller UI Mock](https://github.com/datalayer/datalayer/issues/19)
[ ] 💪 [Create JupyterLab Extension examples](https://github.com/datalayer/datalayer/issues/21)
[ ] 🔵 [Port DSP on MaterialUI](https://github.com/datalayer/datalayer/issues/2)
[ ] 🔵 [Port DSP on K8S](https://github.com/datalayer/datalayer/issues/18)
[ ] 💪 [Index and Search Notes](https://github.com/datalayer/datalayer/issues/3)
[ ] 💪 [Deploy DSP PROD on K8S](https://github.com/datalayer/datalayer/issues/20)

### Jupyter Server

[ ] 🔵 [Simple Extension Example](https://github.com/jupyter/jupyter_server/pull/117)
[ ] 🔵 [Preparse subcommands in an extensionapps](https://github.com/jupyter/jupyter_server/pull/133)
[ ] 🔵 [Make frontends discoverable and add a frontend alias](https://github.com/jupyter/jupyter_server/issues/121)
[ ] 🔵 [Kernel Providers](https://github.com/jupyter/jupyter_server/pull/112)
[ ] 🔵 [Pluggable user token creation/validation](https://github.com/jupyter/jupyter_server/issues/50)
[ ] 🔵 [Document jupyter_server](https://github.com/jupyter/jupyter_server/issues/131)
[ ] ✋ [Add a Session Management infrastructure for extension developers](https://github.com/jupyter/jupyter_server/issues/122)
[ ] 💪 [Jupyter Server Roadmap](https://github.com/jupyter/jupyter_server/issues/127)
[ ] ✋ [Release jupyter_server 0.2.0 with kernel_mgmt 0.5.0](https://github.com/jupyter/jupyter_server/issues/138)

### JupyterLab

[ ] 🏃 [JupyterLab as Server Extension](https://github.com/jupyterlab/jupyterlab/pull/7416)
[ ] 🏃 [JupyterLab Server as Server Extension](https://github.com/jupyterlab/jupyterlab_server/pull/79)
[ ] 🏃 [Upgrade to react to 16.9](https://github.com/jupyterlab/jupyterlab/pull/7504)
[ ] ⚫️ [Create a `jupyterlab-extension-examples` repository](https://github.com/jupyterlab/jupyterlab/issues/7505)
[ ] ⚫️ [In-person Dev Meeting](https://github.com/jupyterlab/team-compass/issues/19)

### Jupyter Kernel Mgmt

[ ] 🏃 [Enrich Docs with Usage](https://github.com/takluyver/jupyter_kernel_mgmt/pull/28)
[ ] ✋ [Release jupyter_kernel_mgmt 0.5.0](https://github.com/takluyver/jupyter_kernel_mgmt/issues/33)
[ ] 🔵 [conda_kernel_provider](https://github.com/takluyver/jupyter_kernel_mgmt/issues/32)

### Others

[ ] ⚫️ [Notebook as a jupyter server extension](https://github.com/jupyter/notebook/pull/4653)
[ ] ⚫️ [Voila as an ExtensionApp](https://github.com/voila-dashboards/voila/pull/270)

## Endpoints

Datalayer provides service endpoints.

| | Endpoint                      |  Description |
|-|-------------------------------|--------------|
|🔴| /iam/xxx                     | xxx |
|🔴| /jupyterpool/xxx             | xxx |
|🔴| /kuber/xxx                   | xxx |
|🔴| /library/xxx                 | xxx |

For development, install the endpoints on Minikube [following these steps](https://docs.datalayer.io/install/minikube) until the `keycloak` service included.

Don't further deploy the other services as we will run them locally.

```bash
# Ensure that services you will run locally are down.
dla dsp-down iam,kuber,jupyterhub,library,studio
```

```bash
cd $DLAHOME/src && \
  make install-endpoints
```

```bash
# Start following services: `iam`, `kuber`, `jupyterhub`, `library` and `studio`.
# These will run on your `local` environment (aka `dev` mode) outside of Minikube.
cd $DLAHOME/src && \
  make start-endpoints
```

## User Interfaces

The Datalayer UIs (User Interfaces) are built on `React.js` components.

| | React.js Component |
|-|--------------|
|🔴| Card |
|🔴| Contact |
|🔴| Features |
|🔴| Footer |
|🔴| Form |
|🔴| Header |
|🔴| Landing |
|🔴| Layout |
|🔴| Overview |
|🔴| PreFooter |
|🔴| Pricing |
|🔴| Product |
|🔴| Profile |
|🔴| SignIn |
|🔴| SignUp |
|🔴| Table |
|🔴| Team |

For development, ensure you fullfill the [requirements](https://docs.datalayer.io/dev/requirements.html).

```bash
# OPTIONAL - Launch Verdaccio.
# in ~/.config/verdaccio/config.yaml
# Set `max_body_size: 1Gb`
yarn registry
# In another terminal.
yarn registry:init
```

```bash
# Install the yarn dependencies and build.
cd $DLAHOME/src && \
  make deps-ui && \
  make build-ui
```

The UI Routes are listed here.

| | UI Route                       |  Description | Example  |
|-|--------------------------------|--------------|----------|
|🔴| /                             | Landing page with top stories accessible in tabs (per tag), features and price | https://datalayer.io |
|🔴| /tag/[id]                     | Story and dataset cards having the given tag id | https://datalayer.io/tag/regression |
|🔴| /signup                       | Registration form with a token| https://datalayer.io/signup |
|🔴| /signin                       | Login form | https://datalayer.io/signin |
|🔴| /profile                      | User private profile page | https://datalayer.io/profile |
|🔴| /profile/edit                 | User private profile page in edit mode | https://datalayer.io/profile/edit |
|🔴| /[user]                       | User page with stories and datasets cards | https://datalayer.io/eric |
|🔴| /[user]/story/[id]            | Story page in view mode | https://datalayer.io/eric/story/is-brussels-traffic-really-jamed |
|🔴| /[user]/story/[id]/edit       | Story page in edit mode | https://datalayer.io/eric/story/is-brussels-traffic-really-jamed/edit |
|🔴| /[user]/story/[id]/preview    | Story page in preview mode | https://datalayer.io/eric/story/is-brussels-traffic-really-jamed/edit |
|🔴| /[user]/dataset/[id]          | Dataset page in view mode | https://datalayer.io/eric/dataset/brussels-jam-2020 |
|🔴| /[user]/dataset/[id]/edit     | Dataset page in edit mode | https://datalayer.io/eric/dataset/brussels-jam-2020/edit |
|🔴| /[user]/dataset/[id]/preview  | Dataset page in preview mode | https://datalayer.io/eric/dataset/brussels-jam-2020/preview |
|🔴| /search?q=[query]             | Story cards search result | https://datalayer.io/search?q=regression |

## Entities

User entity.

| | User Attribute |
|-|----------------|
|🔴| ID |
|🔴| Creation Date |
|🔴| Registration Date |
|🔴| First Name |
|🔴| Last Name |
|🔴| Email |
|🔴| Description |
|🔴| Invitations |
|🔴| Plan |

Dataset entity.

| | Dataset Attribute |
|-|-------------------|
|🔴| Owner ID |
|🔴| Creation Date |
|🔴| Format |
|🔴| Path |
|🔴| Tags |
|🔴| Publication Date |

Story entity.

| | Story Attribute |
|-|-----------------|
|🔴| Owner ID |
|🔴| Creation Date |
|🔴| Contributors IDs |
|🔴| Tags |
|🔴| Publication Date |
|🔴| Claps |

## Technical Stack

+ React.js
+ JupyterHub
+ OIDC Authenticator
+ Serverpool Spawner
+ JupyterLab
+ Jupyter Server
+ Jupyter Kernel Management
+ Kernelpool Provider
+ Kubernetes
