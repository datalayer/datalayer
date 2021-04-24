---
title: JupyterLab Kernel
---

# JupyterLab Kernel

## Architecture

The `service manager` provides ways to access the server REST API, including starting kernels, etc.

![Architecture 1](https://raw.githubusercontent.com/jupyterlab/jupyterlab/master/packages/services/architecture.png)

![Architecture 2](https://user-images.githubusercontent.com/192614/66395575-a5ed5b00-e98c-11e9-9076-c14d9294fb8f.png)

## Services

- [Services README](https://github.com/jupyterlab/jupyterlab/tree/master/packages/services)
- [Services TypeDocs](http://jupyterlab.github.io/jupyterlab/services/index.html)

## Parametrized Kernel aka Kernel Provisioning

- [[PROPOSAL] Kernel Provisioning](https://github.com/jupyter/jupyter_client/issues/608)
- [Kernel Provisioning - Initial implementation](https://github.com/jupyter/jupyter_client/pull/612)
- [Fix activity tracking and nudge issues when kernel ports change on restarts](https://github.com/jupyter-server/jupyter_server/pull/482)

- [ksmm](https://github.com/quansight/ksmm)

- [[DRAFT][JEP] Parameterized Kernel Launch](https://github.com/jupyter/enhancement-proposals/pull/46)
- [Adding Option to Customize Parameters when Launching & Changing Kernels](https://github.com/jupyterlab/jupyterlab/issues/9374)
- [Kernel gateway `envs` parameter](https://github.com/jupyterlab/jupyterlab/issues/7640)
- [Feature: KernelSpec Management](https://github.com/jupyterlab/jupyterlab/issues/9528)
- [[CLOSED][PROPOSAL] Parameterized Kernel Launch](https://github.com/takluyver/jupyter_kernel_mgmt/issues/38)
- [Add optional metadata to launcher and running items](https://github.com/jupyterlab/jupyterlab/pull/7437)
- [Parametrized kernels for passing arguments in to starting up kernels](https://github.com/jupyter/jupyter_client/issues/434)
- [Reference kernelspec resources from kernel?](https://github.com/jupyter/jupyter_client/issues/445)
- [Add support for kernel launch parameters](https://github.com/takluyver/jupyter_kernel_mgmt/pull/22)

## Kernel Status

State Machine by Use Case.

- `Start`: unknown -> initalizing -> [KernelManager API Delay] -> connecting -> [Kernel Launch Delay] -> busy -> idle
- `Use`: idle <-> busy
- `Shutdown`: [Kernel Terminate Delay] -> busy -> idle -> unknown
- `Restart`: [Kernel Terminate Delay] -> restarting -> busy -> idle
- `Kill`: idle -> restarting -> autorestarting -> busy -> idle

## Run Code

- [JupyterLab Kernel Log to Web Console](https://stackoverflow.com/questions/59234755/jupyterlab-kernel-log-to-web-console)

## Kernel Spy

```bash
# https://github.com/vidartf/jupyterlab-kernelspy
jupyter labextension install jupyterlab-kernelspy
```

## Rework

- [Rework kernel and Session Srchitecture](https://github.com/jupyterlab/jupyterlab/pull/7252)

## Start

- [Make session dialogs configurable](https://github.com/jupyterlab/jupyterlab/pull/7618)  
- [Clean up kernel startup error messages ](https://github.com/jupyterlab/jupyterlab/pull/8178)

## Async Start

- [RESTful Asynchronous Kernel Starts](https://github.com/jupyter/jupyter_server/issues/197)  

## Status Indicator

- [Kernel Status UX](https://github.com/jupyterlab/jupyterlab/issues/7403)

## Slow Starting Kernel

Simulate slow starting kernels (e.g. 10 seconds):

- Option 1 - Add `time.sleep(10)` in `ipykernel_launcher.py`
- Option 2 - Add `await gen.sleep(10)` in  `notebook.services.kernels.kernelmanager:start_kernel()`

- [Better handling of slow kernel startup](https://github.com/jupyterlab/jupyterlab/pull/8174)
- [Show kernel name for slow-starting kernel](https://github.com/jupyterlab/jupyterlab/pull/7431)
- [Slow-starting kernel displays name of 'No Kernel!' until startup completes](https://github.com/jupyterlab/jupyterlab/issues/6007)

## Slow Terminating Kernel

Simulate slow terminating kernels:

- Option 1: Run this cell.

```python
import time, atexit
def slow_exit():
    time.sleep(10)
atexit.register(slow_exit)
```

- Option 2: Add `time.sleep(10)` in `notebook.services.kernels.kernelmanager:shutdown_kernel()` and `restart_kernel()`

- [Race Condition with Slow Restarting Kernels](https://github.com/jupyterlab/jupyterlab/issues/8477)
- [JupyterHub + JupyterLab+Jupyte + EnterpriseGateway Restart Kernel hangs](https://github.com/jupyterlab/jupyterlab/issues/8013)

## Reconnect

- [Reconnect a websocket when a Kernel is restarted](https://github.com/jupyterlab/jupyterlab/pull/8432)

## Transient Message

- [Transient Display Data](https://github.com/vatlab/transient-display-data)
- [Move console foreign handler to its own plugin ](https://github.com/jupyterlab/jupyterlab/pull/5711)
- [A general UI for displaying transient information from kernels](https://github.com/jupyterlab/jupyterlab/issues/4550)

## Kernel Provider

- [[JEP] Draft proposal for new kernel providers mechanism and associated changes](https://github.com/jupyter/enhancement-proposals/pull/45)

## Jupyer Kernels right inside JupyterLab

- https://github.com/deathbeds/jyve
- https://deathbeds.github.io/jyve/lab
