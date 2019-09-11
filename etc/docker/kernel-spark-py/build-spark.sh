#!/usr/bin/env bash

# Copyright (c) Datalayer https://datalayer.io
# Distributed under the terms of the Apache License, Version 2.0
# https://www.apache.org/licenses/LICENSE-2.0.txt

if [ -z "$1" ]
then
  export FLAVOR=2.4
else
  export FLAVOR=$1
fi

export HADOOP_VERSION=2.9.0

case "$FLAVOR" in

  2.4)
    export SPARK_VERSION=2.4.1
    ;;

  2.2)
    export SPARK_VERSION=2.2.0-k8s-0.5.0
    ;;

  *)
    echo "Unknown Flavor: $FLAVOR" 1>&2
    echo
    exit 1

esac

echo SPARK_VERSION: $SPARK_VERSION
echo HADOOP_VERSION: $HADOOP_VERSION
echo

# Install netlib-java on Ubuntu
# sudo apt-get install libatlas3-base libopenblas-base
# sudo update-alternatives --config libblas.so
# sudo update-alternatives --config libblas.so.3
# sudo update-alternatives --config liblapack.so
# sudo update-alternatives --config liblapack.so.3

cd /opt/spark-2.4.4

echo

function mvn_install() {
  cd /opt/spark-2.4.4
  mvn install \
    -Pkubernetes \
    -Pbigtop-dist \
    -Pnetlib-lgpl \
    -Phadoop-2.7 \
    -Dhadoop.version=$HADOOP_VERSION \
    -Pyarn \
    -Dyarn.version=$HADOOP_VERSION \
    -Psparkr \
    -Phive \
    -Phive-thriftserver \
    -Dmaven.javadoc.skip=true \
    -Dcheckstyle.skip=true \
    -Dscalastyle.skip=true \
    -Drat.skip=true \
    -Dcobertura.skip=true \
    -DskipTests \
    "$@"
}

function build() {
  cd /opt/spark-2.4.4
  ./dev/make-distribution.sh \
    --tgz \
    --name hadoop-$HADOOP_VERSION \
    -Pkubernetes \
    -Pbigtop-dist \
    -Pnetlib-lgpl \
    -Phadoop-2.7 \
    -Dhadoop.version=$HADOOP_VERSION \
    -Psparkr \
    -Pyarn \
    -Dyarn.version=$HADOOP_VERSION \
    -Phive \
    -Phive-thriftserver \
    -Dmaven.javadoc.skip=true \
    -Dcheckstyle.skip=true \
    -Dscalastyle.skip=true \
    -Drat.skip=true \
    -Dcobertura.skip=true \
    -DskipTests \
    "$@"
}

mvn_install
build
