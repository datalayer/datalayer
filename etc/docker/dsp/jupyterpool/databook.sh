#!/usr/bin/env bash

#  --ServerApp.jpserver_extensions="{'jupyterlab': True}" \
jupyter lab \
  --ip=0.0.0.0 \
  --port=8888 \
  --notebook-dir=$HOME/notebooks \
  --ServerApp.token= \
  --LabApp.base_url=/api/jupyterpool \
  --ServerApp.allow_origin='*' \
  --ServerApp.disable_check_xsrf=True
