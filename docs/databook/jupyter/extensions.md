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

## Sys Prefix

```bash
jupyter serverextension --help
--sys-prefix
    Use sys.prefix as the prefix for installing nbextensions (for environments, packaging)
```

```bash
# https://docs.python.org/3/library/sys.html#sys.prefix
sys.prefix

    A string giving the site-specific directory prefix where the platform independent Python files are installed; by default, this is the string '/usr/local'. This can be set at build time with the --prefix argument to the configure script. The main collection of Python library modules is installed in the directory prefix/lib/pythonX.Y while the platform independent header files (all except pyconfig.h) are stored in prefix/include/pythonX.Y, where X.Y is the version number of Python, for example 3.2.

    Note If a virtual environment is in effect, this value will be changed in site.py to point to the virtual environment. The value for the Python installation will still be available, via base_prefix.
```

## Others

+ https://jupyter-contrib-nbextensions.readthedocs.io/en/latest
+ https://github.com/srizzo/jupyter-live-magic
