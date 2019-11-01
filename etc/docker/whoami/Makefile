.PHONY: default build dependencies image

default: build

build-src:
	CGO_ENABLED=0 go build -a --installsuffix cgo --ldflags="-s" -o target/whoami

dependencies:
	go mod download

build:
	@exec docker build -t datalayer/whoami:${DLAVERSION} .
