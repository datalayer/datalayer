import os
from jupyters3 import JupyterS3, JupyterS3SecretAccessKeyAuthentication

c = get_config()

c.NotebookApp.contents_manager_class = JupyterS3

c.JupyterS3.aws_region='us-west-2'
c.JupyterS3.aws_s3_bucket='datalayer'
c.JupyterS3.aws_s3_host='s3-eu-west-2.amazonaws.com'
c.JupyterS3.prefix=''

from jupyters3 import JupyterS3SecretAccessKeyAuthentication
c.JupyterS3.authentication_class = JupyterS3SecretAccessKeyAuthentication

c.JupyterS3SecretAccessKeyAuthentication.aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID']
c.JupyterS3SecretAccessKeyAuthentication.aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY']
