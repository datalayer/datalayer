---
title: [DEPRECATED] Jupyter Kernel Providers
---

# [DEPRECATED] Jupyter Kernel Providers

```
BROWSER --- JUPYTER_SERVER --- KERNEL_MANAGER --- REMOTE_KERNEL_PROVIDER --- KUBERNETES_KERNEL_PROVIDER
```

- https://github.com/takluyver/jupyter_kernel_mgmt
- https://github.com/gateway-experiments/jupyter_kernel_mgmt
- https://jupyter-kernel-mgmt.readthedocs.io

- https://github.com/takluyver/jupyter_protocol
- https://github.com/gateway-experiments/jupyter_protocol
- https://jupyter-protocol.readthedocs.io

## JEP

- [[JEP] Draft proposal for new kernel providers mechanism and associated changes](https://github.com/jupyter/enhancement-proposals/pull/45)

## Server

- https://github.com/jupyter/jupyter_server/pull/112
- https://github.com/kevin-bates/jupyter_server/tree/jupyter-kernel-mgmt

## Providers

- [Notebook](https://github.com/gateway-experiments/notebook)
- [Remote Kernel Provider](https://github.com/takluyver/remote_kernel_provider)
- [Kubernetes Kernel Provider](https://github.com/gateway-experiments/kubernetes_kernel_provider)
- [YARN Kernel Provider](https://github.com/gateway-experiments/yarn_kernel_provider)
- [Remote Docker Kernel Provider](https://github.com/gateway-experiments/jupyter_docker_kernels)
- [Jupyter SSH Kernel Provider](https://github.com/gateway-experiments/jupyter_ssh_kernels)
- [Jupyter Docker Kernel Provider](https://github.com/gateway-experiments/jupyter_docker_kernels)

## Provider Example

```bash
# 
conda create -n py3-kernel-provider python=3.6
conda activate py3-kernel-provider
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

Create the Kubernetes environment:

- An image (elyra/nb-kernel-mgmt:dev) containing the `notebook`, `jupyter_kernel_mgmt`, `remote_kernel_provider`, `kubernetes_kernel_provider` and `docker_kernel_provider` whl and `kernelspec` files can be found [here](https://hub.docker.com/r/elyra/nb-kernel-mgmt).
- Should you need to modify the image, download the [Dockerfile](https://github.com/gateway-experiments/remote_kernel_provider/releases/download/v0.1-interim-dev/Dockerfile) attached to this release.

I deployed the image on Kubernetes using the attached `notebook.yaml file`. This file is derived directly from the one used by Enterprise Gateway. As a result, there are a number of items in this file that do not apply to this configuration or require more work (e.g., whitelists are not applied, and kernel-image-puller isn't able to access specs from Notebook, etc.)

## Kernel Specs

Kernel Specs [Docs](https://jupyter-kernel-mgmt.readthedocs.io/en/latest/kernel_finder.html#kernelspecs).
Kernel Specification Format [Docs](https://jupyter-kernel-mgmt.readthedocs.io/en/latest/kernel_finder.html#kernelspecs).

```bash
jupyter kernelspec list
jupyter kernelspec list --json
```

## Kernel Specs Provider

[Kernel Specs Provider](https://jupyter-kernel-mgmt.readthedocs.io/en/latest/kernel_finder.html#kernel-specifications).

https://jupyter-kernel-mgmt.readthedocs.io/en/latest/kernel_providers.html#included-kernel-providers

jupyter_kernel_mgmt includes two kernel providers in its distribution.

1. KernelSpecProvider handles the discovery and launch of most existing kernelspec-based kernels that exist today.
2. IPykernelProvider handles the discover and launch of any IPython kernel that is located in the executing python’s interpreter. For example, if the application is running in a virtual Python environment, this provider identifies if any IPython kernel is local to that environment and may not be identified by the path algorithm used by KernelSpecProvider.

## Runtime Directory

```bash
# Get runtime directory.
jupyter --runtime-dir
# /Users/echar4/Library/Jupyter/runtime
# ~/.local/share/jupyter/runtime/kernel-d785bbc8-c058-49d0-861c-97a39089c91e.json
# ./run/user/1000/jupyter/kernel-772af73b-185b-4960-b0fb-a0532dc59e49.json
```

```bash
# List Kernel connection files.
ls $(jupyter --runtime-dir) | grep json
find `jupyter --runtime-dir` -mtime -5 | grep nbserver | xargs cat
```

## Conda Kernels

- [nb_conda_kernels](https://github.com/anaconda-platform/nb_conda_kernels)

```json
{
  "NotebookApp": {
    "nbserver_extensions": {
      "nb_conda": true,
      "jupyterlab_twitter": true
    },
    "kernel_spec_manager_class": "nb_conda_kernels.CondaKernelSpecManager"
  }
}
```

## [MSC] NbConvert

- [ExecutePreprocessor using jupyter_kernel_mgmt APIs](https://github.com/jupyter/nbconvert/pull/809).

## [DEPRECATED] Notebook

- [WIP Use new kernel management APIs in notebook server 6.x](https://github.com/jupyter/notebook/pull/4837)
- [WIP Use new kernel management APIs in notebook server](https://github.com/jupyter/notebook/pull/4170) is superseded)
- [notebook/jupyter-kernel-mgmt](https://github.com/takluyver/notebook/tree/jupyter-kernel-mgmt).
