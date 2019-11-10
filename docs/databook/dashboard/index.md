---
title: Dashboard
---

# Dashboard

## JupyterLab Dashboard

+ [Voila](/dashboards/voila.md).
+ [Dash](/dashboards/dash.md).
+ [PyViz](/dashboards/pyviz.md).

Read also.

+ JupyterLab Dashboard [Issue](https://github.com/jupyterlab/jupyterlab/issues/1640).
+ https://github.com/jupyter-widgets/ipywidgets/issues/2018
+ Jupyter Dashboarding - [Thoughts on Voila, Panel and Dash](https://medium.com/informatics-lab/jupyter-dashboarding-some-thoughts-on-voila-panel-and-dash-b84df9c9482f).
+ [Building interactive applications and dashboards](https://conferences.oreilly.com/jupyter/jup-ny-2017/public/schedule/detail/63114) in the Jupyter Notebook ([Video](https://www.youtube.com/watch?v=i40d8-Hu4vM)).
+ https://github.com/jupyter-attic/dashboards_bundlers

## Jupyter Dashboard

Jupyter Dashboards [GitHub](https://github.com/jupyter/dashboards) repository.

Jupyter Dashboards Server [GitHub](https://github.com/jupyter-attic/dashboards_server) repository.

Jupyter Dashboards [Docs](http://jupyter-dashboards-layout.readthedocs.io/en/latest).

```bash
# jupyter nbextension install --py jupyter_dashboards --sys-prefix
# jupyter nbextension enable --py jupyter_dashboards --sys-prefix
pip install jupyter_dashboards
jupyter dashboards quick-setup --sys-prefix
```

```bash
pip install -r requirements-demo.txt
jupyter notebook --notebook-dir=/etc/notebooks
```
