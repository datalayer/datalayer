# Copyright (c) Datalayer https://datalayer.io
# Distributed under the terms of the Apache License, Version 2.0
# https://www.apache.org/licenses/LICENSE-2.0.txt

SHELL=/bin/bash

CONDA=source $$(conda info --base)/etc/profile.d/conda.sh
CONDA_ACTIVATE=source $$(conda info --base)/etc/profile.d/conda.sh ; conda activate ; conda activate
CONDA_DEACTIVATE=source $$(conda info --base)/etc/profile.d/conda.sh ; conda deactivate
CONDA_REMOVE=source $$(conda info --base)/etc/profile.d/conda.sh ; conda remove -y --all -n

.PHONY: help storybook

all: clean install build storybook

build: ## build all modules
	($(CONDA_ACTIVATE) jupyter-react; \
		yarn build )

clean: ## deletes node_modules, lib, build... folders and other generated info, lock, log... files
	find . -name node_modules | xargs rm -fr {} || true
	find . -name lib | xargs rm -fr {} || true
	find . -name build | xargs rm -fr {} || true
	find . -name yarn.lock | xargs rm {} || true
	find . -name yarn-error.log | xargs rm {} || true
	find . -name tsconfig.tsbuildinfo | xargs rm {} || true

default: help ## default target is help

env: ## create a conda environment
	($(CONDA); \
		conda deactivate && \
			conda remove -y --all -n jupyter-react && \
		conda env create -f environment.yml )

help: ## display this help
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

install: ## Install yarn dependencies and link the theme from the storybook
	($(CONDA_ACTIVATE) jupyter-react; \
		yarn install )

jupyterlab: ## Start JupyterLab
	($(CONDA_ACTIVATE) jupyter-react; \
		jupyter lab \
			--notebook-dir=~/notebooks \
			--ServerApp.token= \
			--ServerApp.allow_origin='*' \
			--ServerApp.disable_check_xsrf=True )

storybook: ## start the storybook
	($(CONDA_ACTIVATE) jupyter-react; \
		yarn storybook )

storybook-build: ## build the storybook
	($(CONDA_ACTIVATE) jupyter-react; \
		rm -fr storybook/.out/* && \
		yarn build:vercel && \
		open storybook/.out/index.html )

storybook-prod: ## deploy the storybook
	($(CONDA_ACTIVATE) jupyter-react; \
		npx vercel --prod )
