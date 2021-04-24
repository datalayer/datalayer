[![Datalayer](https://raw.githubusercontent.com/datalayer/datalayer/main/res/logo/datalayer-25.svg?sanitize=true)](https://datalayer.io)

# Jupyter Content S3

```bash
export AWS_ACCESS_KEY_ID="EXAMPLE"
export AWS_SECRET_ACCESS_KEY="EXAMPLEEXAMPLE"
export JPYNB_S3_ENDPOINT_URL="http://localhost:9450"
aws --endpoint-url http://localhost:9450 s3 ls
# https://github.com/danielfrg/s3contents
jupyter lab \
  --NotebookApp.contents_manager_class=s3contents.S3ContentsManager \
  --conf $EXPHOME/play/jupyter/content/s3/j1.py
# https://github.com/uktrade/jupyters3
jupyter lab \
  --NotebookApp.contents_manager_class=jupyters3.JupyterS3 \
  --conf $EXPHOME/play/jupyter/content/s3/j2.py
```
