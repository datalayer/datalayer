# Jupyter Cell Docs

This folder contains content for the [Jupyter Cell ReadTheDocs website](https://jupyter-cell.readthedocs.io).

```bash
# Install and build the doc site.
git clone https://github.com/datalayer/jupyter-cell && \
  cd jupyter-cell && \
  pip install -e .[rtd] && \
  cd docs && \
  make html && \
  open build/html/index.html
```
