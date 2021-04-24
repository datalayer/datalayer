#!/usr/bin/env bash

# Copyright (c) Datalayer, Inc https://datalayer.io
# Distributed under the terms of the MIT License.

echo -e "\x1b[34m\x1b[43mDSP K8S Port Forward Zookeeper\x1b[0m"

# Port-forward Zookeeper, it will be used by the `auth`and `library` services.

export ZK_POD_NAME=$(kubectl get pods -n dsp-solr -l "app=zookeeper,component=server" -o jsonpath="{ .items[0].metadata.name }")

kubectl port-forward -n dsp-solr --address 0.0.0.0 $ZK_POD_NAME 2181:2181
