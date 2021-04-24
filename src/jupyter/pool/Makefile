# Copyright (c) Datalayer https://datalayer.io
# Distributed under the terms of the Apache License, Version 2.0

SHELL=/bin/bash

CONDA=source $$(conda info --base)/etc/profile.d/conda.sh
CONDA_ACTIVATE=source $$(conda info --base)/etc/profile.d/conda.sh ; conda activate ; conda activate
CONDA_DEACTIVATE=source $$(conda info --base)/etc/profile.d/conda.sh ; conda deactivate
CONDA_REMOVE=source $$(conda info --base)/etc/profile.d/conda.sh ; conda remove -y --all -n

.PHONY: help storybook

default: help ## default target is help

env: ## create an environment
	($(CONDA); \
		conda deactivate && \
			conda remove -y --all -n jupyterpool && \
		conda env create -f environment.yml )

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
	($(CONDA_ACTIVATE) jupyterpool; \
		yarn install )

build: ## build all modules
	($(CONDA_ACTIVATE) jupyterpool; \
		yarn build )

storybook: ## start the storybook
	($(CONDA_ACTIVATE) jupyterpool; \
		yarn storybook )

storybook-build: ## build the storybook
	($(CONDA_ACTIVATE) jupyterpool; \
		rm -fr storybook/.out/* && \
		yarn build:vercel && \
		open storybook/.out/index.html )

storybook-prod: ## deploy the storybook
	($(CONDA_ACTIVATE) jupyterpool; \
		npx vercel --prod )
