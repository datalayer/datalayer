[![Datalayer](https://raw.githubusercontent.com/datalayer/datalayer/main/res/logo/datalayer-25.svg?sanitize=true)](https://datalayer.io)

# Minilab Thebe Experiments

[TheBe](https://github.com/executablebooks/thebe).

[Examples](https://github.com/executablebooks/thebe/tree/master/examples).

[Docs](https://thebe.readthedocs.io).

## Simple Server

```bash
python -m http.server -d ./examples
open http://localhost:8000
```

```bash
git clone https://github.com/executablebooks/thebe && \
  python -m http.server -d ./thebe/examples
open http://localhost:8000
open http://localhost:8000/demo.html
```

## Notebook Server

```bash
jupyter notebook \
  --port 8888 \
  --notebook-dir=./demo \
  --NotebookApp.token=thebe_secret \
  --NotebookApp.allow_origin="*"
open http://localhost:8888/view/index.html
```
