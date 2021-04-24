[![Datalayer](https://raw.githubusercontent.com/datalayer/datalayer/main/res/logo/datalayer-25.svg?sanitize=true)](https://datalayer.io)

# ⚛️ Jupyter React

> Jupyter React, React.js for Jupyter.

This repository curates techniques to use [React.js](https://reactjs.org) inside the [Jupyter](https://jupyter.org) ecosystem, with a primary focus on wrapping [JupyterLab](https://github.com/jupyterlab/jupyterlab) components into React.js. The JupyterLab UI is built on the [Lumino](https://github.com/jupyterlab/lumino) widgets.

The end goal is to make easy to build a Jupyter frontend. This is not about a tool to develop JuyterLab extensions. We are still experimenting, so do not expect formal APIs, primitives nor docs.

Please open [Issues](https://github.com/datalayer/jupyter-react/issues) for questions, feature requests, bug reports... We also welcome [Pull Requests](https://github.com/datalayer/jupyter-react/pulls).

## Storybook

The below picture is an example of [Lumino](https://github.com/jupyterlab/lumino) dock panels wrapped into a React.js component. Discover more examples on https://jupyter-react.datalayer.io.

[![lumino-in-react](https://raw.githubusercontent.com/datalayer/jupyter-react/main/docs/source/images/lumino-in-react.png)](https://jupyter-react.datalayer.io)

You can also launch a local storybook and hack the source code.

```bash
# Clone, install and browse the storybook.
git clone https://github.com/datalayer/jupyter-react.git &&
  cd jupyter-react && \
  make env \
    clean \
    install \
    build \
    storybook
```

To execute code in the jupyterlab components, start a separated server.

```bash
make jupyterlab
```

## Deploy

You can deploy the storybook in your [Vercel](https://vercel.com) (former Now.js) account. 

Test first the build on your local env.

```bash
# This will open storybook/.out/index.html in your browser.
make storybook-build
```

Ccnfigure a vercel `jupyter-react-storybook` project with:

- Build command: `yarn build:vercel`
- Output directory: `storybook/.out`.

[![vercel-settings](https://raw.githubusercontent.com/datalayer/jupyter-react/main/docs/source/images/vercel-settings.png)](https://raw.githubusercontent.com/datalayer/jupyter-react/main/docs/source/images/vercel-settings.png)

Then run the following command to deploy in production.

```bash 
# Deploy the storybook (if you have karma for).
# open https://jupyter-react.datalayer.io
make storybook-prod
```

## Moving Forward...

Today, a developer can evolve JupyterLab by adding or removing features (a.k.a. extensions) from the full application. But it is difficult to `start from a blank page` and incrementally add components. To ease that goal, we have defined 3 steps.

**Step 1 - Showcase to developers how to use the existing JupyterLab and Lumino components (Panels, Layouts, CSS, Icons, Widgets...)**

You already have today great resources to learn JupyterLab development. The [Lumino examples](https://github.com/jupyterlab/lumino/tree/master/examples), the [JupyterLab examples](https://github.com/jupyterlab/jupyterlab/tree/master/examples), the Astronomy Of the Day extension ([docs](https://jupyterlab.readthedocs.io/en/stable/developer/extension_tutorial.html), [source](https://github.com/jupyterlab/jupyterlab_apod)), the [extension examples](https://github.com/jupyterlab/extension-examples) repository, [online tutorials](https://www.youtube.com/watch?v=RFabWieskak), a [cookie-cutter](https://github.com/jupyterlab/extension-cookiecutter-ts) to get you started with an extension...

We are now contributing a new ressource with a a [didactic Storybook](https://jupyter-react.datalayer.io) exposing the JupyterLab internals. That Storyboook is backed by a [Lumino Adapter](https://github.com/datalayer/jupyter-react/tree/main/packages/lumino-adapter) to expose Lumino in React and [Material UI Themes](https://github.com/datalayer/jupyter-react/tree/main/packages/themes) to provide a JupyterLab-like look-and-feel.

**Step 2 - Build higher-level React components easy to use to embed in you React application or your favorite static web site generator ([Gatsby.js](https://www.gatsbyjs.com), [Docusaurus](https://docusaurus.io)...)**

```jsx
<Notebook kernel="py3">
  <Cell text="print('Hello jupyter-react')">
</Notebook>
```

In this quest, we need to connect as much as we can with the [Nteract](https://github.com/nteract/nteract) project that also delivers React.js based components for Jupyter, but without relying on JupyterLab (e.g. [cell.md](https://github.com/nteract/nteract/blob/main/packages/presentational-components/src/components/cell.md), [cells.tsx](https://github.com/nteract/nteract/blob/main/packages/stateful-components/src/cells/cells.tsx), [code-cell.tsx](https://github.com/nteract/nteract/blob/main/packages/stateful-components/src/cells/code-cell.tsx)).

**Step 3 - Build a React application that is a clone of the well-know [Classic Notebook](https://github.com/jupyter/notebook) fueled by the `jupyter-react` components (which are fueled by `jupyterlab` underneath)**

That clone would have 100% features parity with the beloved classic notebook, would look-an-feel the same, should be as performant loading large notebooks. On top it should have features like [Real Time Collaboration](https://github.com/jupyterlab/rtc). We could name that `notebook2` or `notebook-next` or `notebook+`... and ensure a transparent migration for the notebook lovers.

This Step 3 should be done outside of this repository.

## But... wait...

1. *Why wrapping in yet-another-layer like React.js?* JupyterLab architecture is great, but Lumino widgets constructs needs a lot of line codes (see e.g. [this example](https://github.com/jupyterlab/lumino/blob/938804120f58bf61e795bde9d596f6ce7573e920/examples/example-dockpanel/src/index.ts)) and is not widely adopted outside of the JupyterLab community. Exposing in a more standard UI toolkit should drive a wider adoption.

2. *Why `jupyter-react` and not `juyterlab-react`?* We also need servers, kernels, so we are looking at backend, with for example [JupyterPool](https://github.com/datalayer/jupyterpool) as well at frontend, hence the more generic `jupyter-react` name. 

3. *Hey, there is already a [single document mode to address classic notebook usage cases](https://github.com/jupyterlab/jupyterlab/pull/8531)...* We want to provide a transparent migration to the existing notebook users, as not providing a stripped-down version of JupyterLab.

4. *Mmh, I have also seen the [simplest-notebook](https://github.com/yuvipanda/simplest-notebook)...* Great spot! This looks much like our target but still too closer from a stripped-down version of the existing JupyterLab.

## Open Questions

1. *Should we support the [ipywidgets](https://ipywidgets.readthedocs.io/en/latest/) and related [comms](https://ipywidgets.readthedocs.io/en/latest/examples/Widget%20Low%20Level.html)?* Nteract [supports ipywidgets](https://github.com/nteract/nteract/issues/4573) ([blog post](https://blog.nteract.io/the-nteract-january-2020-release-a430d50ac0fd), [docs for comm](https://github.com/nteract/nteract/blob/main/packages/epics/docs/comms.md)).

2. *Should we support [jupyter-output-spec](https://github.com/quansight-labs/jupyter-output-spec)?* There is already an [draft implemention for JupyterLab](https://github.com/blois/js-module-renderer).

3. *Which React Toolkit to use*? We use for now [Material UI](https://github.com/mui-org/material-ui) while monitoring other toolkits like [GitHub Primer](https://github.com/primer/components). Both JupyterLab and Nteract depends today on [Blueprint.js](https://blueprintjs.com).

4. *What would be the Community Adoption?* React future in JupyterLab is still under discussion, see e.g.:

- [Remove dependency on third-party library for ui-components](https://github.com/jupyterlab/jupyterlab/issues/6890)
- [Future of ui-components package: drop Blueprint; should we use Material-UI](https://github.com/jupyterlab/jupyterlab/issues/7574)
- [Switch to material-ui](https://github.com/jupyterlab/jupyterlab/pull/6828)
<!--
## TODO

- use-signal
- traitlets

## Other Systems

Other systems part of the Jupyter ecosystem should be considered while integrating React into JupyterLab:

- [IpyWidgets](https://github.com/jupyter-widgets/ipywidgets) (Jupyter Widgets, Interactive Widgets for the Jupyter Notebook) integrates with JupyterLab via the [IpyWidgets Jupyterlab Manager](https://github.com/jupyter-widgets/ipywidgets/tree/master/packages/jupyterlab-manager>) extension
- [Nteract](https://github.com/nteract/nteract>) which is developed from scratch with React. Ntreact supports IpyWidgets via its [jupyter-widgets](https://github.com/nteract/nteract/tree/master/packages/jupyter-widgets) package

## Documentaation

You can find more details on the [documentation website](https://jupyter-react.readthedocs.io).

## Useful Links

- [JupyterCon 2020: Creating JupyterLab Extensions - Faster](https://www.youtube.com/watch?v=95JS8VeKH0M)
- [How do you engineer a JupyterLab React Component?](https://github.com/jupyterlab/jupyterlab/issues/6380)
- [Track migration to components](https://github.com/jupyterlab/jupyterlab/issues/5702)
- [[WIP] Add @jupyterlab/components package](https://github.com/jupyterlab/jupyterlab/pull/5538)
- [Figure out if tree shaking is working with blueprint](https://github.com/jupyterlab/jupyterlab/issues/5601)
- [Create a @jupyterlab/ui package based on Blueprint and possibly Material UI](https://github.com/jupyterlab/jupyterlab/issues/5170)
- [Add ui package and refactor toolbars](https://github.com/jupyterlab/jupyterlab/pull/4234)
- [How do you engineer a JupyterLab React Component?](https://github.com/jupyterlab/jupyterlab/issues/6380)
- [Switch to material-ui](https://github.com/jupyterlab/jupyterlab/pull/6828)
- [Remove dependency on third-party library for components](https://github.com/jupyterlab/jupyterlab/issues/6890)
- [OUTDATED] [jupyter-react](https://github.com/timbr-io/jupyter-react)
- [OUTDATED] [VDom IpyWidget](https://github.com/jupyter-widgets/ipywidgets/issues/2039)
- [OUTDATED] [VDom Ipywidget Repo](https://github.com/shoobomb/vdom_ipywidget)
- [OUTDATED] [VDom Example](https://github.com/AaronWatters/jp_doodle/blob/master/notebooks/misc/wdom%20Example.ipynb)
-->
