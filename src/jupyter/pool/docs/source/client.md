---
title: Jupyter Client
---

# Jupyter Client

```
CLIENT --- KERNEL
```

Client [GitHub](https://github.com/jupyter/jupyter_client) repository.

Client [Docs](https://jupyter-client.readthedocs.io/en/latest).

Client [API Docs](https://jupyter-client.readthedocs.io/en/latest/api/client.html).

## Kernel Manager

- https://github.com/jupyter-server/jupyter_server/tree/master/jupyter_server/services/kernels

## Custom Kernel Manager

- https://github.com/mwouts/jupytext/blob/d2898da3771d224bab3c15a2ea3e8e6e30a20423/jupytext/__init__.py#L40-L42

## Kernel Async

- [Add support for async kernel management via subclassing](https://github.com/jupyter/jupyter_client/pull/428)
- [feat: add client class that uses async/await to integrate with asyncio](https://github.com/jupyter/jupyter_client/pull/471)
- [Allow multi kernel manager to handle asynchronous start kerne](https://github.com/jupyter/jupyter_client/pull/402)
- [New KernelLauncher API for kernel discovery system](https://github.com/jupyter/jupyter_client/pull/308)

## Kernel Proxy

- https://github.com/chameleoncloud/jupyterlab-chameleon/blob/3174c9db4de8126e84bf99f3c0451a512432806f/hydra_kernel/kernel.py#L53
- https://github.com/nteract/pick
- https://github.com/carreau/inplace_restarter
- https://github.com/andyneff/docker_proxy_kernel

## Kernel Nanny

- https://github.com/jupyter/jupyter_client/issues/487
- https://github.com/jupyter/jupyter_client/issues/32
- https://github.com/takluyver/jupyter_kernel_mgmt#kernelnanny-and-managerclient

## Kernel Restarter

- https://github.com/carreau/inplace_restarter

## Kernel Reconnect

- [Spawning many kernels may result in ZMQError](https://github.com/jupyter/jupyter_client/issues/487)
- [zmq.error.ZMQError: Address already in use, when running multiprocessing with multiple notebooks using papermill](https://github.com/nteract/papermill/issues/511)
