# Jupyter SDK Docs

This folder contains content for the [Jupyter SDK ReadTheDocs website](https://jupyter-sdk.readthedocs.io).

```bash
# Install and build the doc site.
git clone https://github.com/datalayer/jupyter-sdk && \
  cd jupyter-sdk && \
  pip install -e .[rtd] && \
  cd docs && \
  make html && \
  open build/html/index.html
```
