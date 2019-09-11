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
		-t datalayer/jupyterlab-datalayer:${DLAVERSION} \
		.

push: ## push the image.
	@exec docker push \
	    datalayer/jupyterlab-datalayer:${DLAVERSION}

start: ## start the container.
	@exec docker run -it \
	    -e DLA_GITHUB_TOKEN=${DLA_GITHUB_TOKEN} \
		-e DLA_TWITTER_OAUTH_REDIRECT=http://localhost:8888 \
		-e DLA_TWITTER_CONSUMER_KEY=${DLA_TWITTER_CONSUMER_KEY} \
		-e DLA_TWITTER_CONSUMER_SECRET=${DLA_TWITTER_CONSUMER_SECRET} \
		-e DLA_TWITTER_OAUTH_CALLBACK_URL=${DLA_TWITTER_OAUTH_CALLBACK_URL} \
		-e JUPYTER_ENABLE_LAB=true \
		--rm \
		-d \
		--name jupyterlab-datalayer \
		-p 8888:8888 \
		datalayer/jupyterlab-datalayer:${DLAVERSION}
	@exec sleep 1s
	make token
	make logs

connect: ## connect to the container.
	@exec docker exec -it jupyterlab-datalayer bash

token: ## get the notebook token(s).
	@exec docker exec -it jupyterlab-datalayer jupyter notebook list

logs: ## show container logs
	docker logs jupyterlab-datalayer -f

attach:
	docker exec -it jupyterlab-datalayer bash

stop: ## stop the container.
	@exec docker stop jupyterlab-datalayer

rm: ## remove the container.
	@exec docker rm -f jupyterlab-datalayer
 