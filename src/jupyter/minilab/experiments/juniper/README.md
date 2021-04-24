[![Datalayer](https://raw.githubusercontent.com/datalayer/datalayer/main/res/logo/datalayer-25.svg?sanitize=true)](https://datalayer.io)

# Minilab Juniper Experiments

[Juniper](https://github.com/ines/juniper).

[Online Examples](https://ines.github.io/juniper).

```bash
python -m http.server -d ./demo
open http://localhost:8000
```

```bash
jupyter notebook \
  --port 8888 \
  --notebook-dir=./demo \
  --NotebookApp.token=testsecret \
  --NotebookApp.allow_origin="*"
python -m http.server -d ./demo
open http://localhost:8000/localhost.html
```
