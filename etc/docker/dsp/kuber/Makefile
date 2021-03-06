# Copyright (c) Datalayer, Inc https://datalayer.io
# Distributed under the terms of the MIT License.

.PHONY: clean build push start connect stop rm

help: ## display this help.
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

default: all ## default target is all.

all: clean install build ## make clean install build.

clean: ## clean.

build-kuber:
	@exec cd ${DLAHOME}/repos/kuber-go && make build-to-docker

build: build-kuber ## build the image.
	@exec docker build \
		-t ${DLA_DOCKER_REPO}/dsp-kuber:${DLAVERSION} \
		.

push: ## push the image.
	@exec docker push \
	    ${DLA_DOCKER_REPO}/dsp-kuber:${DLAVERSION}
		
start: ## start the container.
	@exec echo open http://localhost:9091/api/kuber/version
	@exec docker run -it \
		-d \
		--rm \
		--name dsp-kuber \
		--env APISERVER_HOST=http://localhost:8001 \
		-v ~/.datalayer:/root/.datalayer \
		-p 9091:9091 \
		${DLA_DOCKER_REPO}/dsp-kuber:${DLAVERSION}

connect: ## connect to the container.
	@exec docker exec -it dsp-kuber bash

logs: ## show container logs.
	docker logs dsp-kuber -f

stop: ## stop the container.
	@exec docker stop dsp-kuber

rm: ## remove the container.
	@exec docker rm -f dsp-kuber
