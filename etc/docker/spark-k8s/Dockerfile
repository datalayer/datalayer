FROM datalayer/kernel-spark-py:0.0.1

USER root

RUN apt update && \
  apt install -y curl jq

RUN curl -Lo $SPARK_HOME/jars/hadoop-aws-2.9.0.jar \
  http://central.maven.org/maven2/org/apache/hadoop/hadoop-aws/2.9.0/hadoop-aws-2.9.0.jar
RUN curl -Lo $SPARK_HOME/jars/aws-java-sdk-bundle-1.11.199.jar \
  http://central.maven.org/maven2/com/amazonaws/aws-java-sdk-bundle/1.11.199/aws-java-sdk-bundle-1.11.199.jar

USER jovyan

RUN pip install --no-cache-dir \
  awscli \
  pyspark
