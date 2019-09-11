---
title: Minio
---

# Minio

## Client

```bash
wget https://dl.minio.io/client/mc/release/linux-amd64/mc
chmod +x mc
mv mc /usr/local/bin
mc --help
# List all buckets from https://play.minio.io:9000
mc ls play
```

```bash
docker pull minio/mc
# docker pull minio/mc:edge
docker run minio/mc ls play
# docker run minio/mc:edge ls play
```

```bash
docker run -it --entrypoint=/bin/sh minio/mc
```

## Minikube

```bash
wget https://raw.githubusercontent.com/minio/minio/master/docs/orchestration/minikube/minio_distributed.sh  
wget https://raw.githubusercontent.com/minio/minio/master/docs/orchestration/minikube/statefulset.yaml
chmod +x ./minio_distributed.sh
./minio_distributed.sh
kubectl port-forward minio-0 9000:9000
```

```bash
helm install \
  --set accessKey=minio \
  --set secretKey=minio123 \
  --set ingress.enabled=false \
  -n minio \
  stable/minio
```

## Config

```bash
mc config host add minikube http://localhost:9000 minio minio123 S3v4
mc ls minikube
mc mb minikube/datalayer-1
mc ls minikube/datalayer-1
echo "hello" > hello.txt
mc cp hello.txt minikube/datalayer-1
mc ls minikube/datalayer-1
mc cat minikube/datalayer-1/hello.txt
mc rm minikube/hello.txt
rm hello.txt
```

## AWS

```bash
# Example - Amazon S3 Cloud Storage
# Get your AccessKeyID and SecretAccessKey by following AWS Credentials Guide.
mc config host add s3 https://s3.amazonaws.com <access-key-id> <secret>
```

## GCloud

```bash
# Example - Google Cloud Storage
# Get your AccessKeyID and SecretAccessKey by following Google Credentials Guide
mc config host add gcs  https://storage.googleapis.com <access-key-id> <secret>
```
