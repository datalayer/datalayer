#!/usr/bin/env bash

# Copyright (c) Datalayer https://datalayer.io
# Distributed under the terms of the Apache License, Version 2.0
# https://www.apache.org/licenses/LICENSE-2.0.txt

yarn install

###############################################################################
# Fix @types/react to avoid npm_doppelgangers.
# Read more on https://rushjs.npio/pages/advanced/npm_doppelgangers
###############################################################################

rm -fr node_modules/@datalayer-jupyterlab/kuber/node_modules/@types/react
# cp -r node_modules/@types/react node_modules/@datalayer-jupyterlab/kuber/node_modules/@types

# rm node_modules/@types/react-dom/node_modules/@types/react/*
# cp node_modules/@types/react/* node_modules/@types/react-dom/node_modules/@types/react/

# rm node_modules/@types/react-test-renderer/node_modules/@types/react/*
# cp node_modules/@types/react/* node_modules/@types/react-test-renderer/node_modules/@types/react/

# rm node_modules/@types/react-grid-layout/node_modules/@types/react/*
# cp node_modules/@types/react/* node_modules/@types/react-grid-layout/node_modules/@types/react/
