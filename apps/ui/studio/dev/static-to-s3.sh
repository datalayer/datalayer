#!/usr/bin/env bash

# Copyright (c) Datalayer https://datalayer.io
# Distributed under the terms of the Apache License, Version 2.0
# https://www.apache.org/licenses/LICENSE-2.0.txt

echo -e "\x1b[34m\x1b[43mCopying static assets to AWS S3\x1b[0m"

aws s3 cp $DLAHOME/apps/ui/studio/build/static s3://datalayer/static --recursive
aws s3 cp $DLAHOME/apps/ui/studio/build/img s3://datalayer/img --recursive

sed -e "s|/static/|https://d1klwlf7zy9tdr.cloudfront.net/static/|g" $DLAHOME/apps/ui/studio/build/index.html > /tmp/index1.html
sed -e "s|a.src=s.p+\"static/js/\"|a.src=\"https://d1klwlf7zy9tdr.cloudfront.net/static/js/\"|g" /tmp/index1.html > /tmp/index2.html
cp /tmp/index2.html $DLAHOME/apps/ui/studio/build/index.html
