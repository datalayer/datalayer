#!/usr/bin/env bash

jupyter lab \
  --notebook-dir=~/notebooks \
  --ServerApp.token= \
  --ServerApp.allow_origin='*' \
  --ServerApp.disable_check_xsrf=True \
  --no-browser
