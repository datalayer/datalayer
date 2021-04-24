#!/usr/bin/env bash

export JUPYTERHUB_API_TOKEN=$JUPYTERHUB_API_TOKEN
export JUPYTERHUB_SERVICE_PREFIX='/'
export JUPYTERHUB_SERVICE_URL='http://localhost:10000'
export JUPYTERHUB_OAUTH_CALLBACK_URL="$JUPYTERHUB_SERVICE_URL/oauth_callback"

echo "Starting jupyterhub_api_browser"
echo "open http://localhost:10000"

python ./jupyterhub_api_browser.py
