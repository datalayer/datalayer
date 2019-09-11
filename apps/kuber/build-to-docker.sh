#!/usr/bin/env bash

# Copyright (c) Datalayer https://datalayer.io
# Distributed under the terms of the Apache License, Version 2.0
# https://www.apache.org/licenses/LICENSE-2.0.txt

uname_out="$(uname -s)"

case "${uname_out}" in
    Linux*)     export GOOS=linux GOARCH=amd64;;
#    Darwin*)    export GOOS=linux GOARCH=arm;;
    Darwin*)    export GOOS=linux GOARCH=amd64;;
    *)          export OS="UNSUPPORTED:${unameOut}"
esac

go build 
echo kuber has been built.
ls -alp kuber

DIST=${DLAHOME}/docker/kuber/dist
mkdir -p $DIST
mv kuber $DIST
echo kuber has been moved to $DIST
