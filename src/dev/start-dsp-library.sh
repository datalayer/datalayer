#!/usr/bin/env bash

# Copyright (c) Datalayer, Inc https://datalayer.io
# Distributed under the terms of the MIT License.

echo -e "\x1b[34m\x1b[43mStart Library\x1b[0m"

cd $DLAHOME/src/dsp/library && \
  make start
