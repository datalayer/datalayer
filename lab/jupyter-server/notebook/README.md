[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Classic Notebook as Jupyter Server Extension

[WIP] notebook as a jupyter server extension [notebook#4653](https://github.com/jupyter/notebook/pull/4653)

[Notebook as jupyter_server extension](https://github.com/zsailer/notebook/tree/notebook-ext)

[NbClassic shim](https://github.com/zsailer/nbclassic)

```bash
conda deactivate
conda remove -y --name jupyter-server --all || true
conda create -y -n jupyter-server python=3.7 nodejs && \
  conda activate jupyter-server && \
  git clone https://github.com/jupyter/jupyter_server.git --branch master --single-branch --depth 1 && \
  cd jupyter_server && pip install -e . && cd .. && \
  git clone https://github.com/zsailer/notebook.git --branch notebook-ext --single-branch --depth 1 && \
  cd notebook && pip install -e . && cd .. && \
  jupyter notebook
```

```bash
jupyter server --ServerApp.jpserver_extensions="{'notebook': True}"
```
