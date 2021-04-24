# Jupyter Operator Docs

This folder contains content for the [Jupyter Operator ReadTheDocs website](https://jupyter-operator.readthedocs.io).

```bash
# Install and build the doc site.
git clone https://github.com/datalayer/jupyter-operator && \
  cd jupyter-operator && \
  pip install -e .[rtd] && \
  cd docs && \
  make html && \
  open build/html/index.html
```
