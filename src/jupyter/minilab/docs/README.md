# Minilab Docs

This folder contains content for the [Minilab ReadTheDocs website](https://minilab.readthedocs.io).

```bash
# Install and build the doc site.
git clone https://github.com/datalayer/minilab && \
  cd minilab && \
  pip install -e .[rtd] && \
  cd docs && \
  make html && \
  open build/html/index.html
```
