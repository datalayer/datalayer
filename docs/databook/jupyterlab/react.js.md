---
title: React.js in JupyterLab
---

# React.js in JupyterLab

[Virtual DOM React](https://jupyterlab.readthedocs.io/en/latest/developer/virtualdom.html#react).

## Pull Requests

[Track migration to components](https://github.com/jupyterlab/jupyterlab/issues/5702).

[[WIP] Add @jupyterlab/components package](https://github.com/jupyterlab/jupyterlab/pull/5538).

[Figure out if tree shaking is working with blueprint](https://github.com/jupyterlab/jupyterlab/issues/5601).

[Create a @jupyterlab/ui package based on Blueprint and possibly Material UI](https://github.com/jupyterlab/jupyterlab/issues/5170).

[Add ui package and refactor toolbars](https://github.com/jupyterlab/jupyterlab/pull/4234).

[How do you engineer a JupyterLab React Component?](https://github.com/jupyterlab/jupyterlab/issues/6380)

[Switch to material-ui](https://github.com/jupyterlab/jupyterlab/pull/6828).

[Remove dependency on third-party library for `components`](https://github.com/jupyterlab/jupyterlab/issues/6890).

## Architecture

[React component for a button - It knows nothing about phosphor or signals](https://github.com/jupyterlab/jupyterlab/blob/master/packages/apputils/src/toolbar.tsx#L375).

[Phosphor widget that wraps the previous button and takes the exact same props](https://github.com/jupyterlab/jupyterlab/blob/master/packages/apputils/src/toolbar.tsx#L401).

[A bit awkward to manage the transition between signals and props, see a component that does that](https://github.com/jupyterlab/jupyterlab/blob/master/packages/apputils/src/toolbar.tsx#L432).

> I am imagining that as we do more of these things, we will start to see the patterns and can build more logic to make it easy.  In general though, we are trying to keep phosphor stuff out of our react components, so they are truly reusable.

## Examples

+ [Toolbar](https://github.com/telamonian/jupyterlab-hdf/blob/master/src/toolbar.tsx)

# Msc

+ [How do you engineer a JupyterLab React Component?](https://github.com/jupyterlab/jupyterlab/issues/6380)

## VDom

+ [Add event handling support to vdom-extension](https://github.com/jupyterlab/jupyterlab/pull/5670)
