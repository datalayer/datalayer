#!/usr/bin/env bash

# Copyright (c) Datalayer https://datalayer.io
# Distributed under the terms of the Apache License, Version 2.0
# https://www.apache.org/licenses/LICENSE-2.0.txt

if [ -z "$1" ]
then
  export FLAVOR=2.4
else
  export FLAVOR=$1
fi

dla spark-docker-push $FLAVOR
