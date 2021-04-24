[![Datalayer](https://raw.githubusercontent.com/datalayer/datalayer/master/res/logo/datalayer-25.svg?sanitize=true)](https://datalayer.io)

# Datalayer Docs

This folder contains content for the [Datalayer ReadTheDocs website](https://datalayer.readthedocs.io).

```bash
# Install and build the doc site.
git clone https://github.com/datalayer/datalayer && \
  cd datalayer && \
  pip install -e src[rtd] && \
  cd docs && \
  make html && \
  open build/html/index.html
```
