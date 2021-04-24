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
		-t ${DLA_DOCKER_REPO}/dsp-solr:${DLAVERSION} \
		.

push: ## push the image.
	@exec docker push \
	    ${DLA_DOCKER_REPO}/dsp-solr:${DLAVERSION}

start: ## start the csolrontainer.
	@exec docker run -it \
		--rm \
		-d \
		--name dsp-solr \
		-p 8989:8989 \
		${DLA_DOCKER_REPO}/dsp-solr:${DLAVERSION}
	@exec open http://localhost:8989/api/doc

logs: ## show container logs.
	docker logs dsp-solr -f

connect: ## connect to the container.
	@exec docker exec -it dsp-solr bash

stop: ## stop the container.
	@exec docker stop dsp-solr

rm: ## remove the container.
	@exec docker rm -f dsp-olr
