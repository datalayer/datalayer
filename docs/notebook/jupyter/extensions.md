---
title: Jupyter Extensions
---

# Jupyter Extensions

Read the [99 ways to extend the Jupyter ecosystem](https://medium.com/@yuvipanda/11e5dab7c54) blog post.

```bash
# serverextension
# An importable Python module that implements `load_jupyter_server_extension`.
jupyter serverextension list
# nbextension
# A notebook extension. A single JS file, or directory of JavaScript, Cascading StyleSheets, etc. that contain at minimum a JavaScript module packaged as an AMD modules that exports a function `load_jupyter_extension`.
jupyter nbextension list
# bundlerextension
# An importable Python module with generated File -> Download as / Deploy as menu item. trigger that implements bundle - Not available for JupyterLab.
jupyter bundlerextension list
```

## Example

```bash
# Pizza Extension.
pip install pizzabutton
jupyter serverextension enable --py pizzabutton --sys-prefix
jupyter nbextension install --py pizzabutton --sys-prefix
jupyter nbextension enable --py pizzabutton --sys-prefix
```

## Others

+ https://jupyter-contrib-nbextensions.readthedocs.io/en/latest
+ https://github.com/srizzo/jupyter-live-magic
