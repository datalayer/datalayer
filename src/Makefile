# Copyright (c) Datalayer, Inc https://datalayer.io
# Distributed under the terms of the MIT License.

SHELL=/bin/bash

CONDA_ACTIVATE=source $$(conda info --base)/etc/profile.d/conda.sh ; conda activate ; conda activate
CONDA_DEACTIVATE=source $$(conda info --base)/etc/profile.d/conda.sh ; conda deactivate
CONDA_REMOVE=source $$(conda info --base)/etc/profile.d/conda.sh ; conda remove -y --all -n

.DEFAULT_GOAL := default

.SILENT: init

.PHONY: port-forward

help: ## display this help
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

default: help ## default target is help

all: dsp-endpoints ui ## all

build: dsp-endpoints-build ui-deps ui-build ## build
#	@exec ./../bin/dla build

clean: dsp-endpoints-clean ui-clean ## clean
#	@exec ./../bin/dla clean

dsp-endpoints: dsp-endpoints-build ## endpoints

dsp-endpoints-build: ## endpoints-build
	($(CONDA_ACTIVATE) datalayer; \
	  ./../bin/dla env-dev dsp-endpoints )

dsp-endpoints-clean: ## endpoints-clean
	find . -name *.egg-info | xargs rm -fr {} || true
	find . -name __pycache__ | xargs rm -fr {} || true
	find . -name dist | xargs rm -fr {} || true

env: warning ## env
#	SLUGIFY_USES_TEXT_UNIDECODE=yes conda create -y -n py27 python=2.7
#	SLUGIFY_USES_TEXT_UNIDECODE=yes conda create -y -n py38 python=3.8
	SLUGIFY_USES_TEXT_UNIDECODE=yes conda env create -n datalayer -f ${DLAHOME}/etc/env/datalayer-base.yml
	@exec echo "You can now populate the datalayer environment."
	@exec echo "-------------------------------------------------------"
	@exec echo "conda activate datalayer"
	@exec echo "make env-dev"
	@exec echo "-------------------------------------------------------"

env-dev: ## env-dev
	@exec ./../bin/dla env-dev all
	$(MAKE) env-status

env-rm: warning ## env-rm
	conda remove -y --name datalayer --all || true

env-status: ## env-status
	@exec ./../bin/dla env-status

init: ## init
	eval $(DOCKER_ENV)
	
install: ui-deps ## install

pf: port-forward ## alias for port-forward

pf-solr: ## port-forward solr
	($(CONDA_ACTIVATE) datalayer; \
		yarn port-forward__disabled__:solr:zookeeper )

port-forward: ## port-forward
	($(CONDA_ACTIVATE) datalayer; \
		yarn port-forward )

start-dsp: ## start
	($(CONDA_ACTIVATE) datalayer; \
		yarn start:dsp )

ui: ui-clean ui-deps ui-build ## ui

ui-build: ## ui-build
	($(CONDA_ACTIVATE) datalayer; \
		yarn build )

ui-clean: ## ui-clean
	find . -name node_modules | xargs rm -fr {} || true
	find . -name lib | xargs rm -fr {} || true
	find . -name build | xargs rm -fr {} || true
	find . -name yarn.lock | xargs rm {} || true
	find . -name yarn-error.log | xargs rm {} || true
	find . -name tsconfig.tsbuildinfo | xargs rm {} || true

ui-ls: ## ui-ls
	yarn ls

# 		rm -fr ./node_modules/\@types/react-native
ui-deps: ## ui-deps
	($(CONDA_ACTIVATE) datalayer; \
		yarn install )

warning:
	echo "\x1b[34m\x1b[43mEnsure you have run \x1b[1;37m\x1b[41m conda deactivate \x1b[22m\x1b[34m\x1b[43m before invoking this.\x1b[0m"
