#!/usr/bin/env bash

# Copyright (c) Datalayer https://datalayer.io
# Distributed under the terms of the Apache License, Version 2.0
# https://www.apache.org/licenses/LICENSE-2.0.txt

CUR_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

for f in *.diff
do
  cd $DLAHOME/repos/jupyterhub
  echo $f
  git apply $CUR_DIR/$f
done
