#!/usr/bin/env bash

# Copyright (c) Datalayer, Inc https://datalayer.io
# Distributed under the terms of the MIT License.

start_with_k8s() {

  ./kuber \
    server \
    --apiserver-host="$APISERVER_HOST" \
    --google-api-key="$GOOGLE_API_KEY" \
    --google-client-id="$GOOGLE_CLIENT_ID" \
    --google-redirect="$GOOGLE_REDIRECT" \
    --google-secret="$GOOGLE_SECRET" \
    --google-scope="$GOOGLE_SCOPE" \
    --hdfs="$HDFS" \
    --insecure-bind-address="$KUBER_INSECURE_BIND_ADDRESS" \
    --insecure-port="$KUBER_INSECURE_PORT" \
    --dsp-studio="$DSP_UI" \
    --datalayer-rest="$DSP_API_REST" \
    --datalayer-ws="$DSP_API_WS" \
    --microsoft-application-id="$MICROSOFT_APPLICATION_ID" \
    --microsoft-redirect="$MICROSOFT_REDIRECT" \
    --microsoft-secret="$MICROSOFT_SECRET" \
    --microsoft-scope="$MICROSOFT_SCOPE" \
    --zeppelin-rest="$ZEPPELIN_REST" \
    --zeppelin-ws="$ZEPPELIN_WS" \
    --twitter-consumer-key="$TWITTER_CONSUMER_KEY" \
    --twitter-consumer-secret="$TWITTER_CONSUMER_SECRET" \
    --twitter-redirect="$TWITTER_REDIRECT"

}

start_without_k8s() {

  ./kuber \
    server \
    --insecure-bind-address 0.0.0.0 \
    --apiserver-host http://localhost:8001

}

cd /dla
start_without_k8s
