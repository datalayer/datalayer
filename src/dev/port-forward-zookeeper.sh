#!/usr/bin/env bash

# Copyright (c) Datalayer https://datalayer.io
# Distributed under the terms of the Apache License, Version 2.0
# https://www.apache.org/licenses/LICENSE-2.0.txt

echo -e "\x1b[34m\x1b[43mPort Forward Zookeeper\x1b[0m"

# Port-forward Zookeeper, it will be used by the `library` service.

export ZK_POD_NAME=$(kubectl get pods -n dla-library -l "app=zookeeper,component=server" -o jsonpath="{ .items[0].metadata.name }")
kubectl port-forward -n dla-library $ZK_POD_NAME 2181:2181
