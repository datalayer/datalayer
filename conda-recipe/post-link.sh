#!/bin/bash

# Copyright (c) 2023-2024 Datalayer, Inc.
# Distributed under the terms of the Modified BSD License.

"${PREFIX}/bin/pip" install \
  datalayer_core==1.0.33 \
  datalayer_ui==1.0.14 \
  jupyter_iam==1.2.12 \
  jupyter_kernels==1.2.20
