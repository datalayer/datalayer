# Jupyter Providers Docs

This folder contains content for the [Jupyter Providers ReadTheDocs website](https://jupyter-providers.readthedocs.io).

```bash
# Install and build the doc site.
git clone https://github.com/datalayer/jupyter-providers && \
  cd jupyter-providers && \
  pip install -e .[rtd] && \
  cd docs && \
  make html && \
  open build/html/index.html
```
