---
title: Installation Guide
---

# Installation Guide

A Service Mesh makes up the `Datalayer Science Platform`.

The services are deployed in the Kubernetes Cluster via [Helm charts](https://github.com/datalayer/datalayer/tree/master/etc).

Choose a Kubernetes cluster flavor where you will to install the `Datalayer Science Platform`.

+ Before going to the cloud, try it on a local Kubernetes cluster with `Minikube`.
+ When you feel confident with your local env, install on a cloud provider such as `AWS`, `Azure`, `GCloud`...

![DSP on Kubernetes](/_images/dsp/dsp.svg)

## Install on Minikube

Install on your [Minikube Kubernetes](/install/minikube/index.md) with `Helm Charts` and deploy the meshed services.

## Install on Amazon AWS

Install on your [AWS Kubernetes](/install/aws/index.md) with `Helm Charts` and deploy the meshed services.
