# Copyright (c) Datalayer https://datalayer.io
# Distributed under the terms of the Apache License, Version 2.0
# https://www.apache.org/licenses/LICENSE-2.0.txt

.PHONY: clean build push start connect stop rm

help: ## display this help.
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

default: all ## default target is all.

all: clean install build ## make clean install build.

clean: ## clean.

build-studio: ## build studio
	cd ${DLAHOME}/src/studio && \
		make yarn-install && \
		make yarn-build
		(rm ${DLAHOME}/src/studio/build/static/css/*.map || true) && \
		(rm ${DLAHOME}/src/studio/build/static/js/*.map || true)

build-studio-docker: ## build the docker image.
	cd ${DLAHOME}/src/studio && \
	  docker build \
		  -t datalayer/studio:${DLAVERSION} \
		  .

static-to-s3:
	cd ${DLAHOME}/src/studio && \
		make static-to-s3

build+s3: build-studio static-to-s3 build-studio-docker ## build studio, deploy to s3 and build the docker image.

build: build-studio build-studio-docker

push: ## push the image.
	@exec docker push \
	    datalayer/studio:${DLAVERSION}

start: ## start the container.
	@exec docker run \
	  -it \
	  -d \
	  --rm \
	  --name ui \
	  --env DLA_STUDIO_INDEX_PAGE=${DLA_STUDIO_INDEX_PAGE} \
	  -p 9600:9600 \
	  datalayer/studio:${DLAVERSION}
	@exec open http://localhost:9600?studioRest=http://localhost:9091

connect: ## connect to the container.
	@exec docker exec -it ui bash

logs: ## show container logs
	docker logs studio -f

stop: ## stop the container.
	@exec docker stop studio

rm: ## remove the container.
	@exec docker rm -f studio
