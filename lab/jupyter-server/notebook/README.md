[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Classic Notebook as Jupyter Server Extension

- ✋ [Notebook as an ExtensionApp](https://github.com/jupyter/notebook/pull/4653)
- [Notebook as jupyter server extension](https://github.com/zsailer/notebook/tree/notebook-ext)
- [NbClassic Shim](https://github.com/zsailer/nbclassic)

## Install from GitHub

```bash
cd $DLAHOME/lab/jupyter-server/notebook && \
  pip uninstall -y jupyter_server && \
  pip uninstall -y notebook && \
  pip uninstall -y nbclassic && \
  python setup.py develop
```

## Build from Source

```bash
cd $DLAHOME/lab/jupyter-server/notebook && \
  conda deactivate && \
  conda remove -y --name dlab_jserver --all || true && \
  conda create -y -n dlab_jserver python=3.7 nodejs && \
  conda activate dlab_jserver && \
  git clone https://github.com/jupyter/jupyter_server.git --branch master --single-branch --depth 1 && \
  cd jupyter_server && python setup.py develop && cd .. && \
  git clone https://github.com/zsailer/notebook.git --branch notebook-ext --single-branch --depth 1 && \
  cd notebook && python setup.py develop && cd ..
```

## Start

```bash
jupyter notebook
jupyter server --ServerApp.jpserver_extensions="{'notebook': True}"
open http://localhost:8888/tree
```
