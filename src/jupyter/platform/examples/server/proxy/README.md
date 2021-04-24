[![Datalayer](https://raw.githubusercontent.com/datalayer/datalayer/main/res/logo/datalayer-25.svg?sanitize=true)](https://datalayer.io)

# Jupyter Server Proxy

```bash
pip install jupyter-server-proxy
```

```bash
# In Terminal 1.
jupyter server
open http://localhost:8888
open http://localhost:8888/test-server
```

```bash
# In Terminal 2.
python -m http.server 9999
open http://localhost:9999
open http://localhost:8888/proxy/9999
open http://localhost:8888/proxy/localhost:9999
```
