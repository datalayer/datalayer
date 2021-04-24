---
title: JupyterLab Debugger
---

# JupyterLab Debugger

- https://github.com/jupyterlab/debugger
- https://github.com/jupyterlab/debugger/pull/36

- https://github.com/jupyterlab/debugger/issues/274
- https://github.com/jupyterlab/debugger/issues/64#issue-508391980

- https://blog.jupyter.org/a-visual-debugger-for-jupyter-914e61716559?gi=14d884d7ef03

## IDE Demo

- https://github.com/blink1073/jupyter-ide-demo

## Debug Protocol

- https://jupyterlab.readthedocs.io/en/latest/user/debugger.html
- https://jupyter-client.readthedocs.io/en/latest/messaging.html#debug-request
- https://github.com/jupyter/enhancement-proposals/pull/47

## Debug Adapter Protocol

- https://microsoft.github.io/debug-adapter-protocol/
- https://microsoft.github.io/debug-adapter-protocol/overview
- https://microsoft.github.io/debug-adapter-protocol/specification

## IpyKernel

- https://github.com/jupyterlab/debugger/issues/274#issuecomment-574234207

## VSCode

- https://github.com/microsoft/ptvsd
- https://github.com/microsoft/ptvsd#waiting-for-the-debugger-to-attach
- https://github.com/microsoft/debugpy
- https://devblogs.microsoft.com/python/python-in-visual-studio-code-march-2020-release/

## Protocol

- https://github.com/jupyter/enhancement-proposals/pull/47
- https://blog.jupyter.org/a-visual-debugger-for-jupyter-914e61716559
- https://github.com/jupyterlab/debugger/issues/64

- https://github.com/jupyterlab/team-compass/issues/75

## Xeus

- https://code.visualstudio.com/updates/v1_47
- https://github.com/jupyterlab/team-compass/issues/75

## IPyKernel

```
Regarding the integration in ipykernel, we propose to do it in two stages:

Implement the kernel messages in the ipykernel control channel

This will result in a debugging experience in ipykernel, but actions such as e.g. adding a breakpoint will only be executed after the current execution request is completed. This part should be easy, and backward compatible! But the experience will not be 100% ideal because one will not be able to add a breakpoint in the middle of a long-running loop.

Run the ipykernel control channel in its own thread like with xeus-python.

This may be a simple change - but is more of an unknown because changing the concurrency model of ipykernel can be consequential depending on how people were making assumptions on the current one. Xeus-based kernels support a pluggable concurrency model (control in main thread + shell in separate thread, shell in main thread + control in separate, single event loop).

We know that only the [shell in main thread + control in separate] case will matter for ipykernel, but that should be in a major release of ipykernel.

Even if we do both (1) an (2) in one go or ipykernel, I think we will want to improve the UI for kernels that only support (1). For example, by having a visual indication that a breakpoint was input, but is not yet added on the kernel side. That will help with kernels providing a naive implementation, and with high-latency scenarios.

Note that we are already making strides on having common code between xeus-python and ipykernel (input preprocessors, display mechanism, magics).
```

## Misc

- https://github.com/hediet/vscode-debug-visualizer/tree/master/extension
