---
title: Jupyter Kernel Management
---

# Jupyter Kernel Management

Jupyter Kernel Management [GitHub]](https://github.com/gateway-experiments/jupyter_kernel_mgmt) repo.

Jupyter Kernel Management [Docs](https://jupyter-kernel-mgmt.readthedocs.io/en/latest).

## Kernel Specs

Kernel Specs [Docs](https://jupyter-kernel-mgmt.readthedocs.io/en/latest/kernel_finder.html#kernelspecs).
Kernel Specificatin Format [Docs](https://jupyter-kernel-mgmt.readthedocs.io/en/latest/kernel_finder.html#kernelspecs).

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

## Server

+ https://github.com/jupyter/jupyter_server/pull/112
+ https://github.com/kevin-bates/jupyter_server/tree/jupyter-kernel-mgmt

## Providers

+ [Kubernetes Kernel Provider](https://github.com/gateway-experiments/kubernetes_kernel_provider).

Needs.

+ [Remote Kernel Provider](https://github.com/gateway-experiments/remote_kernel_provider).

## Other Providers

+ [YARN Kernel Provider](https://github.com/gateway-experiments/yarn_kernel_provider).
+ [Remote Docker Kernel Provider](https://github.com/gateway-experiments/jupyter_docker_kernels).
+ [Jupyter SSH Kernel Provider](https://github.com/gateway-experiments/jupyter_ssh_kernels).
+ [Jupyter Docker Kernel Provider](https://github.com/gateway-experiments/jupyter_docker_kernels).

## Nbconvert

+ [ExecutePreprocessor using jupyter_kernel_mgmt APIs](https://github.com/jupyter/nbconvert/pull/809).

## Conda Kernels

+ https://github.com/anaconda-platform/nb_conda_kernels

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

## [DEPRECATED] Notebook

+ [WIP: Use new kernel management APIs in notebook server 6.x](https://github.com/jupyter/notebook/pull/4837)
+ ([WIP: Use new kernel management APIs in notebook server](https://github.com/jupyter/notebook/pull/4170) is superseded)
+ [notebook/jupyter-kernel-mgmt](https://github.com/takluyver/notebook/tree/jupyter-kernel-mgmt).
