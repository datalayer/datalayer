#!/usr/bin/env bash

# Copyright (c) Datalayer, Inc https://datalayer.io
# Distributed under the terms of the MIT License.

echo -e "\x1b[34m\x1b[43mDSP K8S Port Forward LDAP\x1b[0m"

# Port-forward LDAP

export POD_NAME=$(kubectl get pods --namespace dsp-ldap -l "app=openldap" -o jsonpath="{ .items[0].metadata.name }")

kubectl port-forward -n dsp-ldap $POD_NAME 3899:389
