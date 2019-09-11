---
title: Connectors
---

# Connectors

This module ensures the connection to external products and services, in respect of legal and technical constraints.

## Quilt Data

[Quilt Data](https://quiltdata.com).

## AWS Open Datasets Connector

+ https://registry.opendata.aws
+ https://github.com/awslabs/open-data-registry

e.g.

https://s3.eu-central-1.amazonaws.com/dwd-pds-help
https://s3.eu-central-1.amazonaws.com/cgiardata
https://cgiardata.s3-us-west-2.amazonaws.com

## Azure Open Datasets Connector

+ https://azure.microsoft.com/en-gb/services/open-datasets
+ https://docs.microsoft.com/en-us/azure/sql-database/sql-database-public-data-sets

```python
# https://azure.microsoft.com/fr-fr/services/open-datasets/catalog/noaa-integrated-surface-data

import os, sys

# pip install packages.
!{sys.executable} -m pip install azure-storage
!{sys.executable} -m pip install pyarrow
!{sys.executable} -m pip install pandas

# Azure storage access info.
azure_storage_account_name = "azureopendatastorage"
azure_storage_sas_token = r""
container_name = "isdweatherdatacontainer"
folder_name = "ISDWeather/"

if azure_storage_account_name is None or azure_storage_sas_token is None:
    raise Exception("Provide your specific name and key for your Azure Storage account--see the Prerequisites section earlier.")

from azure.storage.blob import BlockBlobService

print('Looking for the first parquet under the folder ' + folder_name + ' in container "' + container_name + '"...')

blob_service = BlockBlobService(account_name = azure_storage_account_name, sas_token = azure_storage_sas_token,)
blobs = blob_service.list_blobs(container_name)
sorted_blobs = sorted(list(blobs), key=lambda e: e.name, reverse=True)
targetBlobName=''
for blob in sorted_blobs:
    if blob.name.startswith(folder_name) and blob.name.endswith('.parquet'):
        targetBlobName = blob.name
        break

print('Target blob to download: ' + targetBlobName)
_, filename = os.path.split(targetBlobName)
parquet_file=blob_service.get_blob_to_path(container_name, targetBlobName, filename)

# Read the local parquet file into Pandas dataframe.
import pyarrow.parquet as pq
import pandas as pd

appended_df = []
print('Reading the local parquet file into Pandas data frame')
df = pq.read_table(filename).to_pandas()

# You can add your filter at below.
print('Loaded as a Pandas data frame: ')
df
```

```python
# https://azure.microsoft.com/fr-fr/services/open-datasets/catalog/seattle-safety-data/

# Azure storage access info
blob_account_name = "azureopendatastorage"
blob_container_name = "citydatacontainer"
blob_relative_path = "Safety/Release/city=Seattle"
blob_sas_token = r""

# Allow SPARK to read from Blob remotely
wasbs_path = 'wasbs://%s@%s.blob.core.windows.net/%s' % (blob_container_name, blob_account_name, blob_relative_path)
spark.conf.set(
  'fs.azure.sas.%s.%s.blob.core.windows.net' % (blob_container_name, blob_account_name),
  blob_sas_token)
print('Remote blob path: ' + wasbs_path)

# SPARK read parquet, note that it won't load any data yet by now
df = spark.read.parquet(wasbs_path)
print('Register the DataFrame as a SQL temporary view: source')
df.createOrReplaceTempView('source')

# Display top 10 rows
print('Displaying top 10 rows: ')
display(spark.sql('SELECT * FROM source LIMIT 10'))
```

## EU Ameco Connector

[EU Ameco](https://ec.europa.eu/info/business-economy-euro/indicators-statistics/economic-databases/macro-economic-database-ameco/ameco-database_en).

## Social Connectors

In most cases, there are REST API endpoints  being protected by OAuth authentication.

We are working on the following connectors:

+ Twitter.
+ Facebook.
+ Linkedin.

The underlying technical library is hosted on the [Datalayer Platform](https://github.com/datlayer/datalayer) repository.
