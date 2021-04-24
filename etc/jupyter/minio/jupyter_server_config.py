import os

from s3contents import S3ContentsManager

# Tell Jupyter to use S3ContentsManager for all storage.
c.ServerApp.contents_manager_class = S3ContentsManager

c.S3ContentsManager.access_key_id = os.environ['DSP_MINIO_ACCESS_KEY']
c.S3ContentsManager.secret_access_key = os.environ['DSP_MINIO_SECRET_KEY']

del os.environ['DSP_MINIO_ACCESS_KEY']
del os.environ['DSP_MINIO_SECRET_KEY']

# c.S3ContentsManager.session_token = '{{ AWS Session Token / AUTH Session Token }}'
c.S3ContentsManager.endpoint_url = 'https://minio.dsp-minio.svc.cluster.local:9000'
c.S3ContentsManager.bucket = 'datalayer'

# c.S3ContentsManager.prefix = "this/is/a/prefix/on/the/s3/bucket"
# c.S3ContentsManager.sse = "AES256"
# c.S3ContentsManager.signature_version = "s3v4"
# c.S3ContentsManager.init_s3_hook = init_function  # See AWS key refresh
