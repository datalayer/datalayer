#!/usr/bin/env bash

# Copyright (c) Datalayer https://datalayer.io
# Distributed under the terms of the Apache License, Version 2.0
# https://www.apache.org/licenses/LICENSE-2.0.txt

echo -e "\x1b[34m\x1b[43mPort Forward LDAP\x1b[0m"

# Port-forward LDAP

export POD_NAME=$(kubectl get pods --namespace dla-iam -l "app=openldap" -o jsonpath="{ .items[0].metadata.name }")
sudo kubectl port-forward -n dla-iam $POD_NAME 389:389
