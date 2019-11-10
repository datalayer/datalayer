#!/usr/bin/env bash

# Copyright (c) Datalayer https://datalayer.io
# Distributed under the terms of the Apache License, Version 2.0
# https://www.apache.org/licenses/LICENSE-2.0.txt

CUR_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
echo http://localhost:8888
python ${CUR_DIR}/server.py --port=8888
