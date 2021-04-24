[![Datalayer](https://raw.githubusercontent.com/datalayer/datalayer/main/res/logo/datalayer-25.svg?sanitize=true)](https://datalayer.io)

# Jupyter Kernels Provider

[Releases](https://github.com/gateway-experiments/remote_kernel_provider/releases).

```bash
export IR=https://github.com/gateway-experiments/remote_kernel_provider/releases/download/v0.1-interim-dev
curl -L $IR/notebook.yaml -o notebook.yaml
curl -L $IR/docker_kernelspecs.tar -o docker_kernelspecs.tar
curl -L $IR/notebook-6.0.0.dev0-py2.py3-none-any.whl -o notebook-6.0.0.dev0-py2.py3-none-any.whl
curl -L $IR/docker_kernel_provider-0.1.0.dev0-py3-none-any.whl -o docker_kernel_provider-0.1.0.dev0-py3-none-any.whl
```

Build the Docker image.

```
make build
```

An image `elyra/nb-kernel-mgmt:dev` containing the `notebook`, `jupyter_kernel_mgmt`, `remote_kernel_provider`, `kubernetes_kernel_provider` and `docker_kernel_provider` whl and `kernelspec` files can be found [here](https://hub.docker.com/r/elyra/nb-kernel-mgmt).

Deploy the image on Kubernetes using `notebook.yaml` file.

```bash
kubectl apply -f notebook.yaml
minikube service nb-kernel-mgmt --url -n nb-kernel-mgmt
# Get the token via the pod...
kubectl exec nb-kernel-mgmt-d5587599b-9tmlj -n nb-kernel-mgmt -i -t -- jupyter notebook list
kubectl delete -f notebook.yaml
```

This file is derived directly from the one used by Enterprise Gateway. As a result, there are a number of items in this file that do not apply to this configuration or require more work (e.g., whitelists are not applied, and kernel-image-puller isn't able to access specs from Notebook, etc.)
