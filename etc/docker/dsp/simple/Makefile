# Copyright (c) Datalayer, Inc https://datalayer.io
# Distributed under the terms of the MIT License.

.PHONY: clean build push start connect stop rm

help: ## display this help.
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

default: all ## default target is all.

all: clean install build ## make clean install build.

clean: ## clean.

build: ## build the image.
	@exec docker build \
		-t ${DLA_DOCKER_REPO}/dsp-simple:${DLAVERSION} \
		.

push: ## push the image.
	@exec docker push \
	    ${DLA_DOCKER_REPO}/dsp-simple:${DLAVERSION}

start: ## start the container.
	@exec docker run -p 9876:9876 \
	    --name dsp-simple \
	    --rm \
	    -it \
	    -d \
	    ${DLA_DOCKER_REPO}/dsp-simple:${DLAVERSION}
	@exec echo open http://localhost:9876/info
	@exec echo open http://localhost:9876/env
	@exec echo open http://localhost:9876/health
	@exec echo open http://localhost:9876/endpoint0

start-local: ## start the container.
	@exec open http://localhost:9876/info
	@exec python simple/simple.py

connect: ## connect to the container.
	@exec docker exec -it dsp-simple bash

stop: ## stop the container.
	@exec docker stop dsp-simple

rm: ## remove the container.
	@exec docker rm -f dsp-simple
