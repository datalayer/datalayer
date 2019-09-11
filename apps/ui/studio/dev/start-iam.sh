#!/usr/bin/env bash

# Copyright (c) Datalayer https://datalayer.io
# Distributed under the terms of the Apache License, Version 2.0
# https://www.apache.org/licenses/LICENSE-2.0.txt

# A running iam server.

echo -e "\x1b[34m\x1b[43mStarting IAM\x1b[0m"

# Option 1 - Run from source.
# cd $DLAHOME/apps/iam && \
#   open http://localhost:9700/iam && \
#   make start

# Option 2 - Run with docker.
# cd $DLAHOME/etc/docker/iam && \
#   open http://localhost:9700/iam && \
#   make start

cd $DLAHOME/apps/iam && \
  make start
