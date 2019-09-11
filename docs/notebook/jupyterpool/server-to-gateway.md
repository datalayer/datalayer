---
title: Server to Gateway
---

# Server to Gateway

> Jupyter Server extension that enables the server to use remote kernels hosted by a Jupyter "Gateway" (i.e., Kernel Gateway or Enterprise Gateway).

```
BROWSER --- SERVER --- NB2KG -- GATEWAY
```

Server to Gateway [GitHub](https://github.com/jupyter/nb2kg) repository.

![Server to Gateway](https://raw.githubusercontent.com/jupyter/nb2kg/master/deploy.png)

## Install

```bash
# pip install nb2kg
pip install git+https://github.com/jupyter-incubator/nb2kg.git#egg=nb2kg
jupyter serverextension enable --py nb2kg --sys-prefix
jupyter serverextension list
```

```bash
# Option 1.
pip install jupyter_kernel_gateway
jupyter kernelgateway --port 9007 --ip=0.0.0.0
# Option 2.
docker run -it --rm -p 9007:8888 jupyter/minimal-kernel
```

## Start

```bash
# export KG_URL=http://localhost:9001
KG_URL=http://localhost:9007 jupyter lab \
  --NotebookApp.session_manager_class=nb2kg.managers.SessionManager \
  --NotebookApp.kernel_manager_class=nb2kg.managers.RemoteKernelManager \
  --NotebookApp.kernel_spec_manager_class=nb2kg.managers.RemoteKernelSpecManager 
```

## Uninstall

```bash
jupyter serverextension disable --py nb2kg --sys-prefix
pip uninstall -y nb2kg
```

## Retrieve KernelSpecs

+ [Nb2Kg] Add support for retrieving kernelspec resources [nb2kg#23](https://github.com/jupyter/nb2kg/pull/23).
+ [KG] Support serving kernelspec resources [kernel_gateway#314](https://github.com/jupyter/kernel_gateway/pull/314).
