import boto3

import logging


logger = logging.getLogger("__name__")


__DEFAULT_BUCKET_NAME = 'datalayer-outputs'

__DEFAULT_EXTENSION_NAME = 'png'

__CDN_HOST = 'https://diugs92wn0os.cloudfront.net'


def put_output(username, output_type, output_name, binary_content, extension_name = __DEFAULT_EXTENSION_NAME, bucket_name = __DEFAULT_BUCKET_NAME):
    client = boto3.client('s3')
    s3_path = __s3_path(username, output_type, output_name, extension_name)
    client.put_object(
        Body = binary_content,
        Bucket = bucket_name,
        Key = s3_path,
        )
    return f'{__CDN_HOST}/{s3_path}'


def get_output(username, output_type, output_name, extension_name = __DEFAULT_EXTENSION_NAME, bucket_name = __DEFAULT_BUCKET_NAME):
    client = boto3.client('s3')
    obj = client.get_object(
        Bucket = bucket_name,
        Key = __s3_path(username, output_type, output_name, extension_name),
        )
    return obj.get()['Body'].read()


def __s3_path(username, output_type, output_name, extension_name):
    s3_path = f'{username}/{output_type}/{output_name}.{extension_name}'
    logger.info(f'Created path for S3 object {s3_path}')
    return s3_path
