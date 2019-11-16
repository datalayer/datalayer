---
title: Jupyter Kernels
---

# Jupyter Kernels

## Install

Installation [Docs](https://jupyter.readthedocs.io/en/latest/install-kernel.html).

```bash
# jupyter kernel install --name ipywidgets --display-name "ipywidgets" --sys-prefix
```

## Start

```bash
jupyter kernel
# [KernelApp] Starting kernel 'python3'
# [KernelApp] Connection file: ...kernel-e0bde3c0-00e8-46c0-9e47-d01c3b9d3618.json
# [KernelApp] To connect a client: --existing kernel-e0bde3c0-00e8-46c0-9e47-d01c3b9d3618.json
```

## Options

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

## Implementations

[Jupyter Kernels List](https://github.com/jupyter/jupyter/wiki/jupyter-kernels).

+ [Python](https://github.com/ipython/ipython)
+ [Julia](https://github.com/JuliaLang/IJulia.jl)
+ [R](https://github.com/IRkernel/IRkernel)
+ [Ruby](https://github.com/minrk/iruby)
+ [Haskell](https://github.com/gibiansky/IHaskell)
+ [Scala](https://github.com/Bridgewater/scala-notebook)
+ [Node.js](https://gist.github.com/Carreau/4279371)
+ [Go](https://github.com/takluyver/igo)

+ [Guix](https://hpc.guix.info/blog/2019/10/towards-reproducible-jupyter-notebooks)

## Tests

+ [Jupyter Kernel Test](https://github.com/takluyver/jupyter_kernel_test).

## See Also

+ [Callisto](https://github.com/colcarroll/callisto), a command line utility to create kernels in Jupyter from virtual environments
+ [Reactive Python](https://github.com/jupytercalpoly/reactivepy), a reactive Python kernel. Whenever a variable value is changed, the kernel automatically executes its dependencies (any cells which use that variable) with the updated value. As of now, reactivepy can also support asynchronous functions
