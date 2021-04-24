#!/usr/bin/env bash

# Copyright (c) Datalayer, Inc https://datalayer.io
# Distributed under the terms of the MIT License.

echo -e "\x1b[34m\x1b[43mStart Studio\x1b[0m"

#   make py-start
cd $DLAHOME/src/dsp/studio && \
  make watch
