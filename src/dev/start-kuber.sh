#!/usr/bin/env bash

# Copyright (c) Datalayer https://datalayer.io
# Distributed under the terms of the Apache License, Version 2.0
# https://www.apache.org/licenses/LICENSE-2.0.txt

# A running kuber server.

echo -e "\x1b[34m\x1b[43mStart Kuber\x1b[0m"

# Option 1 - Run from source.
# cd $DLAHOME/repos/kuber && \
#   open http://localhost:9091/kuber/about/kuber.html && \
#   make start

# Option 2 - Run with docker.
# cd $DLAHOME/etc/docker/kuber && \
#   make start && \
#   sleep 3s && \
#   open http://localhost:9091/kuber/about/kuber.html

cd $DLAHOME/src/k8s/kuber && \
  make start
