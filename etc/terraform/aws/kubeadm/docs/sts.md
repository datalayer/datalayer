# STS

```bash
aws sts assume-role --role-arn "arn:aws:iam::AWS_ACCOUNT_ID:role/kubeadm_role" --role-session-name "JHUB"
```

```python
import boto3
target_account_id = 'AWS_ACCOUNT_ID'
target_role = 'kubeadm_role'
sts_client = boto3.client('sts')
assumedRoleObject = sts_client.assume_role(
  RoleArn="arn:aws:iam::{}:role/{}".format(target_account_id, target_role),
  RoleSessionName="Kubeadm"
)
credentials = assumedRoleObject['Credentials']
aws_access_key_id = credentials['AccessKeyId']
aws_secret_access_key = credentials['SecretAccessKey']
aws_session_token = credentials['SessionToken']
s3 = boto3.client(
  's3',
  aws_access_key_id = aws_access_key_id,
  aws_secret_access_key = aws_secret_access_key,
  aws_session_token = aws_session_token,
)
s3.list_objects(
  Bucket='AWS_S3_BUCKET',
  Prefix='AWS_S3_PREFIX',
)
```
