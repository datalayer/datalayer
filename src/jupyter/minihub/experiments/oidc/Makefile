.PHONY: clean install

help: ## display this help.
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

default: help ## default target is help.

install:
	@exec python setup.py install

install-http-proxy:
	@exec npm install -g configurable-http-proxy

keycloak-start: keycloak-rm
	@exec docker run -it \
		-d --rm  \
		-v ${PWD}/dev:/tmp/keycloak \
		-e KEYCLOAK_USER=admin \
		-e KEYCLOAK_PASSWORD=admin \
		-p 8094:8080 \
		--name keycloak \
		jboss/keycloak:6.0.1
	make keycloak-logs

keycloak-init:
	@exec docker exec -it keycloak /tmp/keycloak/init-keycloak.sh

keycloak-logs:
	@exec docker logs keycloak -f

keycloak-rm: ## Remove any existing keycloak container.
	docker rm -f keycloak || true

pull-docker:
	@exec docker pull jupyterhub/singleuser:1.2

start-jupyterhub:
	@exec echo
	@exec echo open http://localhost:8080/jupyterhub
	@exec echo 
	@exec jupyterhub -f jupyterhub_config.py --log-level DEBUG
