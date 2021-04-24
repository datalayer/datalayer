#!/usr/bin/env bash

# Copyright (c) Datalayer, Inc https://datalayer.io
# Distributed under the terms of the MIT License.

# export CDN_URL=//assets.datalayer.io/assets/dsp/${DLAVERSION}
export CDN_URL=//d1klwlf7zy9tdr.cloudfront.net/assets/dsp/${DLAVERSION}

echo
echo -e "\x1b[34m\x1b[43mCleaning Distribution - Version $DLAVERSION\x1b[0m"
echo

cd $DLAHOME/src && \
  make clean && \
  rm -fr $DLAHOME/src/dist && \
  mkdir $DLAHOME/src/dist

$DLAHOME/src/dev/dist-build.sh

echo
echo -e "\x1b[34m\x1b[43mCopying Distribution to AWS S3 - Version $DLAVERSION\x1b[0m"
echo

aws s3 rm \
  s3://datalayer-assets/assets/dsp/$DLAVERSION/ \
  --recursive \
  --profile datalayer
aws s3 cp \
  $DLAHOME/src/dist \
  s3://datalayer-assets/assets/dsp/$DLAVERSION \
  --recursive \
  --profile datalayer
aws s3 ls \
  s3://datalayer-assets/assets/dsp/$DLAVERSION/ \
  --profile datalayer

echo -e "\x1b[34m\x1b[43mTest dist - Version $DLAVERSION\x1b[0m"
echo
echo 🚀 open https://assets.datalayer.io/assets/dsp/$DLAVERSION/index.html
echo 🚀 open https://d1klwlf7zy9tdr.cloudfront.net/assets/dsp/$DLAVERSION/index.html
echo
echo ✨ $DLAHOME/src/dev/dist-serve.sh
echo
