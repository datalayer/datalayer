#!/bin/bash

# Copyright (c) 2023-2024 Datalayer, Inc.
# Distributed under the terms of the Modified BSD License.

# THIS INSTALL IS A WORKAROUND.

"${PREFIX}/bin/pip" install \
  datalayer_core==1.0.29 \
  datalayer_ui==0.3.18 \
  jupyter_iam==1.2.10 \
  jupyter_kernels==1.2.18
