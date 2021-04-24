# JupyterHub

# Authentication

- <https://jupyterhub.readthedocs.io/en/latest/reference/authenticators.html#the-oauthenticator>
- <https://jupyterhub.readthedocs.io/en/latest/reference/authenticators.html#jupyterhub-as-an-oauth-provider>
- <https://zero-to-jupyterhub.readthedocs.io/en/latest/administrator/authentication.html#oauth2-based-authentication>

- https://github.com/jupyterhub/team-compass/issues/382#issuecomment-806515646
- https://gateway.dask.org/authentication.html#using-jupyterhub-s-authentication
"How to authenticate your Dask Gateway using JupyterHub", I first need to make it technically possible
@choldgraf this is possible today. https://gateway.dask.org/authentication.html#using-jupyterhub-s-authentication
mout of curiosity, does anyone run jupyterhub in kubernetes where UIDs (os.getuid()) have some significance?
@rkdarst Typically this does not come up. User directories are generally k8s volumes stored in block or NFS storage and mounted to each Jupyter session. So everyone is the jovyan user and just gets their directory mounted. Often object storage is used as shared storage.
I think in situations like you mention, or on HPCs/Supercomputers, the user level namespacing in Docker/containerd isn't particularly helpful as there is already mature user management. I guess this is why tools like Singularity are useful, they've cherry picked the container features that are useful like images, but ignored the features that are already mature on those systems like user and network namespacing.

- [JupyterHub OIDC Authenticator](https://github.com/jupyterhub/oauthenticator/issues/254)  

## Share

- https://github.com/jupyterhub/hubshare
- https://github.com/danielballan/jupyterhub-share-link
- https://github.com/jtpio/jupyterlab-link-share

## Authorization

- [User roles (RBAC)](https://github.com/jupyterhub/jupyterhub/issues/2245)
- https://github.com/jupyterhub/jupyterhub/tree/rbac
- [Merge OAuth and API tokens](https://github.com/jupyterhub/jupyterhub/pull/3380)
- [First step for implementing oauth scopes - update to rest-api.yml](https://github.com/jupyterhub/jupyterhub/pull/3169)
- [Implementing RBAC scope checking in API handlers](https://github.com/jupyterhub/jupyterhub/pull/3212)
- [[RBAC] Implementing roles as collections of permission scopes](https://github.com/jupyterhub/jupyterhub/pull/3215)
- [Added RBAC documentation with myst-parser](https://github.com/jupyterhub/jupyterhub/pull/3366)
- [RBAC group roles and scopes checking](https://github.com/jupyterhub/jupyterhub/pull/3330)
- [Auth token scopes?](https://github.com/jupyterhub/jupyterhub/issues/1057)

- <https://github.com/jupyterhub/team-compass/issues/380#issuecomment-803262897>

## OAuth Provider

- https://github.com/minrk/jupyterhub-yo-dawg
- https://github.com/jupyterhub/jupyterhub/blob/1.4.0/jupyterhub/services/auth.py
