#!/usr/bin/env bash

# Copyright (c) Datalayer https://datalayer.io
# Distributed under the terms of the Apache License, Version 2.0
# https://www.apache.org/licenses/LICENSE-2.0.txt

# A running iam server.

echo -e "\x1b[34m\x1b[43mStart JupyterPool\x1b[0m"

cd $DLAHOME/src/jupyterpool && \
  make start
