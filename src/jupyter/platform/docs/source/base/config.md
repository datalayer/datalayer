---
title: Jupyter Config
---

# Jupyter Config

Jupyter Config [Docs](https://jupyter.readthedocs.io/en/latest/projects/config.html).

- Trailets [GitHub](https://github.com/ipython/traitlets) repository.
- Traitlets [Docs](https://traitlets.readthedocs.io/en/latest).
- Traitlets Config [Docs](https://traitlets.readthedocs.io/en/latest/config.html).

- [Jupyter's configuration system](https://www.youtube.com/watch?v=_gYEVTaNuKU)

## Config

```bash
jupyter notebook --conf jupyter_notebook_config.py
```

## Paths

[Jupyter Directories](https://jupyter.readthedocs.io/en/latest/projects/jupyter-directories.html).

- JUPYTER_CONFIG_DIR: for config file location
- JUPYTER_PATH: for datafile directory locations
- JUPYTER_DATA_DIR: for data file location
- JUPYTER_RUNTIME_DIR: for runtime file location

```bash
jupyter --paths
```

```bash
jupyter --runtime-dir
```

```python
import jupyter_core.paths in Python
```

```javascript
var jp = require('jupyter-paths')
```

## CORS

```python
# jupyter_notebook_config.py
c.NotebookApp.allow_origin = '*'
```
