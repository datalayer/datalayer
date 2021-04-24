#!make

# Copyright (c) Datalayer, Inc https://datalayer.io
# Distributed under the terms of the MIT License.

.DEFAULT_GOAL=build

.PHONY: clean build push start connect stop rm volumes check-files pull build_image build

help: ## display this help.
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

default: all ## default target is all.

all: clean install build ## make clean install build.

clean: ## clean.

build:
	@exec docker build \
		-t ${DLA_DOCKER_REPO}/dsp-jupyterhub-hub:${DLAVERSION} \
		.

start:
	@exec echo open http://localhost:8000
	@exec docker run \
	  -it \
	  -p 8000:8000 \
	  --rm \
	  --name dsp-jupyterhub-hub \
	  ${DLA_DOCKER_REPO}/dsp-jupyterhub-hub:${DLAVERSION}

pull:
	@exec docker pull ${DLA_DOCKER_REPO}/dsp-jupyterhub-hub:${DLAVERSION}

push:
	@exec docker push ${DLA_DOCKER_REPO}/dsp-jupyterhub-hub:${DLAVERSION}

logs: ## show container logs.
	@exec docker logs dsp-jupyterhub-hub -f

connect: ## connect to the container.
	@exec docker exec -it dsp-jupyterhub-hub bash

stop: ## stop the container.
	@exec docker stop dsp-jupyterhub-hub

rm: ## remove the container.
	@exec docker rm -f dsp-jupyterhub-hub
