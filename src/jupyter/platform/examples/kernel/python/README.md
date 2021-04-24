[![Datalayer](https://raw.githubusercontent.com/datalayer/datalayer/main/res/logo/datalayer-25.svg?sanitize=true)](https://datalayer.io)

# Datalayer Experiments Jupyter Kernel

```bash
# List the Kernels Specs.
jupyter kernelspec list
```

```bash
cd $EXPHOME/play/jupyter/kernel/python
```

## Kernel Server

```bash
# Kernel Server.
python jupyter_kernel/server/echo-kernel.py
```

```bash
# Launch a Kernel Server.
jupyter kernel
# [KernelApp] Starting kernel 'python3'
# [KernelApp] Connection file: .../Library/Jupyter/runtime/kernel-217c09c0-44eb-48bd-ab50-3c5c42754d8c.json
# [KernelApp] To connect a client: --existing kernel-217c09c0-44eb-48bd-ab50-3c5c42754d8c.json
```

```bash
jupyter console --existing $(jupyter --runtime-dir)/kernel-62405.json
jupyter qtconsole --existing $(jupyter --runtime-dir)/kernel-62405.json
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

## Kernel Client

```bash
# Kernel Client.
python jupyter_kernel/client/client-1.py 62405
python jupyter_kernel/client/client-2.py
python jupyter_kernel/client/client-3.py
python jupyter_kernel/client/client-4.py
python jupyter_kernel/client/client-5.py
```
