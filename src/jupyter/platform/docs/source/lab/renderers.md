---
title: JupyterLab Renderers
---

# JupyterLab Renderers

[Mime Renderer Extensions](https://jupyterlab.readthedocs.io/en/stable/developer/extension_dev.html#mime-renderer-extensions).

## Renderers

```bash
git clone https://github.com/jupyterlab/jupyter-renderers.git && \
  cd jupyter-renderers && \
  yarn install && \
  yarn run build
```

```bash
# Install.
jupyter labextension install @jupyterlab/fasta-extension
jupyter labextension install @jupyterlab/geojson-extension
jupyter labextension install @jupyterlab/katex-extension
jupyter labextension install @jupyterlab/vega2-extension
# Deprecated
# jupyter labextension install @jupyterlab/plotly-extension
```

## CookieCutter

- https://github.com/jupyterlab/mimerender-cookiecutter-ts

## Examples

- [renderer-fasta](https://github.com/jupyterlab/jupyter-renderers/tree/master/packages/fasta-extension)
- [renderer-geojson](https://github.com/jupyterlab/jupyter-renderers/tree/master/packages/geojson-extension)
- [renderer-json](https://github.com/jupyterlab/jupyterlab/tree/master/packages/json-extension).
- [renderer-katex](https://github.com/jupyterlab/jupyter-renderers/tree/master/packages/katex-extension)
- [renderer-mathjax3](https://github.com/jupyterlab/jupyter-renderers/tree/master/packages/mathjax3-extension)
- [renderer-module](https://github.com/blois/js-module-renderer)
- [renderer-mp4](https://github.com/jupyterlab/jupyterlab-mp4)
- [renderer-vega2](https://github.com/jupyterlab/jupyter-renderers/tree/master/packages/vega2-extension)
- [renderer-vega3](https://github.com/jupyterlab/jupyter-renderers/tree/master/packages/-renderer-extension)
