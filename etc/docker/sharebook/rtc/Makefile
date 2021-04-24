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
		  -t ${DLA_DOCKER_REPO}/sharebook-rtc:${DLAVERSION} \
		  .

push: ## push the image.
	@exec docker push \
	    ${DLA_DOCKER_REPO}/sharebook-rtc:${DLAVERSION}

start: ## start the container.
	@exec echo open http://localhost:8888/lab
	@exec docker run \
	  -it \
	  --rm \
	  -d \
	  --name sharebook-rtc \
	  -p 8888:8888 \
	  ${DLA_DOCKER_REPO}/sharebook-rtc:${DLAVERSION}

connect: ## connect to the container.
	@exec docker exec -it sharebook-rtc bash

logs: ## show container logs.
	docker logs sharebook-rtc -f

stop: ## stop the container.
	@exec docker stop sharebook-rtc

rm: ## remove the container.
	@exec docker rm -f sharebook-rtc
