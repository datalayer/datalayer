---
title: Amazon AWS
---

# Amazon AWS

[AWS Docs](https://docs.aws.amazon.com).

See also.

+ [Cloudposse](https://docs.cloudposse.com).
+ [Cloudcraft](https://cloudcraft.co).

## CLI

```bash
pip install awscli
```

```bash
aws configure
aws configure list
```

```bash
# vi ~/.aws/credentials
[default]
aws_access_key_id=xxx
aws_secret_access_key=xxxxxx
[datalayer]
aws_access_key_id=xxx
aws_secret_access_key=xxxxxx
```

```bash
export AWS_ACCESS_KEY_ID=$(cat ~/.aws/credentials | grep aws_access_key_id | awk -F "= " '{print $2}')
export AWS_SECRET_ACCESS_KEY=$(cat ~/.aws/credentials | grep aws_secret_access_key | awk -F "= " '{print $2}')
export AWS_SESSION_TOKEN=$(cat ~/.aws/credentials | grep aws_session_token | awk -F "= " '{print $2}')
```

```bash
# vi ~/.aws/config 
[default]
region=eu-central-1
[profile datalayer]
region=eu-central-1
```

+ [Endpoints](https://docs.aws.amazon.com/general/latest/gr/rande.html).
+ [Regions](https://docs.aws.amazon.com/general/latest/gr/rande-manage.html).

```bash
# aws ec2 describe-regions --all-regions
aws ec2 describe-regions
```

```
+ us-east-2: US East (Ohio)
+ us-east-1: US East (N. Virginia)
+ us-west-1: US West (N. California)
+ us-west-2: US West (Oregon)
+ ap-east-1: Asia Pacific (Hong Kong)
+ ap-south-1: Asia Pacific (Mumbai)
+ ap-northeast-3: Asia Pacific (Osaka-Local)
+ ap-northeast-2: Asia Pacific (Seoul)
+ ap-southeast-1: Asia Pacific (Singapore)
+ ap-southeast-2: Asia Pacific (Sydney)
+ ap-northeast-1: Asia Pacific (Tokyo)
+ ca-central-1: Canada (Central)
+ cn-north-1: China (Beijing)
+ cn-northwest-1: China (Ningxia)
+ eu-central-1: EU (Frankfurt)
+ eu-west-1: EU (Ireland)
+ eu-west-2: EU (London)
+ eu-west-3: EU (Paris)
+ eu-north-1: EU (Stockholm)
+ sa-east-1: South America (São Paulo)
+ us-gov-east-1: AWS GovCloud (US-East)
+ us-gov-west-1: AWS GovCloud (US)
```

## Amazon Resource Names (ARN)

+ [Amazon Resource Names](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html).

```
arn:partition:service:region:account-id:resource
arn:partition:service:region:account-id:resourcetype/resource
arn:partition:service:region:account-id:resourcetype/resource/qualifier
arn:partition:service:region:account-id:resourcetype/resource:qualifier
arn:partition:service:region:account-id:resourcetype:resource
arn:partition:service:region:account-id:resourcetype:resource:qualifier
```

+ `partition`: The partition that the resource is in. For standard AWS Regions, the partition is aws. If you have resources in other partitions, the partition is aws-partitionname. For example, the partition for resources in the China (Beijing) Region is aws-cn.
+ `service`: The service namespace that identifies the AWS product (for example, Amazon S3, IAM, or Amazon RDS). For a list of namespaces, see AWS Service Namespaces.
+ `region`: The Region that the resource resides in. Note that the ARNs for some resources do not require a Region, so this component might be omitted.
+ `account`: The ID of the AWS account that owns the resource, without the hyphens. For example, 123456789012. Note that the ARNs for some resources don't require an account number, so this component might be omitted.
+ `resource`, `resourcetype:resource`, or `resourcetype/resource`: The content of this part of the ARN varies by service. It often includes an indicator of the type of resource - for example, an IAM user or Amazon RDS database - followed by a slash (/) or a colon (:), followed by the resource name itself. Some services allow paths for resource names, as described in [Paths in ARNs](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html#arns-paths).

## Organizations

+ [Organizations](https://aws.amazon.com/organizations).
+ [Organizations Docs](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html).
+ [Tutorial: Creating and Configuring an Organization](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_tutorials_basic.html).

## Identity

+ [Identity](https://aws.amazon.com/identity).

## Identity and Access Management (IAM)

+ [IAM](https://aws.amazon.com/iam).

```bash
aws iam get-user
```

+ [IAM Structures](https://docs.aws.amazon.com/IAM/latest/UserGuide/intro-structure.html).
+ [IAM Profile Identifiers](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_identifiers.html).

The following examples show ARNs for different types of IAM resources.

```bash
# The AWS account - the account itself.
arn:aws:iam::123456789012:root
# An IAM user in the account.
arn:aws:iam::123456789012:user/Bob
# Another user with a path reflecting an organization chart.
arn:aws:iam::123456789012:user/division_abc/subdivision_xyz/Bob
# An IAM group.
arn:aws:iam::123456789012:group/Developers
# An IAM group with a path.
arn:aws:iam::123456789012:group/division_abc/subdivision_xyz/product_A/Developers
# An IAM role.
arn:aws:iam::123456789012:role/S3Access
# A managed policy.
arn:aws:iam::123456789012:policy/ManageCredentialsPermissions
# An instance profile that can be associated with an EC2 instance.
arn:aws:iam::123456789012:instance-profile/Webserver
# A federated user identified in IAM as "Bob".
arn:aws:sts::123456789012:federated-user/Bob
# The active session of someone assuming the role of "Accounting-Role", with a role session name of "Mary".
arn:aws:sts::123456789012:assumed-role/Accounting-Role/Mary
# The multi-factor authentication device assigned to the user named Bob.
arn:aws:iam::123456789012:mfa/Bob
# A server certificate,
arn:aws:iam::123456789012:server-certificate/ProdServerCert
# A server certificate with a path that reflects an organization chart.
arn:aws:iam::123456789012:server-certificate/division_abc/subdivision_xyz/ProdServerCert
# Identity providers (SAML and OIDC).
arn:aws:iam::123456789012:saml-provider/ADFSProvider
arn:aws:iam::123456789012:oidc-provider/GoogleProvider
```

## Single Sign On (SSO)

+ [Single Sign On](https://aws.amazon.com/single-sign-on).
+ [SSO Docs](https://docs.aws.amazon.com/singlesignon).

## Identity Federation

+ [Federation](https://aws.amazon.com/identity/federation).
+ [Identity Providers and Federation](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers.html).

## IAM Roles

+ [IAM Roles](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html).
+ [Service Linked Roles](https://docs.aws.amazon.com/IAM/latest/UserGuide/using-service-linked-roles.html).
+ [Creating IAM Policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create.html).
+ [Policies and Permissions](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html).
+ [IAM Roles for EC2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html).

S3 Bucket Policy Example.

```json
{
  "Version": "2012-10-17",
  "Id": "Policy1540482128483",
  "Statement": [
    {
      "Sid": "Stmt1540482125974",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::xxx:user/uuu"
      },
      "Action": "s3:PutObject",
      "Resource": "arn:aws:s3:::datalayer-dist/*"
    }
  ]
}
```

## Security Token Service (STS)

The AWS STS API operations create a new session with temporary security credentials that consist of an access key and a session token. The access key consists of an access key ID and a secret key. Users (or an application that the user runs) can use these credentials to access your resources.

You can create a role session and pass session policies programmatically using AWS STS API operations.

The resulting session's permissions are the intersection of the role's identity-based policies and the session policies. For more information about session policies, see [Session Policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html#policies_session).

+ [STS Docs](https://docs.aws.amazon.com/STS/latest/APIReference/Welcome.html).
+ [Temporary Security Credentials](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp.html).
+ [Requesting Temporary Security Credentials](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp_request.html).

+ [Tutorial: Delegate Access Across AWS Accounts Using IAM Roles](https://docs.aws.amazon.com/IAM/latest/UserGuide/tutorial_cross-account-with-roles.html).

+ [Using an IAM Role to Grant Permissions to Applications Running on Amazon EC2 Instances](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2.html).

+ [Sample Applications That Use Temporary Credentials](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp_sample-apps.html).
+ [AWS Federated Authentication with Active Directory Federation Services (AD FS)](https://aws.amazon.com/blogs/security/aws-federated-authentication-with-active-directory-federation-services-ad-fs).
+ [AWS AssumeRole authorization not working](https://stackoverflow.com/questions/21956794/aws-assumerole-authorization-not-working/33850060#33850060).

```bash
# aws sts get-session-token...
aws sts get-caller-identity
aws sts assume-role --role-arn "arn:aws:iam::999999999999:role/UpdateApp" --role-session-name "DLA-ProdUpdate"
```

## IAM with Kubernetes

+ https://www.bluematador.com/blog/iam-access-in-kubernetes-the-aws-security-problem
+ https://www.bluematador.com/blog/iam-access-in-kubernetes-kube2iam-vs-kiam

+ https://github.com/jtblin/kube2iam
+ https://github.com/helm/charts/tree/master/stable/kube2iam
+ https://www.bluematador.com/blog/iam-access-in-kubernetes-installing-kube2iam-in-production

+ https://github.com/uswitch/kiam
+ https://github.com/helm/charts/tree/master/stable/kiam
+ https://medium.com/@pingles/kiam-iterating-for-security-and-reliability-5e793ab93ec3
+ https://www.bluematador.com/blog/iam-access-in-kubernetes-installing-kiam-in-production

## Certificates

```bash
openssl version
openssl genrsa 2048 > privatekey.pem
openssl req -new -key privatekey.pem -out csr.pem
openssl x509 -req -days 365 -in csr.pem -signkey privatekey.pem -out server.crt
aws acm import-certificate --certificate file://server.crt --private-key file://privatekey.pem --region eu-central-1
aws iam list-server-certificates
```

## Virtual Private Cloud (VPC)

+ [Amazon VPC](https://docs.aws.amazon.com/vpc).
+ [Default VPC](https://docs.aws.amazon.com/vpc/latest/userguide/default-vpc.html).
+ [Routers](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Route_Tables.html).
+ [AWS Routing 101](https://medium.com/@mda590/aws-routing-101-67879d23014d).

## Simple Storage Service (S3)

+ [Amazon S3 Docs](https://docs.aws.amazon.com/s3).
+ [Secure Access to S3 Buckets Using IAM Roles](https://docs.databricks.com/administration-guide/cloud-configurations/aws/iam-roles.html).
+ [IAM role for an AWS SFTP user](https://aws.amazon.com/premiumsupport/knowledge-center/sftp-iam-user-cli).

To access a S3 bucket from the Spark Driver or Executors, you have to give additional properties to Spark when you submit your job or launch your REPL.

+ `spark.hadoop.fs.s3a.access.key`: xxx
+ `spark.hadoop.fs.s3a.secret.key`: `xxx
+ `spark.jars`: http://central.maven.org/maven2/org/apache/hadoop/hadoop-aws/2.9.0/hadoop-aws-2.9.0.jar,http://central.maven.org/maven2/com/amazonaws/aws-java-sdk-bundle/1.11.199/aws-java-sdk-bundle-1.11.199.jar

Change the version of `hadoop-aws` jar and its `aws-java-sdk-bundle` transitive dependency to map your Hadoop cluster version. List the [Maven Central Repository](https://mvnrepository.com/artifact/org.apache.hadoop/hadoop-aws) for details.

## Elastic Compute Cloud (EC2)

+ [EC2](https://aws.amazon.com/ec2).
+ [Instance Types](https://aws.amazon.com/ec2/instance-types).

```bash
# Master.
Model	      vCPU	CPU Credits / hour Mem (GiB)	 Storage
c3.4xlarge	16	30	2 x 160 <=
# Master: General Purpose.
Model	      vCPU	CPU Credits / hour Mem (GiB)	 Storage
t2.nano	    1	3	0.5	EBS-Only
t2.micro	  1	6	1	EBS-Only
t2.small	  1	12	2	EBS-Only
t2.medium	  2	24	4	EBS-Only
t2.large	  2	36	8	EBS-Only
t2.xlarge	  4	54	16	EBS-Only <=
t2.2xlarge	8	81	32	EBS-Only
```

```bash
# Worker: Memory Optimized.
r4.2xlarge
Instance Type	vCPU	Memory (GiB)	 Storage (GB)	Networking Performance Physical Processor	Clock Speed (GHz)	Intel AVX†	Intel AVX2†	Intel Turbo	EBS OPT  Enhanced Networking 8 61 - Up to 10 Gigabit Intel Xeon E5-2686 v4 2.3 Yes Yes Yes Yes Yes
# Worker: Compute Optimized.
Model	      vCPU	Mem (GiB)	SSD Storage  (GB)
c3.large	  2	3.75	2 x 16
c3.xlarge	  4	7.5	2 x 40
c3.2xlarge	8	15	2 x 80
c3.4xlarge	16	30	2 x 160 <=
c3.8xlarge	32	60	2 x 320
```

[EC2 Instance Metadata](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html).

```bash
ec2metadata
curl http://169.254.169.254
curl http://169.254.169.254/latest/
curl http://169.254.169.254/latest/dynamic/
curl http://169.254.169.254/latest/meta-data/
curl http://169.254.169.254/latest/meta-data/hostname
curl http://169.254.169.254/latest/meta-data/security-groups
curl http://169.254.169.254/latest/meta-data/identity-credentials/
curl http://169.254.169.254/latest/meta-data/identity-credentials/ec2/info
curl http://169.254.169.254/latest/meta-data/iam/info
curl http://169.254.169.254/latest/meta-data/iam/security-credentials/
# The following command retrieves the security credentials for an IAM role named s3access.
curl http://169.254.169.254/latest/meta-data/iam/security-credentials/s3access
```

```bash
sudo su
apt update
apt install -y awscli jq
AWS_DEFAULT_REGION=YOUR_REGION
ROLE=YOUR_ROLE
AWS_ACCESS_KEY_ID=`curl http://169.254.169.254/latest/meta-data/iam/security-credentials/$ROLE | jq -r ".AccessKeyId"`
AWS_SECRET_ACCESS_KEY=`curl http://169.254.169.254/latest/meta-data/iam/security-credentials/$ROLE | jq -r ".SecretAccessKey"`
AWS_SESSION_TOKEN=`curl http://169.254.169.254/latest/meta-data/iam/security-credentials/$ROLE | jq -r ".Token"`
```

```bash
INSTANCEID=`curl -s http://169.254.169.254/latest/meta-data/instance-id`
REGION=`curl http://169.254.169.254/latest/dynamic/instance-identity/document | grep region | awk -F\" '{print $4}'`
```

```bash
# EIP.
aws ec2 describe-instances --instance-ids ${INSTANCEID} --filter Name=tag:Cost,Values=kuber --region ${REGION}
# Check if instance has a public IP from Elastic pool assigned.
aws ec2 describe-addresses --output text --region ${REGION} | grep ${INSTANCEID} | wc -l
```

```bash
# Autoscaling.
export REGION=eu-central-1
aws autoscaling describe-auto-scaling-groups --region ${REGION} --auto-scaling-group-name kuber.node
aws autoscaling update-auto-scaling-group --auto-scaling-group-name kuber.node --min-size 0 --max-size 3 --desired-capacity 3 --region ${REGION}
```

## Elastic Blob Store (EBS)

+ [Amazon Elastic Block Store](https://aws.amazon.com/ebs).

+ When you boot an Amazon Linux EC2 instance it boots with a 8GB EBS volume.
+ If you need more space you need to add additional drives. For this you need to use EBS volumes.
+ Before you start the process please have look at the current partition blocks loaded in your server.

```bash
cat /proc/partitions
major minor  #blocks  name
202+ + 1+ 8388608 xvda1
```

+ Now you goto EBS volume manager in AWS console and create a new volume, make sure the zone is the same in which your EC2 instance is running.
+ Once the volume is created you need to attach this to an instance. 
+ You can right click on the created volume and say attach.
+ Select the instance then device will populate automatically, you can either leave it or change if you need specific device name.
+ Now check the partition file again. You can see a new device being added.

```bash
cat /proc/partitions
major minor  #blocks  name
202+ + 1+ 8388608 xvda1
202+   128   26214400 xvdb
```

+ The volume attached is not ready for use. It is like a new hard disk.
+ You need to partition and format the same.
+ In your case we am going to use the full disk as one partition.
+ So you are going to skip the fdisk setup and jumping right into formatting the volume.

```bash
sudo mkfs.ext4 /dev/xvdb
```

+ The format process can take few seconds just be patient.
+ The drive is ready to use, and to do the same we need mount it.

```bash
sudo mkdir -m 000 /opt
echo "/dev/xvdb /opt auto noatime 0 0" | sudo tee -a /etc/fstab
sudo mount /opt
```

## AWS Services

### Compute

+ EC2
+ Lightsail
+ Elastic Container Service
+ EKS
+ Lambda
+ Batch
+ Elastic Beanstalk

### Storage

+ S3
+ EFS
+ Glacier
+ Storage Gateway

Database

+ RDS
+ DynamoDB
+ ElastiCache
+ Neptune
+ Amazon Redshift

### Migration

+ AWS Migration Hub
+ Application Discovery Service
+ Database Migration Service
+ Server Migration Service
+ Snowball

### Networking & Content Delivery

+ VPC
+ CloudFront
+ Route 53
+ API Gateway
+ Direct Connect

### Developer Tools

+ CodeStar
+ CodeCommit
+ CodeBuild
+ CodeDeploy
+ CodePipeline
+ Cloud9
+ X-Ray

### Management Tools

+ CloudWatch
+ AWS Auto Scaling
+ CloudFormation
+ CloudTrail
+ Config
+ OpsWorks
+ Service Catalog
+ Systems Manager
+ Trusted Advisor
+ Managed Services

### Media Services

+ Elastic Transcoder
+ Kinesis Video Streams
+ MediaConvert
+ MediaLive
+ MediaPackage
+ MediaStore
+ MediaTailor

### Machine Learning

+ Amazon SageMaker
+ Amazon Comprehend
+ AWS DeepLens
+ Amazon Lex
+ Machine Learning
+ Amazon Polly
+ Rekognition
+ Amazon Transcribe
+ Amazon Translate

### Analytics

+ Athena
+ EMR
+ CloudSearch
+ Elasticsearch Service
+ Kinesis
+ QuickSight
+ Data Pipeline
+ AWS Glue

### Security, Identity & Compliance

+ IAM
+ Cognito
+ Secrets Manager
+ GuardDuty
+ Inspector
+ Amazon Macie
+ AWS Single Sign-On
+ Certificate Manager
+ CloudHSM
+ Directory Service
+ WAF & Shield
+ Artifact

### Mobile Services

+ Mobile Hub
+ AWS AppSync
+ Device Farm
+ Mobile Analytics

### AR & VR

+ Amazon Sumerian

### Application Integration

+ Step Functions
+ Amazon MQ
+ Simple Notification Service
+ Simple Queue Service
+ SWF

### Customer Engagement

+ Amazon Connect
+ Pinpoint
+ Simple Email Service

### Business Productivity

+ Alexa for Business
+ Amazon Chime
+ WorkDocs
+ WorkMail

### Desktop & App Streaming

+ WorkSpaces
+ AppStream 2.0

### Internet of Things

+ IoT Core
+ IoT 1-Click
+ IoT Device Management
+ IoT Analytics
+ Greengrass
+ Amazon FreeRTOS

### Game Development

+ Amazon GameLift
