# Copyright (c) Datalayer https://datalayer.io
# Distributed under the terms of the Apache License, Version 2.0

.PHONY: help storybook

default: help ## default target is help

help: ## display this help
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

all: clean install build storybook

clean: ## deletes node_modules, lib, build... folders and other generated info, lock, log... files
	find . -name node_modules | xargs rm -fr {} || true
	find . -name lib | xargs rm -fr {} || true
	find . -name build | xargs rm -fr {} || true
	find . -name yarn.lock | xargs rm {} || true
	find . -name yarn-error.log | xargs rm {} || true
	find . -name tsconfig.tsbuildinfo | xargs rm {} || true

install: ## Install yarn dependencies and link the theme from the storybook
	yarn install

build: ## build all modules
	yarn build

storybook: ## start the storybook
	yarn storybook

deploy: ## deploy the storybook
	vercel --prod
