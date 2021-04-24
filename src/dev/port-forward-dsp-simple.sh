#!/usr/bin/env bash

# Copyright (c) Datalayer, Inc https://datalayer.io
# Distributed under the terms of the MIT License.

echo -e "\x1b[34m\x1b[43mDSP K8S Port Forward Simple\x1b[0m"

# Port-forward Simple

export POD_NAME=$(kubectl get pods --namespace dsp-simple -l "app=simple" -o jsonpath="{ .items[0].metadata.name }")

echo open http://localhost:9876/info

kubectl port-forward -n dsp-simple $POD_NAME 9876:9876
