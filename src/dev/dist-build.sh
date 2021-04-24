#!/usr/bin/env bash

# Copyright (c) Datalayer, Inc https://datalayer.io
# Distributed under the terms of the MIT License.

echo
echo -e "\x1b[34m\x1b[43mBuilding Distribution - Version $DLAVERSION\x1b[0m"
echo

cd $DLAHOME/src && \
  yarn && \
  yarn build:prod

### utils # http://localhost:3009 # dspUtils.js # NA
# rm $DLAHOME/src/dsp/utils/dist/index.html
cp -r $DLAHOME/src/dsp/utils/dist/* $DLAHOME/src/dist

### widgets # http://localhost:3002 # dspWidgets.js # NA
# rm $DLAHOME/src/dsp/widgets/dist/index.html
cp -r $DLAHOME/src/dsp/widgets/dist/* $DLAHOME/src/dist

### library # NA # NA # 9800

### auth  # http://localhost:3001 # dspAuth.js # 9700
cp -r $DLAHOME/src/dsp/auth/dist/* $DLAHOME/src/dist

### studio # http://localhost:3003 # 9600
# cp -r $DLAHOME/src/dsp/studio/dist/* $DLAHOME/src/dist

### landing # http://localhost:3004 # 9500
# cp -r $DLAHOME/src/dla/landing/dist/* $DLAHOME/src/dist

### fix dist
sed -i.bu "s|http://localhost:3009|${CDN_URL}|g" $DLAHOME/src/dist/*.js
sed -i.bu "s|http://localhost:3002|${CDN_URL}|g" $DLAHOME/src/dist/*.js
sed -i.bu "s|http://localhost:3001|${CDN_URL}|g" $DLAHOME/src/dist/*.js
# sed -i.bu "s|http://localhost:3003|${CDN_URL}|g" $DLAHOME/src/dist/*.js
# sed -i.bu "s|http://localhost:3004|${CDN_URL}|g" $DLAHOME/src/dist/*.js
#
sed -i.bu "s|http://localhost:3009|${CDN_URL}|g" $DLAHOME/src/dist/*.html
sed -i.bu "s|http://localhost:3002|${CDN_URL}|g" $DLAHOME/src/dist/*.html
sed -i.bu "s|http://localhost:3001|${CDN_URL}|g" $DLAHOME/src/dist/*.html
# sed -i.bu "s|http://localhost:3003|${CDN_URL}|g" $DLAHOME/src/dist/*.html
# sed -i.bu "s|http://localhost:3004|${CDN_URL}|g" $DLAHOME/src/dist/*.html

sed -i.bu "s|http://localhost:9700|https://datalayer.io|g" $DLAHOME/src/dist/*.html
sed -i.bu "s|http://localhost:9800|https://datalayer.io|g" $DLAHOME/src/dist/*.html
sed -i.bu "s|http://minikube.local|https://datalayer.io|g" $DLAHOME/src/dist/*.html
sed -i.bu "s|ws://minikube.local|wss://datalayer.io|g" $DLAHOME/src/dist/*.html

sed -i.bu "s|Datalayer DEV|Datalayer|g" $DLAHOME/src/dist/*.html

MAIN_JS=$(ls $DLAHOME/src/dist/main.*dspAuth.js)
cp $MAIN_JS $DLAHOME/src/dist/main.dspAuth.js

# cp $DLAHOME/src/dist/index.html $DLAHOME/src/dsp/auth/index-dist.html

rm $DLAHOME/src/dist/*.bu

echo
echo -e "\x1b[34m\x1b[43mListing Distribution - Version $DLAVERSION\x1b[0m"
echo

ls $DLAHOME/src/dist
