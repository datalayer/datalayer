# Ubuntu 18.04.1 LTS Bionic
# FROM $HUB_ORG/kernel-py:$TAG
FROM elyra/kernel-py:2.0.0

ENV SPARK_VER 2.4.1
ENV SPARK_HOME /opt/spark
ENV KERNEL_LANGUAGE python
ENV R_LIBS_USER $R_LIBS_USER:${SPARK_HOME}/R/lib
ENV PATH $PATH:$SPARK_HOME/bin

USER root

RUN apt-get update && \
    apt-get install -yq --no-install-recommends \
    openjdk-8-jdk \
    less \
    curl \
    libssl-dev \
    maven \
    && rm -rf /var/lib/apt/lists/*

ENV JAVA_HOME /usr/lib/jvm/java-1.8.0-openjdk-amd64

# Download and install Spark.
# RUN curl -s https://archive.apache.org/dist/spark/spark-${SPARK_VER}/spark-${SPARK_VER}-bin-without-hadoop.tgz | \
#     tar -xz -C /opt && \
#     ln -s ${SPARK_HOME}-${SPARK_VER}-bin-without-hadoop $SPARK_HOME

RUN curl -s https://datalayer-dist.s3.us-west-2.amazonaws.com/0.0.1/spark-2.4.1-bin-hadoop-2.9.0.tgz | \
  tar -xz -C /opt && \
  ln -s ${SPARK_HOME}-${SPARK_VER}-bin-without-hadoop $SPARK_HOME

# ENV MAVEN_OPTS "-Xmx8g -Xms2g -XX:ReservedCodeCacheSize=2g"
# ADD build-spark.sh /opt
# RUN curl -Lo /opt/spark-2.4.4.zip https://codeload.github.com/apache/spark/zip/v2.4.4
# RUN cd /opt && \
#   unzip spark-2.4.4.zip && \
#   /opt/build-spark.sh
# RUN ln -s /opt/spark-2.4.4 $SPARK_HOME

# ENV HADOOP_HOME /opt/hadoop-2.9.2
# ENV PATH $HADOOP_HOME/bin:$PATH
# RUN curl -s https://archive.apache.org/dist/hadoop/common/hadoop-2.9.2/hadoop-2.9.2.tar.gz | \
#   tar -xz -C /opt && \
#   ln -s ${HADOOP_HOME}-2.9.2 $HADOOP_HOME
# ENV SPARK_DIST_CLASSPATH /opt/hadoop-2.9.2/etc/hadoop:/opt/hadoop-2.9.2/share/hadoop/common/lib/*:/opt/hadoop-2.9.2/share/hadoop/common/*:/opt/hadoop-2.9.2/share/hadoop/hdfs:/opt/hadoop-2.9.2/share/hadoop/hdfs/lib/*:/opt/hadoop-2.9.2/share/hadoop/hdfs/*:/opt/hadoop-2.9.2/share/hadoop/yarn:/opt/hadoop-2.9.2/share/hadoop/yarn/lib/*:/opt/hadoop-2.9.2/share/hadoop/yarn/*:/opt/hadoop-2.9.2/share/hadoop/mapreduce/lib/*:/opt/hadoop-2.9.2/share/hadoop/mapreduce/*:/opt/hadoop-2.9.2/contrib/capacity-scheduler/*.jar

# Download entrypoint.sh from matching tag
# Use tini from Anaconda installation
RUN cd /opt/ && \
    wget https://raw.githubusercontent.com/apache/spark/v${SPARK_VER}/resource-managers/kubernetes/docker/src/main/dockerfiles/spark/entrypoint.sh && \
    chmod a+x /opt/entrypoint.sh && \
    sed -i 's/tini -s/tini -g/g' /opt/entrypoint.sh && \
    ln -sfn /opt/conda/bin/tini /sbin/tini

WORKDIR $SPARK_HOME/work-dir
# Ensure that work-dir is writable by everyone
RUN chmod 0777 $SPARK_HOME/work-dir

ENTRYPOINT [ "/opt/entrypoint.sh" ]

USER jovyan
