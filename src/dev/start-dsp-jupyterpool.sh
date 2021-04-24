#!/usr/bin/env bash

# Copyright (c) Datalayer, Inc https://datalayer.io
# Distributed under the terms of the MIT License.

# A running auth server.

echo -e "\x1b[34m\x1b[43mStart JupyterPool Server\x1b[0m"

cd $DLAHOME/src/jupyter/server/pool && \
  make start
