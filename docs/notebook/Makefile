# Copyright (c) Datalayer https://datalayer.io
# Distributed under the terms of the Apache License, Version 2.0
# https://www.apache.org/licenses/LICENSE-2.0.txt

.PHONY: clean install build dist

help: ## display this help.
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

default: all ## default target is all.

all: clean install build serve ## make clean install build serve

clean: ## remove node_modules as the generated html and pdf artifacts.
	rm -fr node_modules || true
	rm -fr _book || true
	rm book.pdf || true
	rm datalayer-docs.pdf || true

check-env:
	gitbook --version

env: ## install gitbook-cli and svgexport globally with npm (you need npm installed).
	@sudo npm install gitbook-cli -g
	npm install svgexport

install: ## install plugins declared in book.json.
	gitbook install

build: ## build the docs.
#	rm -fr _book || true
	gitbook build
	ls -alp _book

pdf:
	gitbook pdf
	mv book.pdf datalayer-docs.pdf
	ls -alp datalayer-docs.pdf

serve: ## serve the docs.
	echo http://localhost:4000
	gitbook serve

netlify:
	npm install -g gitbook-cli && cd . && gitbook install && gitbook build
