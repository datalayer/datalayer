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

## Content Manager

Multi Content

+ [Multi Contents Manager](https://github.com/timkpaine/multicontentsmanager)

S3 Content Manager

+ [s3contents](https://github.com/danielfrg/s3contents).
+ [jupyters3](https://github.com/uktrade/jupyters3).
