#!/bin/bash

# Copyright (c) 2023-2024 Datalayer, Inc.
# Distributed under the terms of the Modified BSD License.

# THIS INSTALL IS A WORKAROUND.

"${PREFIX}/bin/pip" install \
  datalayer_ui==0.3.14 \
  datalayer_core==1.0.25 \
  jupyter_iam==1.2.8 \
  jupyter_kernels==1.2.16
