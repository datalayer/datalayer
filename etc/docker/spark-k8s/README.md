# Spark on K8S Docker Image

Build and push this Docker image.

```bash
make build
make push
```

<!--
export HADOOP_VERSION=2.9.1
export SPARK_VERSION=2.3.2
export AWS_ACCOUNT_ID=<your numeric AWS account id>
export ECR_REGION=us-east-1
# Fetch and extract the spark source
curl -L "https://archive.apache.org/dist/spark/spark-${SPARK_VERSION}/spark-${SPARK_VERSION}.tgz" | tar -xzvf - 

cd "spark-${SPARK_VERSION}"
# set maven opts according to https://spark.apache.org/docs/latest/building-spark.html
export MAVEN_OPTS="-Xmx2g -XX:ReservedCodeCacheSize=512m"

./dev/make-distribution.sh --name hadoop${HADOOP_VERSION} -Dhadoop.version=${HADOOP_VERSION}  -Phadoop-2.7 -Phive -Phive-thriftserver -Pkubernetes

cd dist

# create the ECR repository called spark, which docker-image-tool expects the name to be
aws ecr create-repository --repository-name spark
# login into ecr 
$(aws ecr --region us-east-1 get-login --no-include-email)
bin/docker-image-tool.sh -r ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com -t ${SPARK_VERSION}-hadoop${HADOOP_VERSION} build
# push the image to ECR
bin/docker-image-tool.sh -r ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com -t ${SPARK_VERSION}-hadoop${HADOOP_VERSION} push

# create docker file with S3A dependencies added 
docker build -t ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/spark:${SPARK_VERSION}-hadoop${HADOOP_VERSION}_S3A - << EOF
FROM ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/spark:${SPARK_VERSION}-hadoop${HADOOP_VERSION}
ADD http://central.maven.org/maven2/org/apache/hadoop/hadoop-aws/2.9.1/hadoop-aws-2.9.1.jar /opt/spark/jars
ADD http://central.maven.org/maven2/com/amazonaws/aws-java-sdk-s3/1.11.419/aws-java-sdk-s3-1.11.419.jar /opt/spark/jars
ADD http://central.maven.org/maven2/com/amazonaws/aws-java-sdk-core/1.11.419/aws-java-sdk-core-1.11.419.jar /opt/spark/jars
ADD http://central.maven.org/maven2/com/amazonaws/aws-java-sdk-kms/1.11.419/aws-java-sdk-kms-1.11.419.jar /opt/spark/jars
RUN echo -e 'spark.hadoop.fs.s3a.impl=org.apache.hadoop.fs.s3a.S3AFileSystem\nspark.hadoop.fs.s3a.aws.credentials.provider=com.amazonaws.auth.DefaultAWSCredentialsProviderChain' > /opt/spark/conf/spark-defaults.conf

EOF
-->