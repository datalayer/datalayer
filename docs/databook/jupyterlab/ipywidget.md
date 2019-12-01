---
title: IpyWidget
---

# IpyWidget

IpyWidget [GitHub](https://github.com/jupyter-widgets/ipywidgets) repository.

IpyWidget [Docs](https://ipywidgets.readthedocs.io/en/latest).

IpyWidget [Tutorial](https://github.com/jupyter-widgets/tutorial).

IpyWidget [Examples](https://github.com/jupyter-widgets/ipywidgets/tree/master/docs/source/examples).

[IpyWidget JupyterLab Manager](https://github.com/jupyter-widgets/ipywidgets/tree/master/packages/jupyterlab-manager).

## Articles

+ [Authoring Custom Jupyter Widgets](https://blog.jupyter.org/authoring-custom-jupyter-widgets-2884a462e724).
+ [Interactive Controls for Jupyter Notebooks](https://towardsdatascience.com/interactive-controls-for-jupyter-notebooks-f5c94829aee6).

## Comms

[Comms](./kernels/comms.md)

The button widget sends a custom comm message:

- Nandling from the python side: https://github.com/jupyter-widgets/ipywidgets/blob/master/ipywidgets/widgets/widget_button.py#L96-L105 and https://github.com/jupyter-widgets/ipywidgets/blob/master/ipywidgets/widgets/widget_button.py#L63
- Sending from the python side: https://github.com/jupyter-widgets/ipywidgets/blob/master/ipywidgets/widgets/widget.py#L547-L557
- Sending from the js side: https://github.com/jupyter-widgets/ipywidgets/blob/master/packages/controls/src/widget_button.ts#L124

More generally: https://github.com/jupyter-widgets/ipywidgets/blob/master/packages/base/src/widget.ts#L158-L166

Receiving on the js side: https://github.com/jupyter-widgets/ipywidgets/blob/master/packages/base/src/widget.ts#L233-L235

## Nteract

+ https://github.com/nteract/nteract/issues/1385

## Colab

- https://github.com/blois/jupyterlab-comms
- https://github.com/googlecolab/colabtools/blob/master/packages/outputframe/lib/index.d.ts
- https://github.com/googlecolab/colabtools
- https://github.com/googlecolab/colabtools/blob/095f304ca7d20961cd526858d153691d89714f6b/packages/outputframe/lib/index.d.ts#L2-L16
- https://colab.research.google.com/notebooks/snippets/advanced_outputs.ipynb#scrollTo=MprPsZJa3AQF
- https://colab.research.google.com/gist/blois/9ca9c4556b14f0cdb84d7fe1e5aee691/data-explorer.ipynb
- https://colab.research.google.com/notebooks/snippets/advanced_outputs.ipynb#scrollTo=9OyC1_bSEccg&line=7&uniqifier=1

## JupyterLab

[IpyLab](https://github.com/jtpio/ipylab).

## Widgets

+ [bqplot](https://github.com/bloomberg/bqplot).
+ [d3-slider](https://gitlab.com/oscar6echo/jupyter-widget-d3-slider).
+ [drawing-pad](https://github.com/ocoudray/jupyter-drawing-pad).
+ [ipyleaflet](https://github.com/jupyter-widgets/ipyleaflet).
+ [ipymaterialui](https://github.com/maartenbreddels/ipymaterialui).
+ [ipypivot](https://github.com/pierremarion23/ipypivot).
+ [ipyplotly](https://github.com/jonmmease/ipyplotly).
+ [ipyresuse](https://github.com/jtpio/ipyresuse).
+ [ipyscales](https://github.com/vidartf/ipyscales).
+ [ipysheet](https://github.com/quantstack/ipysheet).
+ [ipyvolume](https://github.com/maartenbreddels/ipyvolume).
+ [ipywebrtc](https://github.com/maartenbreddels/ipywebrtc).
+ [nglview](https://github.com/arose/nglview).
+ [pythreejs](https://github.com/jupyter-widgets/pythreejs).
+ [sidecar](https://github.com/jupyter-widgets/jupyterlab-sidecar).

## Example

![WidgetModelView](https://ipywidgets.readthedocs.io/en/latest/_images/WidgetModelView.png)

```python
import ipywidgets as widgets
from IPython.display import display, HTML
```

```python
h = display(HTML('<progress min=0 max=100 value=10></progress>'), display_id='my-progress')
display(h)
```

```python
t = widgets.Text(value='Hello World!', disabled=True)
display(t)
```

```python
s = widgets.IntSlider()
display(s)
```

```python
h.update(HTML('<progress min=0 max=100 value=30></progress>'))
s.value
s.value = 100
```

```python
w.keys[
 '_dom_classes',
 '_model_module',
 '_model_module_version',
 '_model_name',
 '_view_count',
 '_view_module',
 '_view_module_version',
 '_view_name',
 'continuous_update',
 'description',
 'description_tooltip',
 'disabled',
 'layout',
 'max',
 'min',
 'orientation',
 'readout',
 'readout_format',
 'step',
 'style',
 'value'
]
```

```python
a = widgets.FloatText()
b = widgets.FloatSlider()
display(a,b)
mylink = widgets.jslink((a, 'value'), (b, 'value'))
# mylink.unlink()
```

## Widget Cookie Cutter

Widget Cookie Cutter [GitHub](https://github.com/jupyter-widgets/widget-cookiecutter) repository.

Widget Typescript Cookie Cutter [GitHub](https://github.com/jupyter-widgets/widget-ts-cookiecutter) repository.

+ [Plugin Shim](https://github.com/jupyter-widgets/widget-ts-cookiecutter/blob/master/%7B%7Bcookiecutter.github_project_name%7D%7D/src/plugin.ts#L40) that registers the widget in JupyterLab.

+ [Package JSON](https://github.com/jupyter-widgets/widget-ts-cookiecutter/blob/acb06b2b298608974d1b2ba66171ab83ec384c35/%7B%7Bcookiecutter.github_project_name%7D%7D/package.json#L72-L74) tells JupyterLab where to look for the JupyterLab shim.

+ [Webpack](https://github.com/jupyter-widgets/widget-ts-cookiecutter/blob/acb06b2b298608974d1b2ba66171ab83ec384c35/%7B%7Bcookiecutter.github_project_name%7D%7D/webpack.config.js#L11-L28) that packages up an extension.

## React.js IpyWidget

+ `ReactDOM.render` your component on `this.el`, the DOM node you have control over. It's the root node of the widget.

+ [ipyresuse widget](https://github.com/jtpio/ipyresuse/blob/ad36caf300fb18daab92279597b86cea95a5372d/src/widget.tsx#L106-L107).

+ [ipymaterialui](https://github.com/maartenbreddels/ipymaterialui). Problem is, you can access your children's props, which cannot change, but the underlying ipywidget model can change. In case the library is simple, take a look at ipymaterialui before the last big PR merge.

Outdated.

+ [jupyter-react](https://github.com/timbr-io/jupyter-react).
+ [VDom IpyWidget](https://github.com/jupyter-widgets/ipywidgets/issues/2039).
+ [VDom Ipywidget Repo](https://github.com/shoobomb/vdom_ipywidget).
+ [WDom Demo](https://github.com/AaronWatters/jp_doodle/blob/master/notebooks/misc/wdom%20demo.ipynb).

## Vue.js IpyWidget

+ [Vuetify](https://github.com/vuetifyjs/vuetify).
+ [IpyVuetify](https://github.com/mariobuikhuizen/ipyvuetify).
+ [IpyVuetify Example](https://files.gitter.im/jupyter-widgets/Lobby/bzWa/ipyvuetifyExample.gif).
+ [IpyVuetify Examples](https://github.com/mariobuikhuizen/ipyvuetify/blob/master/examples/Examples.ipynb).

## jp_proxy_widget

+ https://github.com/AaronWatters/jp_proxy_widget
+ https://github.com/AaronWatters/jp_doodle
+ https://github.com/AaronWatters/widget-cookiecutter

## Perspective

+ [Perspective](https://github.com/finos/perspective).
+ [Perspective JupyterLab Extension](https://github.com/finos/perspective/tree/master/packages/perspective-jupyterlab).
+ [Perspective Python](https://github.com/timkpaine/perspective-python).
+ [Example](https://perspective.finos.org).

## Folium

[Folium](https://github.com/python-visualization/folium).

# [DEPRECATED] Classic Notebook

+ [Building a Custom Widget](https://ipywidgets.readthedocs.io/en/latest/examples/Widget%20Custom.html).
+ [Javascript Error: define is not defined](https://github.com/jupyter-widgets/ipywidgets/issues/2379).
+ [Jupyter Widget Hello World](https://github.com/pierremarion23/jupyter-widget-hello-world-binder).
+ [First Widget](https://github.com/ocoudray/first-widget).
