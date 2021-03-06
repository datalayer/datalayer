import os

from s3contents import S3ContentsManager

c = get_config()

# Tell Jupyter to use S3ContentsManager for all storage.
c.NotebookApp.contents_manager_class=S3ContentsManager
c.S3ContentsManager.access_key_id=os.environ['AWS_ACCESS_KEY_ID']
c.S3ContentsManager.secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY']
c.S3ContentsManager.endpoint_url='http://localhost:9450'
c.S3ContentsManager.bucket = 'datalayer'
c.S3ContentsManager.prefix = 'ui'
