# Jupyter Federation Docs

This folder contains content for the [Jupyter Federation ReadTheDocs website](https://jupyter-federation.readthedocs.io).

```bash
# Install and build the doc site.
git clone https://github.com/datalayer/jupyter-federation && \
  cd jupyter-federation && \
  pip install -e .[rtd] && \
  cd docs && \
  make html && \
  open build/html/index.html
```
