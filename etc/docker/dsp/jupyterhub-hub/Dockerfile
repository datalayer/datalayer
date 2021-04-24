# Copyright (c) Datalayer, Inc https://datalayer.io
# Distributed under the terms of the MIT License.

FROM jupyterhub/k8s-hub:0.11.1

# USER root
# RUN mkdir -p /usr/local/etc/jupyterhub && \
#   touch /usr/local/etc/jupyterhub/jupyterhub_config.py
# USER ${NB_USER}

USER root

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      npm \
      && \
    rm -rf /var/lib/apt/lists/*

USER ${NB_USER}

WORKDIR /home/jovyan

RUN pip uninstall -y jupyterhub

RUN git clone https://github.com/datalayer-contrib/jupyterhub --depth 1 --branch master && \
  cd jupyterhub && \
  pip install -e .

WORKDIR /srv/jupyterhub
