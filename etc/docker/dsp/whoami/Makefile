.PHONY: default build dependencies image

default: build

build-src:
	CGO_ENABLED=0 go build -a --installsuffix cgo --ldflags="-s" -o target/whoami

dependencies:
	go mod download

build:
	@exec docker build -t \
	  ${DLA_DOCKER_REPO}/dsp-whoami:${DLAVERSION} .

push: ## push the image.
	@exec docker push \
	  ${DLA_DOCKER_REPO}/dsp-whoami:${DLAVERSION}
