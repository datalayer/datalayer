#!/usr/bin/env bash

# Copyright (c) Datalayer https://datalayer.io
# Distributed under the terms of the Apache License, Version 2.0
# https://www.apache.org/licenses/LICENSE-2.0.txt

sudo apt update
sudo apt install -y awscli jq nginx
sudo systemctl start nginx

cat << EOF >>aws.sh
export AWS_DEFAULT_REGION=eu-west-2
export AWS_ACCESS_KEY_ID=\`curl http://169.254.169.254/latest/meta-data/iam/security-credentials/bastion_role | jq -r ".AccessKeyId"\`
export AWS_SECRET_ACCESS_KEY=\`curl http://169.254.169.254/latest/meta-data/iam/security-credentials/bastion_role | jq -r ".SecretAccessKey"\`
export AWS_SESSION_TOKEN=\`curl http://169.254.169.254/latest/meta-data/iam/security-credentials/bastion_role | jq -r ".Token"\`
EOF

chmod +x aws.sh
