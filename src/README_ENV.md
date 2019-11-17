[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Datalayer Source Environment

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
dla dsp-down iam,kuber,jupyterhub,library,explorer
```

```bash
cd $DLAHOME/src && \
  make install-endpoints
```

```bash
# Start following services: `iam`, `kuber`, `jupyterhub`, `library` and `explorer`.
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
# Clean, install the dependencies and build.
cd $DLAHOME/src && \
  make clean-ui && \
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
