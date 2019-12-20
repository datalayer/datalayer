# Copyright (c) Datalayer https://datalayer.io
# Distributed under the terms of the Apache License, Version 2.0
# https://www.apache.org/licenses/LICENSE-2.0.txt

.PHONY: clean build dist env

.SILENT: init

init:
	eval $(DOCKER_ENV)
	
help: ## display this help.
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

default: all ## default target is all.

all: clean install build ## make clean install build

env-status:
	@exec ./bin/dla env-status

env-rm:
	conda remove -y --name py2 --all || true
	conda remove -y --name py3 --all || true
	conda remove -y --name node8 --all || true
	conda remove -y --name datalayer --all || true

env-datalayer:
	@exec ./bin/dla env-datalayer
	$(MAKE) env-status

env:
	echo "\x1b[34m\x1b[43mEnsure you have run \x1b[1;37m\x1b[41m conda deactivate \x1b[22m\x1b[34m\x1b[43m before invoking this.\x1b[0m"
	SLUGIFY_USES_TEXT_UNIDECODE=yes conda create -y -n py2 python=2.7
	SLUGIFY_USES_TEXT_UNIDECODE=yes conda create -y -n py3 python=3.7
	SLUGIFY_USES_TEXT_UNIDECODE=yes conda env create -n node8 -f ${DLAHOME}/etc/env/conda/node8.yml
	SLUGIFY_USES_TEXT_UNIDECODE=yes conda env create -n datalayer -f ${DLAHOME}/etc/env/conda/datalayer.yml
	@exec echo "You can now further populate the datalayer environment."
	@exec echo 
	@exec echo "conda activate datalayer"
	@exec echo "make env-datalayer"
	@exec echo "make env-status"

clean:
	@exec ./bin/dla clean

install:
	@exec ./bin/dla install

build:
	@exec ./bin/dla build
