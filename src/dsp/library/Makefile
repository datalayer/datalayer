# Copyright (c) Datalayer, Inc https://datalayer.io
# Distributed under the terms of the MIT License.

.PHONY: clean build dist

default: all ## Default target is all.

help: ## display this help.
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

all: clean install build dist ## Clean Install and Build

clean:
	rm -fr build
	rm -fr dist
	rm -fr *.egg-info
	find . -name '*.egg-info' -exec rm -fr {} +
	find . -name '__pycache__' -exec rm -fr {} +

install:
	python setup.py install

dev:
	pip install -e .

build:
	python setup.py sdist bdist_egg bdist_wheel

publish:
	python setup.py sdist bdist_egg bdist_wheel upload

repl:
	PYTHONPATH=./dist/dsp_library-${DLAVERSION}-py3-none-any.whl python

start:
	@exec echo open http://localhost:9800/api/library/version
	python dsp_library/main.py
