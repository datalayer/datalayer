# Jupyter Platform Docs

This folder contains content for the [Jupyter Platform ReadTheDocs website](https://jupyter-platform.readthedocs.io).

```bash
# Install and build the doc site.
git clone https://github.com/datalayer/jupyter-platform && \
  cd jupyter-platform && \
  pip install -e .[rtd] && \
  cd docs && \
  make html && \
  open build/html/index.html
```
