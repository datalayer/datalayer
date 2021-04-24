#!/usr/bin/env bash

# Copyright (c) Datalayer, Inc https://datalayer.io
# Distributed under the terms of the MIT License.

# A running auth server.

echo -e "\x1b[34m\x1b[43mStart AUTH\x1b[0m"

# Option 1 - Run from source.
# cd $DLAHOME/api/auth && \
#   open http://minikube.local:9700/auth && \
#   make start

# Option 2 - Run with docker.
# cd $DLAHOME/etc/docker/auth && \
#   open http://minikube.local:9700/auth && \
#   make start

cd $DLAHOME/src/dsp/auth && \
  make start
