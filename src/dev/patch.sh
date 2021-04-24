#!/usr/bin/env bash

# Copyright (c) Datalayer, Inc https://datalayer.io
# Distributed under the terms of the MIT License.

echo
echo -e "\x1b[34m\x1b[43mAppling patches where needed...\x1b[0m"
echo
echo -e "\x1b[34mPatching python aiohttp::client.py...\x1b[0m"
sed -i bu -e "s/verify_ssl: Optional\[bool\] = None/verify_ssl: Optional\[bool\] = False/" \
  $(dirname $(which jupyter))/../lib/python3.8/site-packages/aiohttp/client.py
echo -e "\x1b[34m✅ Patch applied.\x1b[0m"
echo
