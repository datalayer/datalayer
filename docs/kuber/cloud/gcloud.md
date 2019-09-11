---
title: Google Cloud
---

# Google Cloud

[Install the Google Cloud SDK](https://cloud.google.com/sdk/install) (Google Cloud a.k.a. `gcloud` or `GCE`).

```bash
gcloud auth login
gcloud init
gcloud config list
gcloud config configurations activate CONFIGURATION_NAME
```

```bash
# Next, to set a zone or region property in the client, run:
gcloud config set compute/zone us-central1-a
gcloud config set compute/region us-central1
# To remove a default property altogether, use the unset command.
gcloud config unset compute/zone
gcloud config unset compute/region
# Env variables.
export CLOUDSDK_COMPUTE_ZONE=us-central1-a
export CLOUDSDK_COMPUTE_REGION=us-central1
```

```bash
gcloud compute instances create instance-1
gcloud compute instances list --format json # --format yaml, or --format text.
```

## GCS Connector

This is for use with the GCS connector https://cloud.google.com/dataproc/docs/concepts/connectors/cloud-storage.

You still need Hadoop configuration to enable gs:// URIs. I usually put those in core-site.xml, but I would assume that using Spark properties should also work.

```
--conf spark.hadoop.fs.gs.project.id=<GCP project ID>
--conf spark.hadoop.fs.gs.system.bucket=<GCP bucket to use for temporary data>
--conf spark.hadoop.agoogle.cloud.auth.service.account.enable=true
--conf spark.hadoop.google.cloud.auth.service.account.json.keyfile=/mnt/secrets/key.json
```

```xml
<?xml version="1.0" ?>
<?xml-stylesheet type="text/xsl" href="configuration.xsl"?>
<configuration>
  <property>
    <name>fs.gs.impl</name>
    <value>com.google.cloud.hadoop.fs.gcs.GoogleHadoopFileSystem</value>
  </property>
  <property>
    <name>fs.AbstractFileSystem.gs.impl</name>
    <value>com.google.cloud.hadoop.fs.gcs.GoogleHadoopFileSystem</value>
  </property>
  <property>
    <name>fs.gs.project.id</name>
    <value>${gs.project.id}</value>
  </property>
</configuration>
```
