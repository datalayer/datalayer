---
title: Jupyter Kernels
---

# Jupyter Kernels

## Install

Installation [Docs](https://jupyter.readthedocs.io/en/latest/install-kernel.html).

```bash
# jupyter kernel install --name ipywidgets --display-name "ipywidgets" --sys-prefix
```

## Specs

```bash
jupyter kernelspec list
jupyter kernelspec list --json
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

## Start

```bash
jupyter kernel
# [KernelApp] Starting kernel 'python3'
# [KernelApp] Connection file: ...kernel-e0bde3c0-00e8-46c0-9e47-d01c3b9d3618.json
# [KernelApp] To connect a client: --existing kernel-e0bde3c0-00e8-46c0-9e47-d01c3b9d3618.json
```

## Connect

```bash
# jupyter console --existing $(jupyter --runtime-dir)/kernel-....json
jupyter console --existing kernel-....json
jupyter qtconsole --existing kernel-....json
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
