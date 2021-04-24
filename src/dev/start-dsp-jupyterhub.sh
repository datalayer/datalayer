#!/usr/bin/env bash

# Copyright (c) Datalayer, Inc https://datalayer.io
# Distributed under the terms of the MIT License.

# A running jupyterhub server.

echo -e "\x1b[34m\x1b[43mStart JupyterHub\x1b[0m"

start_without_docker() {
  cd $DLAHOME/etc/docker/jupyterhub && \
    make start-nodocker
}

start_local() {
  open http://minikube.local:8000/jupyterhub && \
    jupyterhub -f \
      $DLAHOME/etc/jupyterhub/keycloak-docker/jupyterhub_config.py
}

# start_with_docker() {
#     docker-compose -f jupyterhub.yml up -d && \
#     open http://minikube.local:8000/jupyterhub
#     cd $DLAHOME/etc/docker/jupyterhub && \
#     docker-compose -f jupyterhub.yml up
#     docker logs jupyterhub -f
# }

start_dev() {
  cd $DLAHOME/src/dev/etc/jupyterhub && \
    make start-local
}

start_dev
