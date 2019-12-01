---
title: Nteract Commuter
---

# Nteract Commuter

Commuter [GitHub](https://github.com/nteract/nteract) repository

Commuter [Source](https://github.com/nteract/nteract/tree/master/applications/commuter) code.

```bash
echo http://localhost:4000
cd $DLAHOME/repos/nteract && \
  yarn && \
  COMMUTER_STORAGE_BACKEND=local && \
  COMMUTER_DISCOVERY_BACKEND=none && \
  COMMUTER_PORT=4000 && \
  COMMUTER_LOCAL_STORAGE_BASEDIRECTORY=~ && \
  COMMUTER_ES_HOST='' && \
  yarn app:commuter
```

```bash
sudo npm install -g @nteract/commuter
COMMUTER_LOCAL_STORAGE_BASEDIRECTORY=/efs/users/ commuter
COMMUTER_BUCKET=sweet-notebooks commuter
```

```bash
# General Environment Variables.
# Environment Variable	Description	Default
COMMUTER_STORAGE_BACKEND	local or s3	local
COMMUTER_DISCOVERY_BACKEND	either elasticsearch or none	"none"
COMMUTER_PORT	Port to run commuter on	4000
COMMUTER_LOCAL_STORAGE_BASEDIRECTORY	directory to serve in local storage mode	process.cwd()
COMMUTER_ES_HOST	ElasticSearch Host	""
```

```bash
# Environment Variables for S3 Storage.
# Environment Variable	Description	Default
COMMUTER_S3_BASE_PREFIX	prefix on the bucket, similar to base directory	""
COMMUTER_S3_PATH_DELIMITER	separator for "paths"	"/"
COMMUTER_BUCKET	bucket contents served from	Required in S3 mode, no default
COMMUTER_S3_KEY	AWS Key	Optional, uses IAM roles or ~/.aws/credentials otherwise
COMMUTER_S3_SECRET	AWS Secret	Optional, uses IAM roles or ~/.aws/credentials otherwise
```
