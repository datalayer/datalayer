[![Datalayer](https://docs.datalayer.io/logo/datalayer-25.svg)](https://datalayer.io)

# Datalayer Lab Jupyter Kernel

```bash
# List the Kernels Specs.
jupyter kernelspec list
```

```bash
# Launch a Kernel Server.
jupyter kernel
# [KernelApp] Starting kernel 'python3'
# [KernelApp] Connection file: .../Library/Jupyter/runtime/kernel-217c09c0-44eb-48bd-ab50-3c5c42754d8c.json
# [KernelApp] To connect a client: --existing kernel-217c09c0-44eb-48bd-ab50-3c5c42754d8c.json
```

```bash
jupyter qtconsole --existing $(jupyter --runtime-dir)/kernel-217c09c0-44eb-48bd-ab50-3c5c42754d8c.json
```
```bash
%connect_info
{
  "shell_port": 50305,
  "iopub_port": 50306,
  "stdin_port": 50307,
  "control_port": 50308,
  "hb_port": 50309,
  "ip": "127.0.0.1",
  "key": "57045edc-841467eb276f2856e4d2aa57",
  "transport": "tcp",
  "signature_scheme": "hmac-sha256",
  "kernel_name": ""
}

Paste the above JSON into a file, and connect with:
    $> jupyter <app> --existing <file>
or, if you are local, you can connect with just:
    $> jupyter <app> --existing kernel-ac239a91-a8ae-42aa-a1d2-8e2e5986b6d4.json
or even just:
    $> jupyter <app> --existing
if this is the most recent Jupyter kernel you have started.
```

```bash
%qtconsole
```

```bash
# Servers.
python python/client-echo.py
```

```bash
# Clients.
python python/client-1.py 217c09c0-44eb-48bd-ab50-3c5c42754d8c
python python/client-2.py
python python/client-3.py
python python/client-4.py
python python/client-5.py
```

## Examples

+ https://github.com/jupyter/kernel_gateway_demos/tree/master/python_client_example
+ https://github.com/jupyter/kernel_gateway_demos/tree/master/node_client_example

+ https://github.com/jupyter/jupyter_client/issues/358
+ https://github.com/abalter/polyglottus
+ https://github.com/abalter/polyglottus/blob/master/simple_kernel.py
+ https://gist.github.com/abalter/9786332199806a03961f06da9861edf6

+ https://medium.com/@halmubarak/connecting-spyder-ide-to-a-remote-ipython-kernel-25a322f2b2be
+ https://github.com/spyder-ide/spyder/blob/0397e98adc903b95ddbaee669e2d4f448c1d349d/spyder/plugins/ipythonconsole/plugin.py
