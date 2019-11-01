---
title: Voila
---

# Voila

> Voila, Interactive renderer for Jupyter notebooks.

Voila [GitHub](https://github.com/quantstack/voila) repository.

Voila [Docs](https://voila.readthedocs.io/en/latest).

## Articles

[And voilà!...](https://blog.jupyter.org/and-voil%C3%A0-f6a2c08a4a93) from Jupyter notebooks to standalone applications and dashboards.

## Install

```bash
# conda install voila -c conda-forge
pip install voila
```

## Use

```bash
# --theme=dark
voila notebook.ipynb
```

## Pre-existing Server

Voila within a pre-existing Jupyter server.

```bash
jupyter lab --VoilaConfiguration.template=distill
# List the notebooks.
open http://localhost:8888/voila
# Open a notebook.
open http://localhost:8888/voila/render/notebook.ipynb
```

## JupyterLab Extension

Voila JupyterLab [Extension](https://github.com/quantstack/voila/blob/master/CONTRIBUTING.md#jupyterlab-extension).

```bash
jupyter labextension install @jupyter-widgets/jupyterlab-manager && \
  jupyter labextension install @jupyter-voila/jupyterlab-preview
```

```bash
cd $DLAHOME/repos/voila && \
  jupyter labextension install ./packages/jupyterlab-voila
# start in watch mode to pick up changes automatically
jupyter lab --watch
```

## Config

```bash
# https://voila.readthedocs.io/en/latest/customize.html
voila \
  --VoilaConfiguration.file_whitelist="['.*']" \
  notebook.ipynb
```

## Examples

Voila [Examples](https://github.com/voila-dashboards/voila/tree/master/notebooks).

Voila [Scipy Demo](https://github.com/maartenbreddels/scipy-voila-demo).

+ [Hello World](https://github.com/voila-gallery/hello-world-example).
+ [Country Indicators](https://github.com/voila-gallery/voila-gallery-country-indicators).
+ [Gaussian Density](https://github.com/voila-gallery/gaussian-density).
+ [Render STL](https://github.com/voila-gallery/render-stl).
+ [CPP XLeaflet](https://github.com/voila-gallery/cpp-xleaflet).

## Gallery

Voila Gallery [Website](https://voila-gallery.org).

Voila Gallery [GitHub](https://github.com/voila-gallery/gallery) repository.

[A Gallery of Voila Examples](https://blog.jupyter.org/a-gallery-of-voil%C3%A0-examples-a2ce7ef99130).

## Templates

Voila [Gridstack](https://github.com/quantstack/voila-gridstack) template.

```bash
pip install voila-gridstack
curl https://codeload.github.com/voila-gallery/hello-world-example/tar.gz/master \
  | tar -xz --strip=1 hello-world-example-master/app.ipynb && \
  voila --template gridstack app.ipynb
```

Voila [Vuetify](https://github.com/quantstack/voila-vuetify) template.

```bash
pip install bqplot ipyvuetify voila-vuetify
git clone https://github.com/quantstack/voila-vuetify && \
  cd voila-vuetify && \
  voila --template vuetify-default bqplot_vuetify_example.ipynb
```

Voila Vuetify [Demo](https://github.com/maartenbreddels/voila-demo).

Voila Vuetify [Demo2](https://github.com/maartenbreddels/voila-demo2).

```bash
cd $DLAHOME/repos/voila/notebooks && \
  voila --template vuetify-default dashboard.ipynb
```

Voila [Debug](https://github.com/quantstack/voila-debug) template.

```bash
pip install voila-debug
voila --template=debug --VoilaExporter.template_file=debug.tpl
```

Voila [Material](https://github.com/martinrenou/voila-material) template.

Voila [Adminlte](https://github.com/martinrenou/voila-adminlte) template.

## Unlinked

Voila [Unlinked](https://github.com/maartenbreddels/voila-unlinked).

## Heroku

Voila [Heroku](https://github.com/martinRenou/voila_heroku).

## GPX Viewer

Voila [GPX Vviewer](https://github.com/jtpio/voila-gpx-viewer).

## Conda Forge

Voila [Conda-Forge Feedstock](https://github.com/conda-forge/voila-feedstock).

Voila [Conda-Forge Gridstack Feedstock](https://github.com/conda-forge/voila-gridstack-feedstock).

## Phoila

[Phoila](https://github.com/vidartf/phoila).

A Phosphor wrapper for Voila, hence the name Pho(sphor) + (V)oila.
