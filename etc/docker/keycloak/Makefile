# Copyright (c) Datalayer https://datalayer.io
# Distributed under the terms of the Apache License, Version 2.0
# https://www.apache.org/licenses/LICENSE-2.0.txt

.PHONY: clean build push start connect stop rm

help: ## display this help.
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

default: all ## default target is all.

all: clean install build ## make clean install build.

clean: ## clean.

build: ## build the image.
	@exec docker build \
		-t datalayer/keycloak:${DLAVERSION} \
		.

push: ## push the image.
	@exec docker push \
	    datalayer/keycloak:${DLAVERSION}

start: ## start the container.
	@exec docker run -it \
		--rm \
		-d \
		--name keycloak \
		-p 8989:8989 \
		datalayer/keycloak:${DLAVERSION}
	@exec open http://localhost:8989/api/doc

logs: ## show container logs
	docker logs keycloak -f

connect: ## connect to the container.
	@exec docker exec -it keycloak bash

stop: ## stop the container.
	@exec docker stop keycloak

rm: ## remove the container.
	@exec docker rm -f keycloak
