from airflow.utils.log.logging_mixin import LoggingMixin

import boto3
from botocore.client import Config
from botocore.exceptions import ClientError

log = LoggingMixin().log

def file_exists(client, bucket, prefix=''):
    """
    Checks if the given prefix exists in the specified S3 bucket
    """
    try:
        objects = client.list_objects(
            Bucket=bucket,
            Prefix=prefix
        )

        result = 'Contents' in objects and bool(objects['Contents'])
    except ClientError as err:
        log.error(err)
        result = False
    return result

def get_s3_client(**kwargs):
    """
    Setup client for interaction with S3 service
    If localstack_host is provided, the S3 client is configured for
    communication with a Localstack instance.
    """
    if 'localstack_host' in kwargs:
        log.warning('S3 Client for localstack')
        s3_client = boto3.client(
            service_name='s3',
            region_name='eu-west-1',
            endpoint_url='http://{}:4572'.format(kwargs['localstack_host']),
            aws_access_key_id='foo',
            aws_secret_access_key='bar',
            config=Config(s3={
                'addressing_style': 'path',
            })
        )
    else:
        s3_client = boto3.client('s3')
    return s3_client
