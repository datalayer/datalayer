# Copyright (c) Datalayer https://datalayer.io
# Distributed under the terms of the Apache License, Version 2.0
# https://www.apache.org/licenses/LICENSE-2.0.txt

help: ## display this help.
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

up:
	@exec docker-compose -f keycloak-postgres.yml up -d
	@exec echo
	@exec echo "Login as user 'admin' with password 'Pa55w0rd' (wait 30 to 60 seconds for Keycloak to be up - check with 'make logs')"
	@exec echo
	@exec open http://localhost:8080/auth

down:
	@exec docker-compose -f keycloak-postgres.yml down

logs:
	@exec docker logs example_keycloak_1 -f
