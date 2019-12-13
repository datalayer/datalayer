# Copyright (c) Datalayer https://datalayer.io
# Distributed under the terms of the Apache License, Version 2.0
# https://www.apache.org/licenses/LICENSE-2.0.txt

.PHONY: dev

default: help ## Default target is help.

help: ## display this help.
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

clean-ui:
	find . -name node_modules | xargs rm -fr {} || true
	find . -name lib | xargs rm -fr {} || true
	find . -name build | xargs rm -fr {} || true
	find . -name yarn.lock | xargs rm {} || true
	find . -name yarn-error.log | xargs rm {} || true
	find . -name tsconfig.tsbuildinfo | xargs rm {} || true
#	@exec yarn clean

clean: clean-ui

deps-ui:
	@exec yarn install
	sed 's|useEslintrc: false|useEslintrc: true|g' node_modules/@react-workspaces/react-scripts/config/webpack.config.js > /tmp/webpack.config.js
	mv /tmp/webpack.config.js node_modules/@react-workspaces/react-scripts/config/webpack.config.js
	rm -fr components/node_modules/@datalayer/widgets

build-ui:
	cd ${DLAHOME}/src/widgets && yarn build && \
	    cd ${DLAHOME}/src/components && yarn build && \
		cd ${DLAHOME}/src && yarn build

build-endpoints:
	@exec dla env-dev all

build: deps-ui build-ui build-endpoints

start-endpoints:
	@exec yarn endpoints
