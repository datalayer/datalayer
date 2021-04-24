#!/usr/bin/env bash

# Copyright (c) Datalayer, Inc https://datalayer.io
# Distributed under the terms of the MIT License.

echo -e "\x1b[34m\x1b[43mDSP K8S Port Forward Solr\x1b[0m"

# Port-forward Solr, it will be used by the `àuth` and `library` services.

export SOLR_POD_NAME=$(kubectl get pods -n dsp-solr -l "app.kubernetes.io/name=solr,app.kubernetes.io/component=server" -o jsonpath="{ .items[0].metadata.name }")

echo open http://localhost:8983

kubectl port-forward -n dsp-solr --address 0.0.0.0 $SOLR_POD_NAME 8983:8983
