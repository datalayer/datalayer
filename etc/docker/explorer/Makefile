# Copyright (c) Datalayer https://datalayer.io
# Distributed under the terms of the Apache License, Version 2.0
# https://www.apache.org/licenses/LICENSE-2.0.txt

.PHONY: clean build push start connect stop rm

help: ## display this help.
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

default: all ## default target is all.

all: clean install build ## make clean install build.

clean: ## clean.

build-explorer: ## build explorer
	cd ${DLAHOME}/src/dsp/explorer && \
		make yarn-install && \
		make yarn-build
		(rm ${DLAHOME}/src/dsp/explorer/build/static/css/*.map || true) && \
		(rm ${DLAHOME}/src/dsp/explorer/build/static/js/*.map || true)

build-explorer-docker: ## build the docker image.
	cd ${DLAHOME}/src/dsp/explorer && \
	  docker build \
		  -t datalayer/explorer:${DLAVERSION} \
		  .

static-to-s3:
	cd ${DLAHOME}/src/dsp/explorer && \
		make static-to-s3

build+s3: build-explorer static-to-s3 build-explorer-docker ## build explorer, deploy to s3 and build the docker image.

build: build-explorer build-explorer-docker

push: ## push the image.
	@exec docker push \
	    datalayer/explorer:${DLAVERSION}

start: ## start the container.
	@exec docker run \
	  -it \
	  -d \
	  --rm \
	  --name ui \
	  --env DLA_EXPLORER_INDEX_PAGE=${DLA_EXPLORER_INDEX_PAGE} \
	  -p 9600:9600 \
	  datalayer/explorer:${DLAVERSION}
	@exec open http://localhost:9600?explorerRest=http://localhost:9091

connect: ## connect to the container.
	@exec docker exec -it ui bash

logs: ## show container logs
	docker logs explorer -f

stop: ## stop the container.
	@exec docker stop explorer

rm: ## remove the container.
	@exec docker rm -f explorer
