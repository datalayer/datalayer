# Copyright (c) Datalayer, Inc https://datalayer.io
# Distributed under the terms of the MIT License.

.PHONY: clean build push start connect stop rm

help: ## display this help.
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

default: all ## default target is all.

all: clean install build ## make clean install build.

clean: ## clean.

build-studio: ## build studio
	cd ${DLAHOME}/src/dsp/studio && \
		make yarn-install && \
		make yarn-build
		(rm ${DLAHOME}/src/dsp/studio/build/static/css/*.map || true) && \
		(rm ${DLAHOME}/src/dsp/studio/build/static/js/*.map || true)

build-studio-docker: ## build the docker image.
	cd ${DLAHOME}/src/dsp && \
	  docker build \
		  -t ${DLA_DOCKER_REPO}/dsp-studio:${DLAVERSION} \
		  -f Dockerfile.studio \
		  .

static-to-s3:
	cd ${DLAHOME}/src/dsp/studio && \
		make static-to-s3

build+s3: build-studio static-to-s3 build-studio-docker ## build studio, deploy to s3 and build the docker image.

# build: build+s3
build: build-studio-docker

push: ## push the image.
	@exec docker push \
	    ${DLA_DOCKER_REPO}/dsp-studio:${DLAVERSION}

start: ## start the container.
	@exec docker run \
	  -it \
	  -d \
	  --rm \
	  --name dsp-studio \
	  --env DSP_STUDIO_INDEX_PAGE=${DSP_STUDIO_INDEX_PAGE} \
	  -p 9600:9600 \
	  ${DLA_DOCKER_REPO}/dsp-studio:${DLAVERSION}
	@exec open http://localhost:9600?studioRest=http://localhost:9091

connect: ## connect to the container.
	@exec docker exec -it dsp-studio bash

logs: ## show container logs.
	docker logs dsp-studio -f

stop: ## stop the container.
	@exec docker stop dsp-studio

rm: ## remove the container.
	@exec docker rm -f dsp-studio
