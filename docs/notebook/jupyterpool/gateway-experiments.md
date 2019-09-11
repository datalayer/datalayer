---
title: Gateway Experiments
---

# Gateway Experiments

```
BROWSER --- JUPYTER_SERVER --- KERNEL_MANAGER --- REMOTE_KERNEL                                
```

Gateway Experiments [GitHub](https://github.com/gateway-experiments) account.

+ https://github.com/gateway-experiments/remote_kernel_provider
+ https://github.com/gateway-experiments/yarn_kernel_provider
+ https://github.com/gateway-experiments/kubernetes_kernel_provider
+ https://github.com/gateway-experiments/docker_kernel_provider

+ https://github.com/gateway-experiments/notebook
+ https://github.com/gateway-experiments/jupyter_kernel_mgmt
+ https://github.com/gateway-experiments/jupyter_ssh_kernels
+ https://github.com/gateway-experiments/jupyter_docker_kernels

## Notebook

+ [WIP: Use new kernel management APIs in notebook server](https://github.com/jupyter/notebook/pull/4170).
+ [notebook/jupyter-kernel-mgmt](https://github.com/takluyver/notebook/tree/jupyter-kernel-mgmt).
+ [ExecutePreprocessor using jupyter_kernel_mgmt APIs](https://github.com/jupyter/nbconvert/pull/809).

## Interim Release

```bash
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
