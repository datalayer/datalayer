---
title: Kind
---

# Kind

> [Kind on GitHub](https://github.com/kubernetes-sigs/kind) is Kubernetes IN Docker - local clusters for testing Kubernetes.

```bash
go get sigs.k8s.io/kind
kind create cluster
kind delete cluste
```

See also

https://github.com/kubernetes-sigs/kubeadm-dind-cluster kubeadm-dind-cluster.
https://github.com/kubernetes-sigs/kubeadm-dind-cluster/issues/56 Add possibility for the local host to act as repository.

```bash
docker save {your_image} | docker exec -i {target_node} docker load
```

```bash
# Run registry in docker on your host:
docker run -d -p 5000:5000 --restart=always --name registry registry:2

# Now localhost:5000 is a registry url.

docker tag alpine:3.6 localhost:5000/alpine:3.6                                        
docker push localhost:5001/alpine:3.6     

# Run a proxy to forward each node's localhost:5000 to host's :5000 with a simple script:
docker ps -a -q --filter=label=mirantis.kubeadm_dind_cluster | while read container_id; do
  docker exec ${container_id} /bin/bash -c "docker rm -fv registry-proxy || true"
  # run registry proxy: forward from localhost:5001 on each node to host:5001
  docker exec ${container_id} /bin/bash -c \
    "docker run --name registry-proxy -d -e LISTEN=':5001' -e TALK=\"\$(/sbin/ip route|awk '/default/ { print \$3 }'):5001\" -p 5001:5001 tecnativa/tcp-proxy"
done

# docs: https://hub.docker.com/r/tecnativa/tcp-proxy/
# /sbin/ip route|awk '/default/ { print $3 }' is to get host's IP accessible from node container.

# Test it.
kubectl run test --image=localhost:5001/alpine:3.6 -it /bin/bash
# If you don't see a command prompt, try pressing enter.
# / #
```
