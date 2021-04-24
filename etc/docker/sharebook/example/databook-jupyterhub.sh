#!/usr/bin/env bash

cd /jupyter/externals/jupyterlab/examples/notebook && \
  python main.py \
  --ServerApp.base_url=${JUPYTERHUB_SERVICE_PREFIX} \
  --no-browser
