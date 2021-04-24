# Minihub Docs

This folder contains content for the [Minihub ReadTheDocs website](https://minihub.readthedocs.io).

```bash
# Install and build the doc site.
git clone https://github.com/datalayer/minihub && \
  cd minihub && \e
  pip install -e .[rtd] && \
  cd docs && \
  make html && \
  open build/html/index.html
```
