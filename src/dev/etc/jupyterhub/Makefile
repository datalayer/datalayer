#!make

# Copyright (c) Datalayer, Inc https://datalayer.io
# Distributed under the terms of the MIT License.

.DEFAULT_GOAL=start-local

.PHONY: clean build push start connect stop rm volumes check-files pull build_image build

help: ## display this help.
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

default: start-local ## default target is start.

# start-docker:
# 	echo open http://localhost:8000/api/jupyterhub
#   jupyterhub -f jupyterhub_config_docker.py

start-local:
	echo open http://localhost:8000/api/jupyterhub
	jupyterhub -f jupyterhub_config.py
