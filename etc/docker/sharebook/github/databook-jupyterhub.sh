#!/usr/bin/env bash

jupyter lab \
  --dev-mode \
  --ip 0.0.0.0 \
  --port 8888 \
  --ServerApp.token= \
  --ServerApp.jpserver_extensions="{'jupyterlab': True, 'jupyter_auth': True}" \
  --ServerApp.login_handler_class=jupyter_auth.github.LoginHandler \
  --no-browser \
  --extensions-in-dev-mode
