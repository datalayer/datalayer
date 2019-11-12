#!/usr/bin/env bash

# Copyright (c) Datalayer https://datalayer.io
# Distributed under the terms of the Apache License, Version 2.0
# https://www.apache.org/licenses/LICENSE-2.0.txt

echo -e "\x1b[34m\x1b[43mCopying Static Assets to AWS S3\x1b[0m"

aws s3 cp $DLAHOME/gui/modules/explorer/build/static s3://datalayer/static --recursive
aws s3 cp $DLAHOME/gui/modules/explorer/build/img s3://datalayer/img --recursive

sed -ie "s|/static/|https://d1klwlf7zy9tdr.cloudfront.net/static/|g" $DLAHOME/gui/modules/explorer/build/index.html
sed -ie "s|a.src=s.p+\"static/js/\"|a.src=\"https://d1klwlf7zy9tdr.cloudfront.net/static/js/\"|g" $DLAHOME/gui/modules/explorer/build/index.html
