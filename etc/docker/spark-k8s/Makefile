#!make

.DEFAULT_GOAL=build

.PHONY: build

help: ## display this help.
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

default: build ## default target is all.

build:
	@exec docker build \
		-t datalayer/spark-k8s:0.0.1 \
		.

push: build
	docker push datalayer/spark-k8s:0.0.1
