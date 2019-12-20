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

## Server

```bash
# Kernel Server.
python server/echo-kernel.py
```

## Client

```bash
# Kernel Client.
python client/client-1.py 217c09c0-44eb-48bd-ab50-3c5c42754d8c
python client/client-2.py
python client/client-3.py
python client/client-4.py
python client/client-5.py
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

## Kernel Management

A `Kernel Spec` is a directory with a `kernel.json` file.

A `Kernel Type` is anything discovered through the JKM machinery (which includes the `Kernel Specs`, exposed with the spec/ prefix). This has:

+ A `Kernel Type ID`: the qualified string (e.g. spec/python3).
+ A `Kernel Type Metadata`: the dictionary from find_kernels with more details about that Kernel Type.

The `Kernel Instances` are the specific processes created by launching a Kernel Kype.

Install Kernel Management 

```bash
cd $DLAHOME/lab/jupyter-kernel-mgmt && \
  pip uninstall -y jupyter_protocol && \
  pip uninstall -y jupyter_kernel_mgmt && \
  pip uninstall -y jupyter_server && \
  pip uninstall -y notebook && \
  pip uninstall -y nbclassic && \
  python setup.py develop
```

Build Kernel Management 

```bash
conda deactivate && \
  conda remove -y --name dlab_jkm --all || true && \
  conda create -y -n dlab_jkm python=3.7 nodejs && \
  conda activate dlab_jkm && \
  git clone https://github.com/takluyver/jupyter_protocol --branch master --single-branch --depth 1 && \
  cd jupyter_protocol && python setup.py develop && cd .. && \
  git clone https://github.com/takluyver/jupyter_kernel_mgmt --branch master --single-branch --depth 1 && \
  cd jupyter_kernel_mgmt && python setup.py develop && cd .. && \
  git clone https://github.com/kevin-bates/jupyter_server.git --branch jupyter-kernel-mgmt --single-branch --depth 1 && \
  cd jupyter_server && python setup.py develop && cd .. && \
  git clone https://github.com/zsailer/notebook.git --branch notebook-ext --single-branch --depth 1 && \
  cd notebook && python setup.py develop && cd ..
```

Start

```bash
jupyter notebook
jupyter server --ServerApp.jpserver_extensions="{'notebook': True}"
open http://localhost:8888/tree
```

Async

+ Async support for Kernel Management [#23](https://github.com/takluyver/jupyter_kernel_mgmt/pull/23).

[DEPRECATED] Notebook

+ [DEPRECATED] Use new kernel management APIs in notebook server 6.x [#4837](https://github.com/jupyter/notebook/pull/4837).
+ [DEPRECATED] Use new kernel management APIs in notebook server [#4170](https://github.com/jupyter/notebook/pull/4170) is superseded by #4837.
+ [DEPRECATED] Add support for async kernel management [#4479](https://github.com/jupyter/notebook/pull/4479).
