# Copyright (c) Datalayer https://datalayer.io
# Distributed under the terms of the Apache License, Version 2.0
# https://www.apache.org/licenses/LICENSE-2.0.txt

.PHONY: clean build push start connect stop rm

help: ## display this help.
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

default: all ## default target is all.

all: clean install build ## make clean install build.

clean: ## clean.

build-kuber:
	@exec cd ${DLAHOME}/src/k8s/kuber && make build-to-docker

build: build-kuber ## build the image.
	@exec docker build \
		-t datalayer/kuber:${DLAVERSION} \
		.

push: ## push the image.
	@exec docker push \
	    datalayer/kuber:${DLAVERSION}
		
start: ## start the container.
	@exec echo open http://localhost:9091
	@exec docker run -it \
		-d \
		--rm \
		--name kuber \
		--env APISERVER_HOST=http://localhost:8001 \
		-v ~/.datalayer:/root/.datalayer \
		-p 9091:9091 \
		datalayer/kuber:${DLAVERSION}

connect: ## connect to the container.
	@exec docker exec -it kuber bash

logs: ## show container logs
	docker logs kuber -f

stop: ## stop the container.
	@exec docker stop kuber

rm: ## remove the container.
	@exec docker rm -f kuber
