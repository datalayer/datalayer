#!/usr/bin/env bash

jupyter lab \
  --ip 0.0.0.0 \
  --port 8888 \
  --ServerApp.token= \
  --ServerApp.jpserver_extensions="{'jupyterlab': True}" \
  --no-browser
