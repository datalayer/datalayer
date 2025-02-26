#!/bin/bash
# Copyright (c) 2023-2024 Datalayer, Inc.
# Distributed under the terms of the Modified BSD License.


# THIS SCRIPT IS A WORKAROUND BECAUSE THE DEPENDENCIES ARE NOT AVAILABLE IN ANY CONDA CHANNEL.

"${PREFIX}/bin/pip" install datalayer_core==1.0.23 jupyter_iam==1.2.6 jupyter_kernels==1.2.13
