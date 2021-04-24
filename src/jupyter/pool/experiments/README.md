[![Datalayer](https://raw.githubusercontent.com/datalayer/datalayer/main/res/logo/datalayer-25.svg?sanitize=true)](https://datalayer.io)

# Jupyterpool Experiments

## Kernel Implementations

[Jupyter Kernels](https://github.com/jupyter/jupyter/wiki/jupyter-kernels)

- [Babel](https://github.com/n-riesco/jp-babel)
- [Go](https://github.com/takluyver/igo)
- [Guix](https://hpc.guix.info/blog/2019/10/towards-reproducible-jupyter-notebooks)
- [Julia](https://github.com/JuliaLang/IJulia.jl)
- [Haskell](https://github.com/gibiansky/IHaskell)
- [Node.js](https://gist.github.com/Carreau/4279371)
- [Python](https://github.com/ipython/ipython)
- [R](https://github.com/IRkernel/IRkernel)
- [Ruby](https://github.com/minrk/iruby)
- [Scala](https://github.com/Bridgewater/scala-notebook)
- [Smaltalk](https://github.com/jmari/jupytertalk)
- [Xeus](https://github.com/quantstack/xeus)

## Kernel Specs

[Install Kernels Docs](https://jupyter.readthedocs.io/en/latest/install-kernel.html).

```bash
jupyter kernelspec install \
  $EXPHOME/etc/kernel/specs/python3-test \
  --name python3-test \
  --sys-prefix
```

```bash
jupyter kernelspec install \
  $EXPHOME/etc/kernel/specs/python3-slow \
  --name python3-slow \
  --sys-prefix
```

```bash
jupyter kernelspec list
```

## Start a Kernel Process

```bash
jupyter kernel
# [KernelApp] Starting kernel 'python3'
# [KernelApp] Connection file: ...kernel-e0bde3c0-00e8-46c0-9e47-d01c3b9d3618.json
# [KernelApp] To connect a client: --existing kernel-e0bde3c0-00e8-46c0-9e47-d01c3b9d3618.json
```

```bash
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

## Connection Files

[Connection Files](https://jupyter-protocol.readthedocs.io/en/latest/kernels.html?highlight=connection%20files#connection-files).

The `transport`, `ip` and `five _port` fields specify five ports which the kernel should bind to using ZeroMQ.

```bash
ls $(jupyter --runtime-dir) | grep "kernel-"
```

```python
%connect_info
{
  "shell_port": 61162,
  "iopub_port": 61163,
  "stdin_port": 61164,
  "control_port": 61165,
  "hb_port": 61166,
  "ip": "127.0.0.1",
  "key": "e18b2909-7dc72c2ba5b0b0327162390f",
  "transport": "tcp",
  "signature_scheme": "hmac-sha256",
  "kernel_name": ""
}
Paste the above JSON into a file, and connect with:
    $> jupyter <app> --existing <file>
or, if you are local, you can connect with just:
    $> jupyter <app> --existing kernel-27292.json
or even just:
    $> jupyter <app> --existing
if this is the most recent Jupyter kernel you have started.
```

## Meta Kernel

https://github.com/calysto/metakernel A Jupyter kernel base class in Python which includes core magic functions (including help, command and file path completion, parallel and distributed processing, downloads, and much more).

## Kernel Examples

- https://github.com/jupyter/kernel_gateway_demos/tree/master/python_client_example
- https://github.com/jupyter/kernel_gateway_demos/tree/master/node_client_example

- https://github.com/jupyter/jupyter_client/issues/358
- https://github.com/abalter/polyglottus
- https://github.com/abalter/polyglottus/blob/master/simple_kernel.py
- https://gist.github.com/abalter/9786332199806a03961f06da9861edf6

- https://medium.com/@halmubarak/connecting-spyder-ide-to-a-remote-ipython-kernel-25a322f2b2be
- https://github.com/spyder-ide/spyder/blob/0397e98adc903b95ddbaee669e2d4f448c1d349d/spyder/plugins/ipythonconsole/plugin.py
