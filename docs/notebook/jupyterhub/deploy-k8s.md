---
title: JupyterHub on Kubernetes
---

# JupyterHub on Kubernetes

> Zero to JupyterHub with Kubernetes (Z2JH) helps you set up your own JupyterHub on Kubernetes and leverage the clouds scalable nature to support large groups of users. Thanks to Kubernetes, your are not tied to a specific cloud provider.

Z2JH [GitHub](https://github.com/jupyterhub/zero-to-jupyterhub-k8s) repository.

Z2JH [Docs](https://zero-to-jupyterhub.readthedocs.io).

![JupyterHub on K8S Architecture](https://zero-to-jupyterhub.readthedocs.io/en/latest/_images/architecture.png)

## Helm Chart

Z2JH Helm Charts [GitHub](https://github.com/jupyterhub/helm-chart) repository.

Z2JH Helm Charts Deployment [GitHub](https://jupyterhub.github.io/helm-chart) repository.

Minimalist [Cheatsheets](https://minimalist-jupyterhub.readthedocs.io).

Helm Chart [Reference](https://zero-to-jupyterhub.readthedocs.io/en/latest/reference.html).

## Deploy

```bash
# Start Minikube (or use your BYOC Bring Your Own Cluster). 
dla minikube-start
eval $(minikube docker-env)
dla helm-deploy
helm ls
dla k8s-dashboard
# Prepare.
mkdir jupyterhub && \
  cd jupyterhub && \
  helm repo add jupyterhub https://jupyterhub.github.io/helm-chart && \
  helm repo update
```

```bash
export RELEASE=jupyterhub
export NAMESPACE=jupyterhub
```

Create a `jupyterhub.yaml` (see next section for Deployment Examples) and deploy with Helm.

```bash
# Opttion 1: Deploy from jupyterhub Helm repository.
helm install \
  jupyterhub/jupyterhub \
  --name $RELEASE \
  --namespace $NAMESPACE \
  --timeout 99999 \
  --version 0.8.2 \
  --values jupyterhub.yaml
helm upgrade \
  --install $RELEASE \
  jupyterhub/jupyterhub \
  --namespace $NAMESPACE \
  --timeout 99999 \
  --version 0.8.2 \
  --values jupyterhub.yaml
# Option 2: Deploy from local repo.
helm upgrade \
  --install $RELEASE \
  $DLAHOME/repos/jupyterhub-k8s/jupyterhub \
  --name $RELEASE \
  --namespace $NAMESPACE \
  --timeout 99999 \
  --set hub.image.tag=0.9-dcde99a \
  --set singleuser.image.tag=0.9-b51ffeb \
  --set singleuser.networkTools.image.tag=0.9-b51ffeb \
  --set prePuller.hook.image.tag=0.9-b51ffeb \
  --values jupyterhub.yaml
```

Check your Deployment.

```bash
# Check Helm Deployment.
helm ls
# Check K8S Deployment.
kubectl get pods -n $NAMESPACE
# hub-5474b656cf-22xp6     1/1     Running   0          2m39s
# proxy-6c766577b6-vqkxk   1/1     Running   0          2m39s
kubectl get svc -n $NAMESPACE
# hub            ClusterIP      10.111.230.197   <none>        8081/TCP                     2m43s
# proxy-api      ClusterIP      10.102.103.51    <none>        8001/TCP                     2m43s
# proxy-public   LoadBalancer   10.107.139.195   <pending>     80:30893/TCP,443:30125/TCP   2m43s
# Get K8S Service URL.
```

Use JupyterHub from your Browser.

```bash
minikube -n $NAMESPACE service proxy-public --url
open $(minikube -n $NAMESPACE service proxy-public --url)
```

Upgrade your deployment.

```bash
helm upgrade jupyterhub \
  jupyterhub/jupyterhub \
  --name $RELEASE \
  --version=0.8.3 \
  --namespace $NAMESPACE \
  --values jupyterhub.yaml
```

When you are done, delete your deployments.

```bash
# Delete your Deployment.
helm delete $RELEASE --purge && \
  kubectl delete namespace $NAMESPACE
```

## Deployment Examples

```bash
echo """
proxy:
  secretToken: $(openssl rand -hex 32)
hub:
  extraConfig:
    jupyterlab: |
      c.Spawner.cmd = ['jupyter-labhub']
auth:
  type: dummy
  dummy:
    password: 'password'
  whitelist:
    users:
      - user1
""" > ./jupyterhub.yaml
```

See `$DLAHOME/etc/helm/jupyterhub` folder.

## Security

[Security](https://zero-to-jupyterhub.readthedocs.io/en/latest/security.html).

## Authentication

[Authentication](https://zero-to-jupyterhub.readthedocs.io/en/latest/authentication.html).

```python
if auth_type == 'google':
    c.JupyterHub.authenticator_class = 'oauthenticator.GoogleOAuthenticator'
    for trait, cfg_key in common_oauth_traits + (
        ('hosted_domain', None),
        ('login_service', None),
    ):
        if cfg_key is None:
            cfg_key = camelCaseify(trait)
        set_config_if_not_none(c.GoogleOAuthenticator, trait, 'auth.google.' + cfg_key)
    email_domain = get_config('auth.google.hostedDomain')
elif auth_type == 'github':
    c.JupyterHub.authenticator_class = 'oauthenticator.github.GitHubOAuthenticator'
    for trait, cfg_key in common_oauth_traits + (
        ('github_organization_whitelist', 'orgWhitelist'),
    ):
        if cfg_key is None:
            cfg_key = camelCaseify(trait)
        set_config_if_not_none(c.GitHubOAuthenticator, trait, 'auth.github.' + cfg_key)
elif auth_type == 'cilogon':
    c.JupyterHub.authenticator_class = 'oauthenticator.CILogonOAuthenticator'
    for trait, cfg_key in common_oauth_traits:
        if cfg_key is None:
            cfg_key = camelCaseify(trait)
        set_config_if_not_none(c.CILogonOAuthenticator, trait, 'auth.cilogon.' + cfg_key)
elif auth_type == 'gitlab':
    c.JupyterHub.authenticator_class = 'oauthenticator.gitlab.GitLabOAuthenticator'
    for trait, cfg_key in common_oauth_traits + (
        ('gitlab_group_whitelist', None),
        ('gitlab_project_id_whitelist', None),
    ):
        if cfg_key is None:
            cfg_key = camelCaseify(trait)
        set_config_if_not_none(c.GitLabOAuthenticator, trait, 'auth.gitlab.' + cfg_key)
elif auth_type == 'mediawiki':
    c.JupyterHub.authenticator_class = 'oauthenticator.mediawiki.MWOAuthenticator'
    for trait, cfg_key in common_oauth_traits + (
        ('index_url', None),
    ):
        if cfg_key is None:
            cfg_key = camelCaseify(trait)
        set_config_if_not_none(c.MWOAuthenticator, trait, 'auth.mediawiki.' + cfg_key)
elif auth_type == 'globus':
    c.JupyterHub.authenticator_class = 'oauthenticator.globus.GlobusOAuthenticator'
    for trait, cfg_key in common_oauth_traits + (
        ('identity_provider', None),
    ):
        if cfg_key is None:
            cfg_key = camelCaseify(trait)
        set_config_if_not_none(c.GlobusOAuthenticator, trait, 'auth.globus.' + cfg_key)
elif auth_type == 'hmac':
    c.JupyterHub.authenticator_class = 'hmacauthenticator.HMACAuthenticator'
    c.HMACAuthenticator.secret_key = bytes.fromhex(get_config('auth.hmac.secretKey'))
elif auth_type == 'dummy':
    c.JupyterHub.authenticator_class = 'dummyauthenticator.DummyAuthenticator'
    set_config_if_not_none(c.DummyAuthenticator, 'password', 'auth.dummy.password')
elif auth_type == 'tmp':
    c.JupyterHub.authenticator_class = 'tmpauthenticator.TmpAuthenticator'
elif auth_type == 'lti':
    c.JupyterHub.authenticator_class = 'ltiauthenticator.LTIAuthenticator'
    set_config_if_not_none(c.LTIAuthenticator, 'consumers', 'auth.lti.consumers')
elif auth_type == 'ldap':
    c.JupyterHub.authenticator_class = 'ldapauthenticator.LDAPAuthenticator'
    c.LDAPAuthenticator.server_address = get_config('auth.ldap.server.address')
    set_config_if_not_none(c.LDAPAuthenticator, 'server_port', 'auth.ldap.server.port')
    set_config_if_not_none(c.LDAPAuthenticator, 'use_ssl', 'auth.ldap.server.ssl')
    set_config_if_not_none(c.LDAPAuthenticator, 'allowed_groups', 'auth.ldap.allowedGroups')
    set_config_if_not_none(c.LDAPAuthenticator, 'bind_dn_template', 'auth.ldap.dn.templates')
    set_config_if_not_none(c.LDAPAuthenticator, 'lookup_dn', 'auth.ldap.dn.lookup')
    set_config_if_not_none(c.LDAPAuthenticator, 'lookup_dn_search_filter', 'auth.ldap.dn.search.filter')
    set_config_if_not_none(c.LDAPAuthenticator, 'lookup_dn_search_user', 'auth.ldap.dn.search.user')
    set_config_if_not_none(c.LDAPAuthenticator, 'lookup_dn_search_password', 'auth.ldap.dn.search.password')
    set_config_if_not_none(c.LDAPAuthenticator, 'lookup_dn_user_dn_attribute', 'auth.ldap.dn.user.dnAttribute')
    set_config_if_not_none(c.LDAPAuthenticator, 'escape_userdn', 'auth.ldap.dn.user.escape')
    set_config_if_not_none(c.LDAPAuthenticator, 'valid_username_regex', 'auth.ldap.dn.user.validRegex')
    set_config_if_not_none(c.LDAPAuthenticator, 'user_search_base', 'auth.ldap.dn.user.searchBase')
    set_config_if_not_none(c.LDAPAuthenticator, 'user_attribute', 'auth.ldap.dn.user.attribute')
elif auth_type == 'custom':
    # full_class_name looks like "myauthenticator.MyAuthenticator".
    # To create a docker image with this class availabe, you can just have the
    # following Dockerifle:
    #   FROM jupyterhub/k8s-hub:v0.4
    #   RUN pip3 install myauthenticator
    full_class_name = get_config('auth.custom.className')
    c.JupyterHub.authenticator_class = full_class_name
    auth_class_name = full_class_name.rsplit('.', 1)[-1]
    auth_config = c[auth_class_name]
    auth_config.update(get_config('auth.custom.config') or {})
else:
    raise ValueError("Unhandled auth type: %r" % auth_type)
```

OpenID Connect [Docs](https://github.com/jupyterhub/zero-to-jupyterhub-k8s/blob/master/doc/source/authentication.rst#openid-connect). Here's an example for authenticating against [Keycloak](https://www.keycloak.org/docs/3.4/securing_apps/index.html#endpoints).

Ater you [configure an OIDC Client](https://www.keycloak.org/docs/3.4/server_admin/index.html#oidc-clients) and obtain the confidential client credentials, see details on [authentication doc](https://zero-to-jupyterhub.readthedocs.io/en/latest/authentication.html#openid-connect).

```yaml
hub:
  extraEnv:
    OAUTH2_AUTHORIZE_URL: https://${host}/auth/realms/${realm}/protocol/openid-connect/auth
    OAUTH2_TOKEN_URL: https://${host}/auth/realms/${realm}/protocol/openid-connect/token
    OAUTH_CALLBACK_URL: https://<your_jupyterhub_host>/hub/oauth_callback
auth:
  type: custom
  custom:
    className: oauthenticator.generic.GenericOAuthenticator
    config:
      login_service: "keycloak"
      client_id: "y0urc1logonc1ient1d"
      client_secret: "an0ther1ongs3cretstr1ng"
      token_url: https://${host}/auth/realms/${realm}/protocol/openid-connect/token
      userdata_url: https://${host}/auth/realms/${realm}/protocol/openid-connect/userinfo
      userdata_method: GET
      userdata_params: {'state': 'state'}
      username_key: preferred_username
```

## User Environment

[User Environment](https://zero-to-jupyterhub.readthedocs.io/en/latest/user-environment.html).

## User Resources

[User Resources](https://zero-to-jupyterhub.readthedocs.io/en/latest/user-resources.html).

## User Storage

[User Storage](https://zero-to-jupyterhub.readthedocs.io/en/latest/user-storage.html).

## User Management

[User Management](https://zero-to-jupyterhub.readthedocs.io/en/latest/user-management.html).

## Optimizations

[Optimization](https://zero-to-jupyterhub.readthedocs.io/en/latest/optimization.html).

## Debugging

[Debug](https://zero-to-jupyterhub.readthedocs.io/en/latest/debug.html).

## JupyterLab

Information may be found in this [Docs](https://zero-to-jupyterhub.readthedocs.io/en/latest/user-environment.html#use-jupyterlab-by-default).

```yaml
singleuser:
  defaultUrl: "/lab"
hub:
  extraConfig:
    jupyterlab: |
      c.Spawner.cmd = ['jupyter-labhub']
```

## Ansible

Optionally, you can deploy with Ansible.

+ https://github.com/lresende/ansible-kubernetes-cluster
+ https://github.com/lresende/ansible-spark-cluster
+ https://github.com/spacetelescope/z2jh-aws-ansible
