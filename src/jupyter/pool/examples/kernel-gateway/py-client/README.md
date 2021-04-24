[![Datalayer](https://raw.githubusercontent.com/datalayer/datalayer/main/res/logo/datalayer-25.svg?sanitize=true)](https://datalayer.io)

# Jupyter Kernel Gateway with a Python Client

## Docker

```bash
docker-compose build && \
  docker-compose up
```

A kernel and client are created on startup.

When the kernels is created, the `kernel-id` and a command to connect another client is printed. You should use this command in another terminal window.

```
Created kernel KERNEL_ID. Connect other clients with the following command:
           docker-compose run client --kernel-id=KERNEL_ID
```

Run in another terminal.

```bash
docker-compose run client --kernel-id=7e4f8165-27e5-4a97-89c6-9e6a6dae3526
```

If you do not specify a `kernel-id` option a new one will be created. The options for the client are:

```
--code                           The code to execute on the kernel. (default
                                 print('hello, world!'))
--kernel-id                      The id of an existing kernel for connecting
                                 and executing code. If not specified, a new
                                 kernel will be created.
--lang                           The kernel language if a new kernel will be
                                 created. (default python)
--times                          The number of times to execute the code
                                 string. (default 2)
```

```bash
docker-compose down
```

## Raw

```bash
cd $DLAPHOME/repos/jupyter-gateway-kernel && \
  pip install -e . && \
  jupyter kernelgateway --KernelGatewayApp.ip=0.0.0.0 --KernelGatewayApp.port=8888
```

```bash
python client.py
```

```bash
python client.py --kernel-id=KERNEL_ID
```

```bash
ps -ef | grep ipykernel
alias show_kernels="curl -s -i -H \"Accept: application/json\" \"http://localhost:8888/api/sessions\"|tail -1 | python -c \"import sys, pprint; pp=pprint.PrettyPrinter(indent=4);pp.pprint(eval(sys.stdin.readlines()[0]))\""
show_kernels
```
