NAME = datalayer/openldap
VERSION = 0.0.3

.PHONY: all build build-nocache

all: build

build:
	docker build -t $(NAME):$(VERSION) --rm .

build-nocache:
	docker build -t $(NAME):$(VERSION) --no-cache --rm .
