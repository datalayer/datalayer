# Copyright (c) Datalayer, Inc https://datalayer.io
# Distributed under the terms of the MIT License.

.PHONY: clean build push start connect stop rm

help: ## display this help.
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

default: all ## default target is all.

all: clean install build ## make clean install build.

clean: ## clean.

build: ## build the image.
	cd ${DLAHOME}/src/dsp && \
	  docker build \
		  -t ${DLA_DOCKER_REPO}/dsp-library:${DLAVERSION} \
		  -f Dockerfile.library \
		  .

push: ## push the image.
	@exec docker push \
	    ${DLA_DOCKER_REPO}/dsp-library:${DLAVERSION}

start: ## start the container.
	@exec docker run \
	  -it \
	  -d \
	  --name dsp-library \
	  -p 9700:9700 \
	  ${DLA_DOCKER_REPO}/dsp-library:${DLAVERSION}
	echo open http://localhost:9700/api/library/version

connect: ## connect to the container.
	@exec docker exec -it dsp-library bash

logs: ## show container logs.
	docker logs dsp-library -f

stop: ## stop the container.
	@exec docker stop dsp-library

rm: ## remove the container.
	@exec docker rm -f dsp-library
