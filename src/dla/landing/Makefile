# Copyright (c) Datalayer, Inc https://datalayer.io
# Distributed under the terms of the MIT License.

.PHONY: clean build dist dev

default: all ## default target is all

help: ## display this help
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)
	@exec make yarn-help

all: clean install build dist ## clean install build and dist

clean: yarn-clean py-clean

install: yarn-install py-install

build: yarn-build py-build

yarn-help:
	@exec ./dev/yarn-help.sh

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

yarn-css:
	@exec yarn build:scss

yarn-uglify:
	@exec yarn uglify

yarn-start:
	yarn start

static-to-s3:
	@exec ./dev/static-to-s3.sh

py-clean:
	rm -fr build
	rm -fr dist
	rm -fr *.egg-info
	find . -name '*.egg-info' -exec rm -fr {} +
	find . -name '__pycache__' -exec rm -fr {} +

py-install:
	python setup.py install

py-build:
	python setup.py sdist bdist_egg bdist_wheel

py-start:
	python dla_landing/main.py

py-publish:
	python setup.py sdist bdist_egg bdist_wheel upload

py-repl:
	PYTHONPATH=./dist/dla_landing-${DLAVERSION}-py3-none-any.whl python

dist: build
	@exec ./dev/dist.sh

watch:
	@exec yarn watch

start:
	echo open http://localhost:3004
	echo open http://localhost:9500/api/landing
	DLA_LANDING_INDEX_PAGE=index.html && \
		open http://localhost:9500/api/landing && \
		python dla_landing/main.py
