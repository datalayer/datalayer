---
title: Jupyter Proxy
---

# Jupyter Proxy

## Server Proxy

Server Proxy[Docs](https://jupyter-server-proxy.readthedocs.io).

Server Proxy [GitHub](https://github.com/jupyterhub/jupyter-server-proxy) repository.

```bash
# Install.
pip install jupyter-server-proxy
```

If your notebook url is http://localhost:8888 and you have a process running listening on port 8080, you can access it with the URL http://localhost:8888/proxy/8080.

For JupyterLab.

```bash
# Install.
jupyter labextension install jupyterlab-server-proxy
```

From JupyterLab.

```javascript
import { PageConfig } from '@jupyterlab/coreutils';
// Get base URL of current notebook server
let baseUrl = PageConfig.getBaseUrl()
// Construct URL of our proxied service
let serviceUrl = base_url + 'proxy/' + port;
// Do stuff with your serviceUrl
```

Jupyterlab Server Proxy [GitHub](https://github.com/jupyterhub/jupyter-server-proxy/tree/master/jupyterlab-server-proxy) example.

JupyterLab [Dask](https://github.com/dask/dask-labextension) extension.

## R Session Proxy

+ https://github.com/jupyterhub/jupyter-rsession-proxy
