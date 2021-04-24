[![Datalayer](https://raw.githubusercontent.com/datalayer/datalayer/main/res/logo/datalayer-25.svg?sanitize=true)](https://datalayer.io)

# 🌕 Traitlets Config Examples

```bash
python load_config.py --NotebookApp.hello=notebook --ServerApp.hello=server --NewApp.hello=new
# {'NotebookApp': {'allow_credentials': False, 'port': 8889, 'password_required': True, 'hello': 'notebook'}, 'ServerApp': {'hello': 'server'}, 'NewApp': {'hello': 'new'}}
```
