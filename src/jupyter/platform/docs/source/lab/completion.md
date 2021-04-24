---
title: JupyterLab Completion
---

# JupyterLab Completion

## Built-In

- Simply hit the `Tab` key while writing code
- This will open a menu with suggestions
- Hit `Enter` to choose the suggestion

Tab completion (activated with the `Tab` key) can now include additional information about the types of the matched items.

Note: IPython 6.3.1 has temporarily disabled type annotations. To re-enable them, add c.Completer.use_jedi = True to an ipython_config.py file.

## Jedi

- https://github.com/jupyterlab/jupyterlab/issues/9620#issuecomment-766860053

```bash
pip install "jedi==0.17.2"
```

## Hover

The tooltip activated with `SHIFT+TAB` contains additional information about objects.

## LSP

- https://github.com/krassowski/jupyterlab-lsp
- https://jupyterlab-lsp.readthedocs.io/en/latest

```bash
# With JupyterLab 3.x
pip install jupyter-lsp
# conda install -c conda-forge r-languageserver
# conda install -c conda-forge python-language-server
pip install python-language-server[all]
# R -e 'install.packages("languageserver")'
jupyter lab
```

```bash
# With JupyterLab 2.x
# conda install jupyterlab=2.3.0 -c conda-forge/label/jupyterlab_rc
# conda create -n jlabrc jupyterlab=2.3.0 -c conda-forge/label/jupyterlab_rc
# conda activate jlabrc
jupyter labextension install @krassowski/jupyterlab-lsp
jupyter serverextension \
    enable --sys-prefix --py \
    jupyter_lsp && \
  jupyter serverextension list
```

Features:

- Hover: Hover over any piece of code; if an underline appears, you can press Ctrl to get a tooltip with function/class signature, module documentation or any other piece of information that the language server provides
- Diagnostics: Critical errors have red underline, warnings are orange, etc. Hover over the underlined code to see a more detailed message
- Jump to Definition: Use the context menu entries to jump to definitions
- Highlight References: Place your cursor on a variable, function, etc and all the usages will be highlighted
- Automatic Completion: Certain characters, for example '.' (dot) in Python, will automatically trigger completion
- Automatic Signature Suggestions: Function signatures will automatically be displayed
- Kernel-less Autocompletion: Advanced static-analysis autocompletion without a running kernel. When a kernel is available the suggestions from the kernel (such as keys of a dict and columns of a DataFrame autocompletion) are merged with the suggestions from the Language Server (currently only in notebook).
- Rename variables, functions and more, in both: notebooks and the file editor. Use the context menu option or the F2 shortcut to invoke.
- Diagnostics panel: Sort and jump between the diagnostics using the diagnostics panel. Open it searching for "Show diagnostics panel" in JupyterLab commands palette or from the context menu.

## Kite

- https://github.com/kiteco/jupyterlab-kite

## Tabnine

- https://github.com/codota/jupyter-tabnine
