---
title: Jupyter Development
---

# Jupyter Development

```bash
pip install --upgrade setuptools
npm run build
# npm run build:watch
pip install -e .
```

```bash
# Tests
pip install -e .[test]
nosetests --with-coverage --cover-package=notebook notebook
npm install -g casperjs phantomjs-prebuilt
python -m notebook.jstest notebook
```
