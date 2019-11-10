---
title: Gateway Experiments
---

# Gateway Experiments

```
BROWSER --- JUPYTER_SERVER --- KERNEL_MANAGER --- REMOTE_KERNEL_PROVIDER --- KUBERNETES_KERNEL_PROVIDE
```

Gateway Experiments [GitHub](https://github.com/gateway-experiments) account.

## Docs

+ https://jupyter-kernel-mgmt.readthedocs.io/en/latest
+ https://jupyter-protocol.readthedocs.io/en/latest

## Repositories

+ https://github.com/gateway-experiments/notebook

+ https://github.com/gateway-experiments/jupyter_kernel_mgmt
+ https://github.com/gateway-experiments/jupyter_protocol

+ https://github.com/gateway-experiments/remote_kernel_provider

+ https://github.com/gateway-experiments/yarn_kernel_provider
+ https://github.com/gateway-experiments/kubernetes_kernel_provider
+ https://github.com/gateway-experiments/docker_kernel_provider

+ https://github.com/gateway-experiments/jupyter_ssh_kernels
+ https://github.com/gateway-experiments/jupyter_docker_kernels

## Install

[Releases](https://github.com/gateway-experiments/remote_kernel_provider/releases).

```bash
# YARN Install.
conda create -n py3-rkp python=3.6
conda activate py3-rkp
#
export IR=https://github.com/gateway-experiments/remote_kernel_provider/releases/download/v0.1-interim-dev
pip install $IR/notebook-6.0.0.dev0-py2.py3-none-any.whl
pip install --upgrade $IR/jupyter_kernel_mgmt-0.3.0-py3-none-any.whl
pip install $IR/remote_kernel_provider-0.1.0.dev0-py3-none-any.whl
pip install $IR/yarn_kernel_provider-0.1.0.dev0-py3-none-any.whl
pip install tornado==5.1.1
#
mkdir /usr/local/share/jupyter/kernels
cd  /usr/local/share/jupyter/kernels
curl $IR/yarn_kernelspecs.tar | tar xvf -
```

These steps were used to create the Kubernetes environment:
- An image (elyra/nb-kernel-mgmt:dev) containing the `notebook`, `jupyter_kernel_mgmt`, `remote_kernel_provider`, `kubernetes_kernel_provider` and `docker_kernel_provider` whl and `kernelspec` files can be found [here](https://hub.docker.com/r/elyra/nb-kernel-mgmt).
Note: This has not been tested in Docker or Docker Swarm but does appear to work for Kubernetes.
- Should you need to modify the image, download the [Dockerfile](https://github.com/gateway-experiments/remote_kernel_provider/releases/download/v0.1-interim-dev/Dockerfile) attached to this release.
- I deployed the image on Kubernetes using the attached `notebook.yaml file`. This file is derived directly from the one used by Enterprise Gateway. As a result, there are a number of items in this file that do not apply to this configuration or require more work (e.g., whitelists are not applied, and kernel-image-puller isn't able to access specs from Notebook, etc.)
