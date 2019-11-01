# Copyright (c) Datalayer https://datalayer.io
# Distributed under the terms of the Apache License, Version 2.0
# https://www.apache.org/licenses/LICENSE-2.0.txt

.PHONY: clean build dist

default: all ## Default target is all.

help: ## display this help.
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)
	@exec make yarn-help

all: clean install build dist ## Clean Install and Build

clean: yarn-clean py-clean

install: yarn-install py-install

build: yarn-build py-build

yarn-help:
	@exec ./dev/yarn-help.sh

yarn-uglify:
	@exec yarn uglify

yarn-clean:
	@exec yarn clean
	rm .yarnclean || true
	rm yarn.lock || true
	rm yarn-error.log || true
#	gulp clean
#	rm -fr dist lib node_modules

yarn-install:
	@exec ./dev/yarn-install.sh

yarn-build:
	@exec yarn build

yarn-start:
	@exec yarn start

py-clean:
	rm -fr build
	rm -fr dist
	rm -fr *.egg-info
	find . -name '*.egg-info' -exec rm -fr {} +
	find . -name '__pycache__' -exec rm -fr {} +

py-build:
	python setup.py sdist bdist_egg bdist_wheel

py-install:
	python setup.py install --record files.txt

py-publish:
	python setup.py sdist bdist_egg bdist_wheel upload

py-repl:
	PYTHONPATH=./dist/jupyterlab_twitter-0.0.1-py3-none-any.whl python

server-ext-enable: py-build
	@exec jupyter serverextension enable --py jupyterlab_twitter --sys-prefix
	@exec jupyter serverextension list

server-ext-disable:
	@exec jupyter serverextension disable --py jupyterlab_twitter --sys-prefix
	@exec jupyter serverextension list

lab-ext-enable: yarn-build
	@exec jupyter labextension link .
	@exec jupyter labextension list

lab-ext-disable:
	@exec jupyter labextension unlink .
	@exec jupyter labextension list

ext-enable: server-ext-enable lab-ext-enable
	
ext-disable: server-ext-disable lab-ext-disable
	
ext-list:
	@exec jupyter serverextension list
	@exec jupyter labextension list

dist: build
	@exec ./dev/make-dist.sh

watch:
	yarn watch
