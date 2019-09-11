---
title: Jupyter Kernels
---

# Jupyter Kernels

## Kernels

[Jupyter-kernels](https://github.com/jupyter/jupyter/wiki/Jupyter-kernels) List.

+ [Python](https://github.com/ipython/ipython).
+ [Julia](https://github.com/JuliaLang/IJulia.jl).
+ [R](https://github.com/IRkernel/IRkernel).
+ [Ruby](https://github.com/minrk/iruby).
+ [Haskell](https://github.com/gibiansky/IHaskell).
+ [Scala](https://github.com/Bridgewater/scala-notebook).
+ [Node.js](https://gist.github.com/Carreau/4279371).
+ [Go](https://github.com/takluyver/igo).

## Protocols

![Frontend Kernel](https://jupyter-client.readthedocs.io/en/latest/_images/frontend-kernel.png)

**Shell**: this single ROUTER socket allows multiple incoming connections from frontends, and this is the socket where requests for code execution, object information, prompts, etc. are made to the kernel by any frontend. The communication on this socket is a sequence of request/reply actions from each frontend and the kernel.

**IOPub**: this socket is the ‘broadcast channel’ where the kernel publishes all side effects (stdout, stderr, etc.) as well as the requests coming from any client over the shell socket and its own requests on the stdin socket. There are a number of actions in Python which generate side effects: print() writes to sys.stdout, errors generate tracebacks, etc. Additionally, in a multi-client scenario, we want all frontends to be able to know what each other has sent to the kernel (this can be useful in collaborative scenarios, for example). This socket allows both side effects and the information about communications taking place with one client over the shell channel to be made available to all clients in a uniform manner.

**STDIN**: this ROUTER socket is connected to all frontends, and it allows the kernel to request input from the active frontend when raw_input() is called. The frontend that executed the code has a DEALER socket that acts as a ‘virtual keyboard’ for the kernel while this communication is happening (illustrated in the figure by the black outline around the central keyboard). In practice, frontends may display such kernel requests using a special input widget or otherwise indicating that the user is to type input for the kernel instead of normal commands in the frontend. All messages are tagged with enough information (details below) for clients to know which messages come from their own interaction with the kernel and which ones are from other clients, so they can display each type appropriately.

**Control**: This channel is identical to Shell, but operates on a separate socket, to allow important messages to avoid queueing behind execution requests (e.g. shutdown or abort).

**Heartbeat**: This socket allows for simple bytestring messages to be sent between the frontend and the kernel to ensure that they are still connected.

# ZeroMQ

pyzmq [GitHub](https://github.com/zeromq/pyzmq).

## Install

Install Kernels [Docs](https://jupyter.readthedocs.io/en/latest/install-kernel.html).

```bash
# jupyter kernel install --name ipywidgets --display-name "ipywidgets" --sys-prefix
```

## Kernel Specs

```bash
jupyter kernelspec list
jupyter kernelspec list --json
```

## Start

```bash
jupyter kernel
# [KernelApp] Starting kernel 'python3'
# [KernelApp] Connection file: ...kernel-e0bde3c0-00e8-46c0-9e47-d01c3b9d3618.json
# [KernelApp] To connect a client: --existing kernel-e0bde3c0-00e8-46c0-9e47-d01c3b9d3618.json
```

## Runtime

```bash
# Get runtime directory.
jupyter --runtime-dir
# List Kernel connection files.
ls $(jupyter --runtime-dir) | grep json
find `jupyter --runtime-dir` -mtime -5 | grep nbserver | xargs cat
```

```bash
# ~/.local/share/jupyter/runtime/kernel-d785bbc8-c058-49d0-861c-97a39089c91e.json
# ./run/user/1000/jupyter/kernel-772af73b-185b-4960-b0fb-a0532dc59e49.json
```

## Connect

```bash
# jupyter console --existing $(jupyter --runtime-dir)/kernel-....json
jupyter console --existing kernel-....json
jupyter qtconsole --existing kernel-....json
```

## Options

```
jupyter kernel --help
Run a kernel locally in a subprocess
Arguments that take values are actually convenience aliases to full
Configurables, whose aliases are listed on the help line. For more information
on full configurables, see '--help-all'.
--debug
    set log level to logging.DEBUG (maximize logging output)
--kernel=<Unicode> (KernelApp.kernel_name)
    Default: 'python3'
    The name of a kernel type to start
--ip=<Unicode> (KernelManager.ip)
    Default: ''
    Set the kernel's IP address [default localhost]. If the IP address is
    something other than localhost, then Consoles on other machines will be able
    to connect to the Kernel, so be careful!
To see all available configurables, use `--help-all`
```

## Echo Kernel

```python
import logging

from ipykernel.kernelapp import IPKernelApp
from ipykernel.kernelbase import Kernel

class EchoKernel(Kernel):
    implementation = 'Echo'
    implementation_version = '1.0'
    language = 'echo'
    language_version = '0.1'
    language_info = {
        'name': 'echo',
        'mimetype': 'text/plain',
        'file_extension': '.txt',
    }
    banner = "Echo kernel - as useful as a parrot"

    def do_execute(self, code, silent, store_history=True,
            user_expressions=None, allow_stdin=False):
        if not silent:
            stream_content = {'name': 'stdout', 'text': code}
            self.send_response(self.iopub_socket, 'stream', stream_content)

        return {'status': 'ok',
                # The base class increments the execution count
                'execution_count': self.execution_count,
                'payload': [],
                'user_expressions': {}}

class EchoKernelApp(IPKernelApp):
    kernel_class = EchoKernel

if __name__ == '__main__':
    logging.disable(logging.ERROR)
    EchoKernelApp.launch_instance()
```

## Develop Example

+ https://github.com/jupyter/kernel_gateway_demos/tree/master/python_client_example
+ https://github.com/jupyter/kernel_gateway_demos/tree/master/node_client_example

## Share Kernels

+ https://stackoverflow.com/questions/20091154/sharing-a-namespace-across-multiple-ipython-notebooks
+ https://github.com/ipython/ipython/issues/4066
+ https://github.com/minrk/singlecell
+ https://jupyter-notebook.readthedocs.io/en/stable/examples/Notebook/Connecting%20with%20the%20Qt%20Console.html

## Parametrized Kernels

[Parametrized kernels for passing arguments in to starting up kernels](https://github.com/jupyter/jupyter_client/issues/434).

## Others

+ [Callisto](https://github.com/colcarroll/callisto): A command line utility to create kernels in Jupyter from virtual environments.
+ [Reactive Python](https://github.com/jupytercalpoly/reactivepy): A reactive Python kernel. Whenever a variable value is changed, the kernel automatically executes its dependencies (any cells which use that variable) with the updated value. As of now, reactivepy can also support asynchronous functions.
+ [xeus](https://github.com/quantstack/xeus).
