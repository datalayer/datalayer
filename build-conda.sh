#!/usr/bin/env bash

export DATALAYER_VERSION=1.2.14

CONDA_CHANNEL_NAME=datalayer

# Make sure the script stops on any error (errors are otherwise hard to spot)
set -o errtrace -o nounset -o pipefail -o errexit

mkdir -p ./conda-recipe/out

PKG_PATH=$(conda-build --output-folder ./conda-recipe/out conda-recipe -c defaults)

echo $PKG_PATH generated

# UPLOAD THE PACKAGE TO A CONDA CHANNEL
anaconda upload $PKG_PATH -c $CONDA_CHANNEL_NAME
