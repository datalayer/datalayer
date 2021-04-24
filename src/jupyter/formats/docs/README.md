# Jupyter Formats Docs

This folder contains content for the [Jupyter Formats ReadTheDocs website](https://jupyter-formats.readthedocs.io).

```bash
# Install and build the doc site.
git clone https://github.com/datalayer/jupyter-formats && \
  cd jupyter-formats && \
  pip install -e .[rtd] && \
  cd docs && \
  make html && \
  open build/html/index.html
```
