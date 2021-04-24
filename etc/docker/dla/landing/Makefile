# Copyright (c) Datalayer, Inc https://datalayer.io
# Distributed under the terms of the MIT License.

.PHONY: clean build push start connect stop rm

help: ## display this help.
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

default: all ## default target is all.

all: clean install build ## make clean install build.

clean: ## clean.

build-landing: ## build landing
	cd ${DLAHOME}/src/dla/landing && \
		make yarn-install && \
		make yarn-build
		(rm ${DLAHOME}/src/dla/landing/build/static/css/*.map || true) && \
		(rm ${DLAHOME}/src/dla/landing/build/static/js/*.map || true)

build-landing-docker: ## build the docker image.
	cd ${DLAHOME}/src && \
	  docker build \
		  -t ${DLA_DOCKER_REPO}/dla-landing:${DLAVERSION} \
		  -f Dockerfile.dla-landing \
		  .

static-to-s3:
	cd ${DLAHOME}/src/src/dla/landing && \
		make static-to-s3

build+s3: build-landing static-to-s3 build-landing-docker ## build landing, deploy to s3 and build the docker image.

# build: build+s3
build: build-landing-docker

push: ## push the image.
	@exec docker push \
	    ${DLA_DOCKER_REPO}/dla-landing:${DLAVERSION}

start: ## start the container.
	@exec docker run \
	  -it \
	  -d \
	  --rm \
	  --name dla-landing \
	  --env DLA_LANDING_INDEX_PAGE=${DLA_LANDING_INDEX_PAGE} \
	  -p 9600:9600 \
	  ${DLA_DOCKER_REPO}/dla-landing:${DLAVERSION}
	@exec open http://localhost:9600?landingRest=http://localhost:9091

connect: ## connect to the container.
	@exec docker exec -it dla-landing bash

logs: ## show container logs.
	docker logs dla-landing -f

stop: ## stop the container.
	@exec docker stop dla-landing

rm: ## remove the container.
	@exec docker rm -f dla-landing
