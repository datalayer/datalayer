#!/usr/bin/env bash

# Copyright (c) Datalayer, Inc https://datalayer.io
# Distributed under the terms of the MIT License.

jupyter lab \
    --notebook-dir=~/notebooks \
    --ServerApp.token= \
    --ServerApp.allow_origin='*' \
    --ServerApp.disable_check_xsrf=True \
    --no-browser
