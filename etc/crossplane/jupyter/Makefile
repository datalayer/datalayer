# Copyright (c) Datalayer, Inc https://datalayer.io
# Distributed under the terms of the MIT License.

.PHONY: env env-rm

default: all ## Default target is all.

help: ## display this help.
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

env-rm:
	-conda remove -y --all -n crossplane-jupyter

env:
	-conda env create -f environment.yml
	@echo 
	@echo ----------------------------------------------
	@echo ✨  Crossplane Jupyter environment is created.
	@echo ----------------------------------------------
	@echo
