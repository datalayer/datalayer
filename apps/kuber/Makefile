# Copyright (c) Datalayer https://datalayer.io
# Distributed under the terms of the Apache License, Version 2.0
# https://www.apache.org/licenses/LICENSE-2.0.txt

.PHONY: clean build dist

default: all ## Default target is all.

help: ## display this help.
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

all: clean install build ## Clean Install and Build

clean:
	rm ./kuber || true

build: ## Build
	@exec go build
	@exec ls -alp kuber

build-to-docker: ## Build for Linux
	@exec ./build-to-docker.sh

install: build ## Install
	@exec cp ./kuber /usr/local/bin

k8s-proxy:
	@exec echo Launching K8S Proxy - open http://localhost:8001
	@exec kubectl proxy

k8s-proxy-d:
	@exec echo Launching K8S Proxy in background - open http://localhost:8001
	@exec kubectl proxy &

start:
	@exec echo open http://localhost:9091/kuber/about/kuber.html
	@exec go run main.go server --apiserver-host=http://localhost:8001

start-80:
	@exec cd $DLAHOME/apps/kuber && \
	  ./kuber \
		server \
		--insecure-bind-address 0.0.0.0 \
		--insecure-port 80 \
		--apiserver-host http://localhost:8001
