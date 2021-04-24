[![Datalayer](https://raw.githubusercontent.com/datalayer/datalayer/main/res/logo/datalayer-25.svg?sanitize=true)](https://datalayer.io)

# Jupyterpool Experiments on Kernel Gateway

> Jupyter Kernel Gateway is a web server that provides headless access to Jupyter kernels. Your application communicates with the kernels remotely, through REST calls and Websockets rather than ZeroMQ messages.

There are no provisions for editing notebooks through the Kernel Gateway. The following operation modes, called personalities, are supported out of the box: jupyter-websocket and notebook-http.

```
BROWSER --- JUPYTER_SERVER --- KERNEL_GATEWAY --- KERNEL
```

Kernel Gateway [GitHub](https://github.com/jupyter/kernel_gateway) repository.

Kernel Gateway [Docs](https://jupyter-kernel-gateway.readthedocs.io).

Kernel Gateway [GitHub](https://github.com/jupyter/kernel_gateway_demos) Demo repository.

![Kernel Gateway](https://raw.githubusercontent.com/jupyter/nb2kg/master/deploy.png)

- https://blog.jupyter.org/jupyter-kernel-gateway-60e08f2166e0
- https://towardsdatascience.com/expose-endpoints-using-jupyter-kernel-gateway-e55951b0f5ad

## API

REST API [Swagger](http://petstore.swagger.io?url=https://raw.githubusercontent.com/jupyter/kernel_gateway/master/kernel_gateway/jupyter_websocket/swagger.yaml)

## Install

```bash
# Install frop PyPi.
pip install --upgrade nb2kg
```

```bash
# Install from source.
cd $DLAHOME/repos/jupyter-nb2kg && \
  pip install -e .
```

```bash
jupyter serverextension enable --py nb2kg --sys-prefix
jupyter serverextension list
jupyter serverextension disable nb2kg
```

```bash
# conda install -c conda-forge jupyter_kernel_gateway
pip install --upgrade jupyter_kernel_gateway
```

```bash
jupyter kernelgateway --help-all
jupyter kernelgateway --generate-config
```

## Start Kernel Gateway

```bash
# --api='kernel_gateway.notebook_http'
# --seed_uri='x'
# jupyter kernelgateway --KernelGatewayApp.ip=0.0.0.0 --KernelGatewayApp.port=8889 --port_retries=0
jupyter kernelgateway \
  --ip=0.0.0.0 \
  --port 9006 \
  --port_retries=0
```

## Start JupyterLab

```bash
# Legacy
jupyter lab --gateway-url=http://localhost:9006
```

```
--gateway-url=<Unicode> (GatewayClient.url)
    Default: None
    The url of the Kernel or Enterprise Gateway server where
    kernel specifications are defined and kernel management
    takes place. If defined, this Notebook server acts as a
    proxy for all kernel management and kernel
    specification retrieval. (JUPYTER_GATEWAY_URL env var)
```

```bash
# Legacy
pip install nb2kg
export KG_URL=http://localhost:9006 && \
  jupyter lab \
    --ServerApp.session_manager_class=nb2kg.managers.SessionManager \
    --ServerApp.kernel_manager_class=nb2kg.managers.RemoteKernelManager \
    --ServerApp.kernel_spec_manager_class=nb2kg.managers.RemoteKernelSpecManager 
```

## Docker

```dockerfile
# start from the jupyter image with R, Python, and Scala (Apache Toree) kernels pre-installed
FROM jupyter/all-spark-notebook
# install the kernel gateway
RUN pip install jupyter_kernel_gateway
# run kernel gateway on container start, not notebook server
EXPOSE 8888
CMD ["jupyter", "kernelgateway", "--KernelGatewayApp.ip=0.0.0.0", "--KernelGatewayApp.port=8888"]
```

```bash
docker build -t my/kernel-gateway .
docker run -it --rm -p 8888:8888 my/kernel-gateway
```

```bash
docker run -it --rm -p 9006:8888 jupyter/minimal-kernel
```

## Modes

### Websocket Mode

The KernelGatewayApp.api command line argument defaults to kernel_gateway.jupyter_websocket. This mode, or personality, has the kernel gateway expose:

- A superset of the HTTP API provided by the Jupyter Notebook server, and
- The equivalent Websocket API implemented by the Jupyter Notebook server.

### Notebook HTTP Mode

The KernelGatewayApp.api command line argument can be set to kernel_gateway.notebook_http. This mode, or personality, has the kernel gateway expose annotated cells in the KernelGatewayApp.seed_uri notebook as HTTP resources. To turn a notebook cell into a HTTP handler, you must prefix it with a single line comment. The comment describes the HTTP method and resource, as in the following Python example:

```python
# GET /hello/world
print("hello world")
```
