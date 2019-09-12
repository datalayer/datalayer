#!/usr/bin/env bash

export JUPYTERHUB_SERVICE_PREFIX='/'
export JUPYTERHUB_SERVICE_URL='http://localhost:10000'
export JUPYTERHUB_OAUTH_CALLBACK_URL="$JUPYTERHUB_SERVICE_URL/oauth_callback"

python ./jupyterhub_api_browser.py
