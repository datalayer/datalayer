[![Datalayer](https://raw.githubusercontent.com/datalayer/datalayer/master/res/logo/datalayer-25.svg?sanitize=true)](https://datalayer.io)

# Jupyter Auth Docs

This folder contains content for the [Jupyter Auth ReadTheDocs website](https://jupyter-auth.readthedocs.io).

```bash
# Install and build the doc site.
git clone https://github.com/datalayer/jupyter-auth && \
  cd jupyter-auth && \
  pip install -e docs[rtd] && \
  cd docs && \
  make html && \
  open build/html/index.html
```
