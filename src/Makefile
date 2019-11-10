# Copyright (c) Datalayer https://datalayer.io
# Distributed under the terms of the Apache License, Version 2.0
# https://www.apache.org/licenses/LICENSE-2.0.txt

.PHONY: dev

default: help ## Default target is help.

help: ## display this help.
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

install-endpoints:
	@exec dev/install-dev-env.sh endpoints

start-endpoints:
	@exec yarn endpoints

clean-ui:
	find . -name node_modules | xargs rm -fr {}
	find . -name lib | xargs rm -fr {}
	find . -name build | xargs rm -fr {}

deps-ui:
	@exec yarn install
	sed 's|useEslintrc: false|useEslintrc: true|g' node_modules/@react-workspaces/react-scripts/config/webpack.config.js > /tmp/webpack.config.js
	mv /tmp/webpack.config.js node_modules/@react-workspaces/react-scripts/config/webpack.config.js
	rm -fr components/node_modules/@datalayer/widgets

build-ui:
	cd ${DLAHOME}/src/widgets && yarn build && \
	    cd ${DLAHOME}/src/components && yarn build && \
		cd ${DLAHOME}/src && yarn build

clean:
	@exec yarn clean
