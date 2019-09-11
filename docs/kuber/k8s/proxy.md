---
title: Kubernetes Proxy
---

# Kubernetes Proxy

## Kubectl Proxy

[The kubectl proxy](https://kubernetes.io/docs/tasks/access-application-cluster/access-cluster/#directly-accessing-the-rest-api):

+ runs on a user’s desktop or in a pod
+ proxies from a localhost address to the Kubernetes apiserver
+ client to proxy uses HTTP
+ proxy to apiserver uses HTTPS
+ locates apiserver
+ adds authentication headers

```bash
kubectl proxy --port=8081
```

## API Server Proxy

[The apiserver proxy](https://kubernetes.io/docs/tasks/access-application-cluster/access-cluster/#discovering-builtin-services):

is a bastion built into the apiserver
connects a user outside of the cluster to cluster IPs which otherwise might not be reachable
runs in the apiserver processes
client to proxy uses HTTPS (or http if apiserver so configured)
proxy to target may use HTTP or HTTPS as chosen by proxy using available information
can be used to reach a Node, Pod, or Service
does load balancing when used to reach a Service

## Kube Proxy

[The kube proxy](https://kubernetes.io/docs/concepts/services-networking/service/#ips-and-vips):

+ runs on each node
+ proxies UDP and TCP
+ does not understand HTTP
+ provides load balancing
+ is just used to reach services

## Load Balancer Proxy

A Proxy/Load-balancer in front of apiserver(s):

+ existence and implementation varies from cluster to cluster (e.g. nginx)
+ sits between all clients and one or more apiservers
+ acts as load balancer if there are several apiservers.

## Cloud Balancer

Cloud Load Balancers on external services:

+ are provided by some cloud providers (e.g. AWS ELB, Google Cloud Load Balancer)
+ are created automatically when the Kubernetes service has type LoadBalancer
+ use UDP/TCP only
+ implementation varies by cloud provider.
