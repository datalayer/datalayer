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
