#!/usr/bin/env bash

# Copyright (c) Datalayer https://datalayer.io
# Distributed under the terms of the Apache License, Version 2.0
# https://www.apache.org/licenses/LICENSE-2.0.txt

docker run -p 8889:8889 --rm -it datalayer/enterprisegateway:${DLAVERSION}
docker run -p 8889:8889 --rm -it datalayer/enterprisegateway:${DLAVERSION} bash
