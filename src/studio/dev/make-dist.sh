#!/usr/bin/env bash

# Copyright (c) Datalayer https://datalayer.io
# Distributed under the terms of the Apache License, Version 2.0
# https://www.apache.org/licenses/LICENSE-2.0.txt

./node_modules/.bin/uglifyjs dist/@datalayer/studio.js -o dist/@datalayer/studio.min.js -c -m

TARGET_FOLDER="ui"
# rm -fr $TARGET_FOLDER
# yarn install
# yarn build:dist
rm -fr $TARGET_FOLDER
mkdir $TARGET_FOLDER
cp index.min.html $TARGET_FOLDER/index.html
mkdir -p $TARGET_FOLDER/dist/@datalayer
# cp dist/@datalayer/studio.js $TARGET_FOLDER/dist/@datalayer
cp dist/@datalayer/studio.min.js $TARGET_FOLDER/dist/@datalayer
cp -r css $TARGET_FOLDER
cp -r fonts $TARGET_FOLDER
cp -r img $TARGET_FOLDER
cp -r resources $TARGET_FOLDER
# cp dev/server.sh $TARGET_FOLDER
