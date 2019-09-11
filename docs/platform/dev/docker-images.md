---
title: Docker Images
---

# Docker Images

The needed Docker images can be [pulled](#pull) or [built](#build). You may also use [a local registry](#local-registry) to develop.

## Pull the Docker Images

You can pull the images deployed by Datalayer in [Dockerhub](https://hub.docker.com/u/datalayer).

```bash
# Get the images on your local env.cd d
dla dsp-docker-pull
```

## Build the Docker Images

You can build your own custom Docker images and push to your favorite repository.

Start from the Docker files available in the [$DLAHOME/etc/docker folder](https://github.com/datalayer/datalayer/tree/master/etc/docker) and in the [datalayer-contrib repositories](https://github.com/datalayer-contrib).

As prerequisite, you need the `datalayer-contrib` repositories and build Spark.

```bash
dla repos-clone
dla spark-build 2.4
```

Build the images.

```bash
dla dsp-docker-build
```

## Deploy in a Local Registry

If you are developing on with a local registry (`docker` or `minikube` on `localhost:5000`), you can push the images to this local registry.

```bash
# Tag and push the Docker images to a local registry on localhost:5000.
dla dsp-docker-push-local
```
