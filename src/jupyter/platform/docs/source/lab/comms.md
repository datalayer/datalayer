---
title: JupyterLab Comms
---

# JupyterLab Comms

> Comms allow custom messages between the frontend and the kernel.
> They are used, for instance, in [IPyWidgets](/lab/ipywidgets.md) to update widget state.

## Architecture

![Comms Architecture for IPyWidgets](https://raw.githubusercontent.com/jupyter-widgets/ipywidgets/master/docs/source/examples/images/WidgetArch.png)

## Docs

- [Notebook Comms](https://jupyter-notebook.readthedocs.io/en/latest/comms.html)
- [Jupyter Protocol Custom Messages = Comm](https://jupyter-protocol.readthedocs.io/en/latest/messaging.html#custom-messages)
- [Low Level Widget Tutorial](https://ipywidgets.readthedocs.io/en/latest/examples/Widget%20Low%20Level.html)
- [JupyterLab Typescript Docs](http://jupyterlab.github.io/jupyterlab/services/index.html)

- https://github.com/jupyter-widgets/ipywidgets/blob/1f93ad39802d3ee4a6b88bc13064f93f8f796374/docs/source/examples/images/display.svg
- https://github.com/jupyter-widgets/ipywidgets/blob/1f93ad39802d3ee4a6b88bc13064f93f8f796374/docs/source/examples/images/state.svg
- https://github.com/jupyter-widgets/ipywidgets/blob/1f93ad39802d3ee4a6b88bc13064f93f8f796374/docs/source/examples/images/assoc.svg
- https://github.com/jupyter-widgets/ipywidgets/blob/1f93ad39802d3ee4a6b88bc13064f93f8f796374/docs/source/examples/images/busy.svg
- https://github.com/jupyter-widgets/ipywidgets/blob/1f93ad39802d3ee4a6b88bc13064f93f8f796374/docs/source/examples/images/state_sync.svg
- https://github.com/jupyter-widgets/ipywidgets/blob/1f93ad39802d3ee4a6b88bc13064f93f8f796374/docs/source/examples/images/widgetcomm.svg

## Open Comms from Kernel

- https://jupyter-notebook.readthedocs.io/en/stable/comms.html#opening-a-comm-from-the-kernel

- https://github.com/jcoady/nbcommjlab2
- https://github.com/jcoady/nbcommjlab2/blob/master/src/index.ts

- https://github.com/itsjafer/jupyterlab-sparkmonitor/blob/8a3d722ab2f0c668717c016cec50521cd32010ec/js/SparkMonitor.js#L152

## Comms for Multiple IPyWidget

- [Make handling comm messages optional in a kernel connection](https://github.com/jupyterlab/jupyterlab/pull/6929)
- [Broadcast Comm shell messages on iopub](https://github.com/jupyter/jupyter_client/issues/263)
- [Multiple frontends and one kernel](https://github.com/jupyter-widgets/ipywidgets/issues/1218)
- [IPyWidgets cannot render when connected to a kernel of another notebook](https://github.com/jupyter-widgets/ipywidgets/issues/2628)
- [Breaks some widgets, possibly related to multiple client kernel connections?](https://github.com/voila-dashboards/voila-debug/issues/5)

- Two instances (widget-1, widget-2) of the same widgets are created (e.g. console), each with a different session pointing to two different kernels
Change one of the widget (widget-1) to use the session of widget-2. This closes all comms that was registered by widget-1 since the new kernelconnection does not handleComms so the registerCommTarget call will be fenced by an if statement. My question is suppose I want the kernel to talk to the two widgets (now connected to the same kernel) either simultaenously or independently of each other, how would I send data over since widget-2 now has no Comm associated with it? Or should I force the new KernelConnection associated with widget-1 to handleComms to keep both comms open?

- @TK-21st - right now, you'd have to explicitly force the new kernel connection to handle comms. Just be aware that there can be subtle problems with using the same comm from two different clients, where, for example, one client may shut down a comm the other client is using.
The comm protocol very much assumes that it is between a kernel and a single client.
For example, if client A has a specific comm handler registered, but client B does not, a message to open a comm for that comm handler will open the object in client A, but the spec demands that client B close the comm channel, which shuts down the comm object in the kernel. No notification is sent to client A about the closure, so the result is that client A has a comm channel to nowhere

- @jasongrout Thanks for the clarification, I got it to work by forcing handleComms = true. I do understand the potential issues that come with that, could you may suggest a better alternative if two clients are to share a kernel?
Previously this was done by re-routing the content of commMsg callback to the new client in browser. But then it's not immediately clear to me how the client with the comm can know which other client to route the data to. Or similarly, how the new client knows where to get data from in run-time

## Msc

- https://github.com/jupyterlab/jupyterlab/issues/1254
- https://github.com/jupyterlab/jupyterlab/pull/6833
