---
title: Jupyter Server
---

# Jupyter Server

```
BROWSER --- SERVER --- KERNEL
```

Jupyter Server [GitHub](https://github.com/jupyter/jupyter_server) repository.

Jupyter Server [Docs](https://jupyter-server.readthedocs.io/en/latest).

Enhancement Proposal [Issues](https://github.com/jupyter/enhancement-proposals/issues/31).

Enhancement Proposal [Docs](https://github.com/jupyter/enhancement-proposals/blob/master/jupyter-server/jupyter-server.md).

[Roadmap](https://github.com/jupyter/jupyter_server/issues/127).

👀 [kernel_manager_class configurable by a server extension?](https://github.com/jupyter-server/jupyter_server/issues/207)  
👀 [Restfull Asynchronous Kernel Starts](https://github.com/jupyter-server/jupyter_server/pull/197)  
👀 [Prefix Kernel IDs](https://github.com/jupyter-server/jupyter_server/issues/235)  
👀 [Dependency Injection approach based on injector](https://github.com/jupyter-server/jupyter_server/issues/178)  
👀 [Make frontends discoverable and add a frontend alias](https://github.com/jupyter-server/jupyter_server/issues/121)  
👀 [Custom manager classes in both notebook vs. jupyter_server](https://github.com/jupyterlab/nbclassic/issues/41)  
👀 [HTTP and WebSocket Proxy as Jupyter Server Extension](https://github.com/datalayer/jupyter-admin)  
👀 [Kernel Proxy as Jupyter Server Extension](https://github.com/datalayer/datalayer)  

## Config

```bash
jupyter server --generate-config
more ~/.jupyter/jupyter_server_config.py
```

## Start

```bash
# Browser - Server
jupyter server
```

## API

REST API [Swagger](http://petstore.swagger.io?url=https://raw.githubusercontent.com/jupyter/jupyter_server/master/jupyter_server/services/api/api.yaml)

API with JupyterLab.

```bash
GET http://localhost:8888/lab
GET http://localhost:8888/lab/static/vendors~main.fb9d5fc3d20679f8ad92.js
GET http://localhost:8888/lab/static/main.886f8a31649f6428e501.js
```

```bash
GET http://localhost:8888/api/sessions
GET http://localhost:8888/api/kernelspecs?1558625586262
GET http://localhost:8888/api/terminals?1558625586264
GET http://localhost:8888/lab/settings/?1558625586274
GET http://localhost:8888/api/sessions?1558625586526
GET http://localhost:8888/lab/build?1558625586741
GET http://localhost:8888/api/contents/?content=1&1558625586760
GET http://localhost:8888/api/nbconvert?1558625586777
```

```bash
WS ws://localhost:8888/api/kernels/7fbbafe9-021e-4d2e-bf81-ba0ef2239727/channels?session_id=1f8a3c1f-ff63-4221-9183-cc82092839b1&token=18b66314f1108701a8eb0eaed4f0e
```

## Test

pytest-plugin for jupyter server extensions

- Can now use async/await syntax when writing tests, see example [here](https://github.com/jupyter/jupyter_server/blob/master/tests/services/api/test_api.py)
- `serverapp` fixture that handles setup/teardown
- Fetch fixture for asynchronous/awaitable requests to the serverapp+extension APIs
- Other helpful fixtures, see summary list [here](https://github.com/jupyter/jupyter_server/blob/master/CHANGELOG.md#021---2020-1-10)
- Extend the serverapp fixture with a voila_app fixture easilym see [example from nbclassic](https://github.com/Zsailer/nbclassic/blob/notebook-handlers/tests/conftest.py)

To start using today, pip install jupyter_server>=0.2.1 and add pytest_jupyter_server to your top-level conftest.py.

## Auth

- [Pluggable user token creation/validation](https://github.com/jupyter/jupyter_server/issues/50)  
- [Add a Session Management infrastructure for ex  tension developers](https://github.com/jupyter/jupyter_server/issues/122)  
- [Add authorization layer to server request handlers](https://github.com/jupyter/jupyter_server/pull/165)  

## Async Kernel

- [Use jupyter_client's AsyncKernelManager](https://github.com/jupyter/jupyter_server/pull/191)

## Extensions

- Extensions
- https://github.com/Zsailer/jpserver-extension-check

## Legacy Extensions

```bash
pip install nbdime
jupyter labextension install nbdime-jupyterlab
```

## Configuration

- https://github.com/jupyter-server/jupyter_server/pull/380/files

```json
// ~/.jupyter/jupyter_server_config.json
{
  "ServerApp": {
    "autoreload": true
  }
}
```

- https://github.com/jupyter-server/jupyter_server/issues/207

```python
class MyApp(ExtensionApp):
    ...

    serverapp_config = {
        "kernel_manager_class" : ...,
        ...
    }
```
