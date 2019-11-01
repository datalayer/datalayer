#!/usr/bin/env bash

# Copyright (c) Datalayer https://datalayer.io
# Distributed under the terms of the Apache License, Version 2.0
# https://www.apache.org/licenses/LICENSE-2.0.txt

# A running jupyterhub server.

echo -e "\x1b[34m\x1b[43mStart JupyterHub\x1b[0m"

start_dev() {
  cd $DLAHOME/etc/dev/jupyterhub && \
    make start
}

start_nodocker() {
  cd $DLAHOME/etc/docker/jupyterhub && \
    make start-nodocker
}

start_local() {
  open http://minikube.datalayer.io.local:8000/jupyterhub && \
    jupyterhub -f \
      $DLAHOME/etc/examples/jupyterhub/keycloak-docker/jupyterhub_config.py
}

start_with_docker() {
#  docker-compose -f jupyterhub.yml up -d && \
#  open http://minikube.datalayer.io.local:8000/jupyterhub
  cd $DLAHOME/etc/docker/jupyterhub && \
    docker-compose -f jupyterhub.yml up
#  docker logs jupyterhub -f
#  docker-compose -f jupyterhub.yml down
}

# start_nodocker
start_dev
