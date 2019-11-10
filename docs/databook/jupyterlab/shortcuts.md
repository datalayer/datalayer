---
title: JupyterLab Shortcuts
---

# JupyterLab Shortcuts

## Keyboard Shortcuts

Select `Settings`, then `Advanced Settings Editor` then `Keyboard Shortcut`.

Copy/Paste the following json in the `User Preferences` panel (on the right).

```json
{
  "shortcuts": [
      {
         "command": "runmenu:run-all",
         "keys": [
            "Ctrl R"
         ],
         "selector": "[data-jp-code-runner]",
         "title": "Run All Cells",
         "category": "Run Menu"
       },
      {
         "command": "notebook:move-cell-up",
         "keys": [
            "Ctrl U"
         ],
         "selector": "[data-jp-code-runner]",
         "title": "Move Cell Up",
         "category": "Run Menu"
       },
      {
         "command": "notebook:move-cell-down",
         "keys": [
            "Ctrl D"
         ],
         "selector": "[data-jp-code-runner]",
         "title": "Move Cell Down",
         "category": "Run Menu"
       },
      ]
}
```

[Document keyboard shortcuts](https://github.com/jupyterlab/jupyterlab/issues/2976).

```bash
# https://blog.ja-ke.tech/2019/01/20/jupyterlab-shortcuts.html
# https://raw.githubusercontent.com/Jakeler/jupyter-shortcuts/master/outputs/Shortcuts.png
# https://raw.githubusercontent.com/Jakeler/jupyter-shortcuts/master/outputs/Shortcuts.pdf
git clone https://github.com/jakeler/jupyter-shortcuts && \
  cd jupyter-shortcuts && \
  yarn install && \
  open http://0.0.0.0:3000 && \
  yarn start-default
```

For Jupyter Notebook.

```javascript
%%javascript
Jupyter.keyboard_manager.command_shortcuts.add_shortcut('r', {
    help : 'run all cells',
    help_index : 'zz',
    handler : function (event) {
        IPython.notebook.execute_all_cells();
        return false;
    }}
);
```
