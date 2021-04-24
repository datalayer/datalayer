# Jupyterpool Docs

This folder contains content for the [Jupyterpool ReadTheDocs website](https://jupyterpool.readthedocs.io).

```bash
# Install and build the doc site.
git clone https://github.com/datalayer/jupyterpool && \
  cd jupyterpool && \e
  pip install -e .[rtd] && \
  cd docs && \
  make html && \
  open build/html/index.html
```
