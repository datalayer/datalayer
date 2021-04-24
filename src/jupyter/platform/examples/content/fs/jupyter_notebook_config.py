import os
from jupyterfs.contents_managers.absolute import AbsolutePathFileManager
from s3contents import S3ContentsManager

# from jupyterfs.metamanager import MetaManager
# c.contents_manager_class = jupyterfs.metamanager.MetaManager

c.JupyterFS.contents_managers = \
{
    's3': S3ContentsManager,
    'minio': S3ContentsManager,
    'desktop': AbsolutePathFileManager(root_dir=os.path.expanduser("~/Desktop")),
}

c.S3ContentsManager.bucket = 'tmp'
# c.S3ContentsManager.access_key_id = os.environ['ACCESS_KEY_ID']
# c.S3ContentsManager.secret_access_key = os.environ['SECRET_ACCESS_KEY']
c.S3ContentsManager.access_key_id = 'AKIAIOSFODNN7EXAMPLE'
c.S3ContentsManager.secret_access_key = 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY'

c.JupyterFS.specs = [
    {
      "name": "Downloads",
      "url": "osfs:///Users/echar4/Downloads"
    },
    {
      "name": "Desktop",
      "url": "osfs:///Users/echar4/repos/jupyter-fs"
    },
    {
      "name": "s3-projects",
      "url": "s3://datalayer-projects/eric"
    },
    {
      "name": "minio",
      "url": "s3://foo?endpoint_url=http://localhost:9001"
    },
]
