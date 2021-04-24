# Jupyter React Docs

This folder contains content for the [Jupyter React ReadTheDocs website](https://jupyter-react.readthedocs.io).

```bash
# Install and build the doc site.
git clone https://github.com/datalayer/jupyter-react && \
  cd jupyter-react && \
  pip install -e .[rtd] && \
  cd docs && \
  make html && \
  open build/html/index.html
```
