#!/usr/bin/env bash

# Copyright (c) Datalayer, Inc https://datalayer.io
# Distributed under the terms of the MIT License.

echo
echo -e "\x1b[34m\x1b[43mServing dist - Version $DLAVERSION\x1b[0m"
echo
echo ✨ open http://localhost:4322
echo

# http-server . -p 4322
cd $DLAHOME/src/dist && \
  python -m http.server 4322
