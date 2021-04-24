---
title: Jupyter Kernels
---

# Jupyter Kernels

- [IPython](./ipython.md)
- [R](./R.md)

## KernelSpec

```bash
jupyter kernelspec

No subcommand specified. Must specify one of: ['list', 'install', 'uninstall', 'remove', 'install-self']

Manage Jupyter kernel specifications.

Subcommands
===========
Subcommands are launched as `jupyter kernelspec cmd [args]`. For information on
using subcommand 'cmd', do: `jupyter kernelspec cmd -h`.

list
    List installed kernel specifications.
install
    Install a kernel specification directory.
uninstall
    Alias for remove
remove
    Remove one or more Jupyter kernelspecs by name.
install-self
    [DEPRECATED] Install the IPython kernel spec directory for this Python.``
```

```bash
jupyter kernelspec list
jupyter kernelspec list --json
```

## KernelSpec Managers

- https://github.com/carreau/ksmm

## REST APIs

```bash
# List kernelspecs.
curl http://localhost:8888/api/kernelspecs?token=...
```

```bash
# List running kernels.
curl http://localhost:8888/api/kernels?token=...
```

## Kernel Test

[Jupyter Kernel Test](https://github.com/takluyver/jupyter_kernel_test)

## Language Server Protocol

- https://langserver.org
- https://microsoft.github.io/language-server-protocol
- https://github.com/krassowski/jupyterlab-lsp

## Reactive

- [ktop](https://github.com/deathbeds/ktop)
- [ReactivePy](https://github.com/jupytercalpoly/reactivepy), a reactive Python kernel. Whenever a variable value is changed, the kernel automatically executes its dependencies (any cells which use that variable) with the updated value. As of now, reactivepy can also support asynchronous functions

## See Also

- [Callisto](https://github.com/colcarroll/callisto), a command line utility to create kernels in Jupyter from virtual environments
- https://hpc.guix.info/blog/2019/10/towards-reproducible-jupyter-notebooks
- https://bitbucket.org/tdaff/remote_ikernel

## Datacamp

- https://github.com/datacamp/protobackend

### In-Browser JavaScript Kernel Only

- https://github.com/jtpio/jupyterlite
- https://github.com/stdlib-js/jupyter-stdlib-browser-kernel
