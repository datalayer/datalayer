---
title: Server to Gateway
---

# Server to Gateway

> Jupyter Server extension that enables the server to use remote kernels hosted by a Jupyter "Gateway" (i.e., Kernel Gateway or Enterprise Gateway).

```
BROWSER --- SERVER --- NB2KG -- GATEWAY
```

[DEPRECATED] Server to Gateway [GitHub](https://github.com/jupyter/nb2kg) repository.

![Server to Gateway](https://raw.githubusercontent.com/jupyter/nb2kg/master/deploy.png)

## Install

```bash
# DEPRECATED
# Not needed anymore... nb2kg is not part of jupyter_server
# pip install nb2kg
# pip install git+https://github.com/jupyter/nb2kg.git#egg=nb2kg
# jupyter serverextension enable --py nb2kg --sys-prefix
# jupyter serverextension list
```

## Jupyter WebSocket

```bash
# Option 1 - Without Docker.
pip install jupyter_kernel_gateway
jupyter kernelgateway \
  --port=9007 \
  --ip=0.0.0.0 \
  --KernelGatewayApp.prespawn_count=5
# Option 2 - With Docker.
docker run -it --rm -p 9007:8888 jupyter/minimal-kernel
```
```bash
# The url of the Kernel or Enterprise Gateway server where
# kernel specifications are defined and kernel management
# takes place. If defined, this Notebook server acts as a
# proxy for all kernel management and kernel
# specification retrieval. (JUPYTER_GATEWAY_URL env var)
jupyter lab --gateway-url=http://localhost:9007
jupyter lab --gateway-url=http://localhost:9007 \
  --notebook-dir=~/notebooks \
  --ServerApp.token=
```

```bash
# DEPRECATED
# export KG_URL=http://localhost:9001
# KG_URL=http://localhost:9007 jupyter lab \
#   --NotebookApp.session_manager_class=nb2kg.managers.SessionManager \
#   --NotebookApp.kernel_manager_class=nb2kg.managers.RemoteKernelManager \
#   --NotebookApp.kernel_spec_manager_class=nb2kg.managers.RemoteKernelSpecManager 
```

## Notebook HTTP

```bash
jupyter kernelgateway \
  --port=9007 \
  --ip=0.0.0.0 \
  --KernelGatewayApp.api='kernel_gateway.notebook_http' \
  --KernelGatewayApp.seed_uri='./api.ipynb' \
  --KernelGatewayApp.prespawn_count=5
open http://localhost:9007/hello/world
open http://localhost:9007/person
open http://localhost:9007/hello/charlie/brown
```

## Uninstall

```bash
# DEPRECATED
# jupyter serverextension disable --py nb2kg --sys-prefix
# pip uninstall -y nb2kg
```

## Retrieve KernelSpecs

+ [Nb2Kg] Add support for retrieving kernelspec resources [nb2kg#23](https://github.com/jupyter/nb2kg/pull/23).
+ [KG] Support serving kernelspec resources [kernel_gateway#314](https://github.com/jupyter/kernel_gateway/pull/314).
