#!/usr/bin/env bash

# Copyright (c) Datalayer https://datalayer.io
# Distributed under the terms of the Apache License, Version 2.0
# https://www.apache.org/licenses/LICENSE-2.0.txt

echo -e "\x1b[34m\x1b[43mPort Forward Solr\x1b[0m"

# Port-forward Solr, it will be used by the `library` service.

export SOLR_POD_NAME=$(kubectl get pods -n dla-library -l "app.kubernetes.io/name=solr,app.kubernetes.io/component=server" -o jsonpath="{ .items[0].metadata.name }")
echo http://127.0.0.1:8983
kubectl port-forward -n dla-library $SOLR_POD_NAME 8983:8983
