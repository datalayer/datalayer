JUPYTER_NAME=hub
KEYCLOAK_NAME=keycloak

DOCKER_ENV=$(minikube docker-env)

.SILENT: init

init:
	eval $(DOCKER_ENV)

deploy_jupyterhub: init
	helm upgrade \
  --install $(JUPYTER_NAME) \
  jupyterhub/jupyterhub \
  --namespace $(JUPYTER_NAME) \
  --timeout 99999 \
  --version 0.8.2 \
  --values hub.yaml \
  --values hub_generated_config.yaml
  -s auth.custom.client_secret=

deploy_keycloak: init
	helm install --name $(KEYCLOAK_NAME) --namespace $(KEYCLOAK_NAME) -f keycloak.yaml keycloak

deploy: init
	$(MAKE) deploy_keycloak
	echo "Waiting for Keycloak to finish deploying..."
	sleep 60
	echo "Configuring Keycloak"
	python setup_keycloak.py
	$(MAKE) deploy_jupyterhub

rm: init
	echo $(JUPYTER_NAME)
	helm delete $(JUPYTER_NAME) --purge ; \
	kubectl delete namespace $(JUPYTER_NAME) ; \
	helm delete $(KEYCLOAK_NAME) --purge ; \
	kubectl delete namespace $(KEYCLOAK_NAME) ; :
