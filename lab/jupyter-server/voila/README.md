[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Jupyter Server for Voila

[WIP] Voila as an ExtensionApp [#270](https://github.com/voila-dashboards/voila/pull/270).

+ https://github.com/zsailer/voila/tree/extensionapp

```bash
conda deactivate
conda remove -y --name voila-server --all || true
conda create -y -n voila-server python=3.7 nodejs && \
  conda activate voila-server && \
  git clone https://github.com/jupyter/jupyter_server.git --branch master --single-branch --depth 1 && \
  cd jupyter_server && pip install -e . && cd .. && \
  git clone https://github.com/zsailer/voila.git --branch extensionapp --single-branch --depth 1 && \
  cd voila && pip install -e . && \
  voila notebooks/basics.ipynb
```
```bash
jupyter server --ServerApp.jpserver_extensions="{'voila': True}"
jupyter server --ServerApp.jpserver_extensions="{'notebook': True, 'voila': True}"
```
