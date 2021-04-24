---
title: Jupyter FS
---

# Jupyter FS

[Jupyter FS](https://github.com/jpmorganchase/jupyter-fs)

- https://github.com/jpmorganchase/jupyter-fs/issues/36
- https://github.com/grey280/grey280.github.io/blob/master/JupyterLab-CompetitiveAnalysis.pdf

File Tree https://github.com/youngthejames/jupyterlab_filetree

## Install

```bash
cd $DLAHOME/repos/jupyter-fs && \
  pip install -e . && \
  pip install s3contents && \
  jupyter labextension install jupyter-fs && \
  jupyter serverextension enable --py jupyterfs
```

## Configure

Add the following to your `jupyter_notebook_config.json`.

```json
{
  "NotebookApp": {
    "contents_manager_class": "jupyterfs.meta_contents_manager.MetaContentsManager",
    "nbserver_extensions": {
      "jupyterfs": true
    }
  }
}
```

```bash
jupyter lab --NotebookApp.contents_manager_class=jupyterfs.metamanager.MetaManager
```

Register additional contents managers in your `jupyter_notebook_config.py`.

As an example, an S3Contents manager is added as follows:

```python
from s3contents import S3ContentsManager
c.JupyterFS.contents_managers = \
{
    's3': S3ContentsManager
}
c.S3ContentsManager.bucket = '<your bucket>'
c.S3ContentsManager.access_key_id = '<your access key>'
c.S3ContentsManager.secret_access_key = '<your secret key>'
```

During application startup, you should see something like this in the logs:

```bash
Installing JupyterFS handler on path /multicontents
```

##  Use

Add specifications for additional contents managers in your user settings (in the Settings menu under Advanced Settings Editor -> jupyter-fs). Here's an example of how to set up two new views of the local filesystem.

```json
{
  "specs": [
    {
      "name": "Downloads",
      "url": "osfs:///Users/.../Downloads"
    },
    {
      "name": "Desktop",
      "url": "osfs:///Users/.../repos/jupyter-fs"
    },
    {
      "name": "s3-...",
      "url": "s3://..."
    }
  ]
}
```

And in the UI, you will see your contents managers available.

https://raw.githubusercontent.com/jpmorganchase/jupyter-fs/master/docs/osfs_example.png

https://raw.githubusercontent.com/jpmorganchase/jupyter-fs/master/docs/remote_example.png

We can add additional contents managers.

```python
c.MultiContentsManager.contents_managers = \
{
    's3': S3ContentsManager,
    'minio': S3ContentsManager,
    'file2': AbsolutePathFileManager(root_dir=os.path.expanduser("~/Downloads"))
}
```

Here I utilize an `AbsolutePathFileManager` to grab another folder on my system for use.

Remember, remote filesystems are still remote, and locally you may need to move around the filesystem with a `os.chdir` command (or equivalent in other languages).

Here, I have the above `s3` and `AbsolutePathFileManager`, along with the original contents manager, for a total of 3 seperate spaces.
