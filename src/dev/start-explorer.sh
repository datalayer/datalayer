#!/usr/bin/env bash

# Copyright (c) Datalayer https://datalayer.io
# Distributed under the terms of the Apache License, Version 2.0
# https://www.apache.org/licenses/LICENSE-2.0.txt

echo -e "\x1b[34m\x1b[43mStart Explorer\x1b[0m"

cd $DLAHOME/src/dsp/explorer && \
  DLA_EXPLORER_INDEX_PAGE=index.html && \
  open http://localhost:9600/?kuberRest=http://localhost:9091 && \
  python datalayer_explorer/main.py

# cd $DLAHOME/src/dsp/explorer && \
#   make py-start
