---
title: Kubernetes Cluster API Amazon AWS
---

# Cluster API AWS

[Cluster API Provider AWS](https://github.com/kubernetes-sigs/cluster-api-provider-aws)

[Working Group Minutes](https://docs.google.com/document/d/10dq54Fd-xa6P5Iy3p46VY1YTFqugGMd1PygDIpuRw6c/edit)

[Zoom Meetings](https://zoom.us/j/166836624)

## Build

```bash
# Get source.
go get -u sigs.k8s.io/cluster-api-provider-aws
# Pick a working tree.
cd $GOPATH/src/sigs.k8s.io/cluster-api-provider-aws && \
  git reset --hard && \
  git checkout master && \
  git branch -D datalayer && \
  git checkout aac64a54ee67a3227adbdd6e26709a7b1d192aca -b datalayer
```

```bash
# Build binaries.
cd $GOPATH/src/sigs.k8s.io/cluster-api-provider-aws && \
  make clean && \
  make reset-bazel && \
  make dep-ensure && \
  make cluster-api-dev-helper && \
  make clusterawsadm && \
  cp bazel-bin/cmd/clusterawsadm/linux_amd64_pure_stripped/clusterawsadm $DLAHOME/bin/clusterawsadm && \
  chmod +x $DLAHOME/bin/clusterawsadm && \
  make clusterctl && \
  cp bazel-bin/cmd/clusterctl/linux_amd64_pure_stripped/clusterctl $DLAHOME/bin/clusterctl && \
  chmod +x $DLAHOME/bin/clusterctl
```

```bash
# Launch local repository.
docker run -d -p 5000:5000 --restart=always --name registry registry:2
# Push docker only zorks fine with python 2.
conda create -n py2 python=2.7
conda activate py2
# Build docker image.
export DEV_DOCKER_REPO=localhost:5000
export MANAGER_IMAGE_NAME=datalayer/cluster-api-aws-controller
export MANAGER_IMAGE_TAG=latest
cd $GOPATH/src/sigs.k8s.io/cluster-api-provider-aws && \
  make docker-build-dev
make docker-push-dev
curl -X GET http://localhost:5000/v2/_catalog
```

## Key Pair

```bash
cd $GOPATH/src/sigs.k8s.io/cluster-api-provider-aws && \
  AWS_REGION=us-east-1 && \
  aws ssm put-parameter --name "/sigs.k8s.io/cluster-api-provider-aws/ssh-key" \
    --type SecureString \
    --value "$(aws ec2 create-key-pair --key-name cluster-api-provider-aws.sigs.k8s.io | jq .KeyMaterial -r)" && \
  clusterawsadm alpha bootstrap create-stack
#  clusterawsadm alpha config init
#  clusterawsadm alpha new-overlay test
#  clusterawsadm alpha config test
```

```bash
ssh-keygen -t rsa -C "k8s-aws" -f ~/.ssh/k8s_aws
# Do NOT change the format of file:// - See https://github.com/aws/aws-cli/issues/41
aws ec2 import-key-pair --public-key-material file://~/.ssh/k8s_aws.pub --key-name cluster-api-provider-aws.sigs.k8s.io
```

## Delete Minikube

```bash
minikube stop && \
  minikube delete && \
  rm -rf ~/.minikube
cd $GOPATH/src/sigs.k8s.io/cluster-api-provider-aws && \
  rm minikube.kubeconfig
```

## Create Cluster

```bash
# Ensure you set AWS Credentials.
export AWS_CREDENTIALS=$(aws iam create-access-key --user-name bootstrapper.cluster-api-provider-aws.sigs.k8s.io) && \
  export AWS_REGION="us-east-1" && \
  export AWS_ACCESS_KEY_ID=$(echo $AWS_CREDENTIALS | jq .AccessKey.AccessKeyId -r) && \
  export AWS_SECRET_ACCESS_KEY=$(echo $AWS_CREDENTIALS | jq .AccessKey.SecretAccessKey -r)
#
source ~/.datalayer/env && \
  export AWS_REGION=$DATALAYER_AWS_REGION && \
  export AWS_ACCESS_KEY_ID=$DATALAYER_AWS_ACCESS_KEY_ID && \
  export AWS_SECRET_ACCESS_KEY=$DATALAYER_AWS_SECRET_ACCESS_KEY
#
export SSH_KEY_NAME="cluster-api-provider-aws.sigs.k8s.io"
minikube config set kubernetes-version v1.12.1 && \
  minikube config set bootstrapper kubeadm && \
  minikube config set vm-driver kvm2 && \
  minikube config set cpus 8 && \
  minikube config set memory 8192 && \
  minikube config set disk-size 50g && \
  minikube config set WantReportErrorPrompt false
cd $GOPATH/src/sigs.k8s.io/cluster-api-provider-aws && \
  make clean && \
  rm -fr cmd/clusterctl/examples/aws/out && \
  make manifests-dev && \
  ls -alp cmd/clusterctl/examples/aws/out && \
  cat cmd/clusterctl/examples/aws/out/credentials && \
#   clusterctl create cluster \
#     -v 6 \
#     --logtostderr \
#     --vm-driver kvm2 \
#     --provider aws \
#     -m ./cmd/clusterctl/examples/aws/out/machines.yaml \
#     -c ./cmd/clusterctl/examples/aws/out/cluster.yaml \
#     -p ./cmd/clusterctl/examples/aws/out/provider-components.yaml \
#     -a ./cmd/clusterctl/examples/aws/out/addons.yaml
  make create-cluster
```

```bash
# Monitor Cluster Creation.
export KUBECONFIG=$GOPATH/src/sigs.k8s.io/cluster-api-provider-aws/minikube.kubeconfig
kubectl get po -o name -n aws-provider-system | grep aws-provider-controller-manager | xargs kubectl logs -n aws-provider-system -c manager -f
kubectl get nodes
```

```bash
# On the controlplane server.
journalctl -fu kubelet
```

```
-- Logs begin at Tue 2018-11-20 17:05:19 UTC. --
Nov 20 17:08:03 ip-10-0-0-222 kubelet[1810]: I1120 17:08:03.552703    1810 reconciler.go:207] operationExecutor.VerifyControllerAttachedVolume started for volume "calico-node-token-gpxck" (UniqueName:"kubernetes.io/secret/d7567af9-ece6-11e8-afa0-022783a38e84-calico-node-token-gpxck") pod "calico-node-7snff" (UID: "d7567af9-ece6-11e8-afa0-022783a38e84")
Nov 20 17:08:03 ip-10-0-0-222 kubelet[1810]: I1120 17:08:03.552761    1810 reconciler.go:207] operationExecutor.VerifyControllerAttachedVolume started for volume "lib-modules" (UniqueName: "kubernetes.io/host-path/d7567af9-ece6-11e8-afa0-022783a38e84-lib-modules") pod "calico-node-7snff" (UID: "d7567af9-ece6-11e8-afa0-022783a38e84")
Nov 20 17:08:03 ip-10-0-0-222 kubelet[1810]: I1120 17:08:03.552780    1810 reconciler.go:207] operationExecutor.VerifyControllerAttachedVolume started for volume "cni-net-dir" (UniqueName: "kubernetes.io/host-path/d7567af9-ece6-11e8-afa0-022783a38e84-cni-net-dir") pod "calico-node-7snff" (UID: "d7567af9-ece6-11e8-afa0-022783a38e84")
Nov 20 17:08:07 ip-10-0-0-222 kubelet[1810]: I1120 17:08:07.659260    1810 transport.go:132] certificate rotation detected, shutting down client connections to start using new credentials
Nov 20 17:08:07 ip-10-0-0-222 kubelet[1810]: E1120 17:08:07.884448    1810 kubelet.go:2167] Container runtime network not ready: NetworkReady=false reason:NetworkPluginNotReady message:Network plugin returns error: cni config load failed: no network config found in /etc/cni/net.d: cni plugin not initialized: failed to load cni config
Nov 20 17:08:12 ip-10-0-0-222 kubelet[1810]: E1120 17:08:12.885249    1810 kubelet.go:2167] Container runtime network not ready: NetworkReady=false reason:NetworkPluginNotReady message:Network plugin returns error: cni config load failed: no network config found in /etc/cni/net.d: cni plugin not initialized: failed to load cni config
Nov 20 17:08:28 ip-10-0-0-222 kubelet[1810]: I1120 17:08:28.036597    1810 reconciler.go:207] operationExecutor.VerifyControllerAttachedVolume started for volume "config-volume" (UniqueName: "kubernetes.io/configmap/d72eb7a2-ece6-11e8-afa0-022783a38e84-config-volume") pod "coredns-576cbf47c7-gnh8w" (UID: "d72eb7a2-ece6-11e8-afa0-022783a38e84")
Nov 20 17:08:28 ip-10-0-0-222 kubelet[1810]: I1120 17:08:28.037112    1810 reconciler.go:207] operationExecutor.VerifyControllerAttachedVolume started for volume "coredns-token-bj8tt" (UniqueName: "kubernetes.io/secret/d72c3e3c-ece6-11e8-afa0-022783a38e84-coredns-token-bj8tt") pod "coredns-576cbf47c7-rnhpv" (UID: "d72c3e3c-ece6-11e8-afa0-022783a38e84")
Nov 20 17:08:28 ip-10-0-0-222 kubelet[1810]: I1120 17:08:28.037274    1810 reconciler.go:207] operationExecutor.VerifyControllerAttachedVolume started for volume "coredns-token-bj8tt" (UniqueName: "kubernetes.io/secret/d72eb7a2-ece6-11e8-afa0-022783a38e84-coredns-token-bj8tt") pod "coredns-576cbf47c7-gnh8w" (UID: "d72eb7a2-ece6-11e8-afa0-022783a38e84")
Nov 20 17:08:28 ip-10-0-0-222 kubelet[1810]: I1120 17:08:28.037431    1810 reconciler.go:207] operationExecutor.VerifyControllerAttachedVolume started for volume "config-volume" (UniqueName: "kubernetes.io/configmap/d72c3e3c-ece6-11e8-afa0-022783a38e84-config-volume") pod "coredns-576cbf47c7-rnhpv" (UID: "d72c3e3c-ece6-11e8-afa0-022783a38e84")
Nov 20 17:09:36 ip-10-0-0-222 kubelet[1810]: W1120 17:09:36.057723    1810 container.go:393] Failed to create summary reader for "/system.slice/ntp-systemd-netif.service": none of the resources are being tracked.
```

# Phases

From https://gist.github.com/detiber/3e0346c9c722f7245664f985b196af41

> Also: `clusterctl alpha phases --help` specifically `clusterctl alpha phases apply-cluster-api-components -p ./cmd/clusterctl/examples/aws/out/provider-components.yaml --kubeconfig <YOUR KUBECONFIG>`.

## Build and install the artifacts

```bash
make clean
rm -fr ~/go/pkg/dep
export GOPATH=~/go
export GOBIN=$GOPATH/bin
go get github.com/golang/mock/gomock
go install github.com/golang/mock/mockgen
# export DEV_DOCKER_REPO=gcr.io/$(gcloud config get-value project)
export DEV_DOCKER_REPO=localhost:5000/datalayer
make dep-ensure
make clusterctl
make clusterawsadm
make docker-build-dev
make docker-push-dev
install bazel-bin/cmd/clusterctl/linux_amd64_pure_stripped/clusterctl ~/go/bin/
install bazel-bin/cmd/clusterawsadm/linux_amd64_pure_stripped/clusterawsadm ~/go/bin
```

## Prep the AWS environment and local env vars

```bash
export AWS_REGION=us-east-1
export SSH_KEY_NAME=cluster-api-provider-aws.sigs.k8s.io # pre-existing ssh key
clusterawsadm alpha bootstrap create-stack
export AWS_CREDENTIALS=$(aws iam create-access-key \
  --user-name bootstrapper.cluster-api-provider-aws.sigs.k8s.io)
export AWS_ACCESS_KEY_ID=$(echo $AWS_CREDENTIALS | jq .AccessKey.AccessKeyId -r)
export AWS_SECRET_ACCESS_KEY=$(echo $AWS_CREDENTIALS | jq .AccessKey.SecretAccessKey -r)
```

## Build the manifests

```bash
make manifests-dev
```

## Prep the CAPA components

```bash
clusterctl alpha phases create-bootstrap-cluster
clusterctl alpha phases apply-cluster-api-components -p ./cmd/clusterctl/examples/aws/out/provider-components.yaml --kubeconfig minikube.kubeconfig
```

## Deploy the cluster shared components

```bash
cat <<EOF | kubectl apply --kubeconfig minikube.kubeconfig -f -
apiVersion: "cluster.k8s.io/v1alpha1"
kind: Cluster
metadata:
  name: test1
spec:
  clusterNetwork:
    services:
      cidrBlocks: ["10.96.0.0/12"]
    pods:
      cidrBlocks: ["192.168.0.0/16"]
    serviceDomain: "cluster.local"
  providerSpec:
    value:
      apiVersion: "awsprovider/v1alpha1"
      kind: "AWSClusterProviderSpec"
      region: "us-east-1"
      sshKeyName: "default"
EOF
```

## Deploy the controlplane instance

```yaml
cat <<EOF | kubectl create --kubeconfig minikube.kubeconfig -f -
apiVersion: "cluster.k8s.io/v1alpha1"
kind: Machine
metadata:
  name: aws-controlplane-0
  labels:
    set: controlplane
spec:
  versions:
    kubelet: v1.13.0
    controlPlane: v1.13.0
  providerSpec:
    value:
      apiVersion: awsprovider/v1alpha1
      kind: AWSMachineProviderSpec
      instanceType: "t2.medium"
      iamInstanceProfile: "control-plane.cluster-api-provider-aws.sigs.k8s.io"
      keyName: "default"
EOF
```

## Retrieve the kubeconfig from the controlplane:

```bash
BASTION_IP=$(aws ec2 describe-instances --filters "Name=tag:Name,Values=test1-bastion" "Name=instance-state-name,Values=running" --query "Reservations[0].Instances[0].PublicIpAddress" --output text)
CONTROLPLANE_IP=$(aws ec2 describe-instances --filters "Name=tag:Name,Values=aws-controlplane-0" "Name=instance-state-name,Values=running" --query "Reservations[0].Instances[0].PrivateIpAddress" --output text)
ssh -A -J ubuntu@${BASTION_IP}:22 ubuntu@${CONTROLPLANE_IP} 'sudo cp /etc/kubernetes/admin.conf ~/kubeconfig && sudo chown ubuntu ~/kubeconfig'
scp -o "ProxyJump ubuntu@${BASTION_IP}" ubuntu@${CONTROLPLANE_IP}:kubeconfig kubeconfig
```

## Apply the addons

```bash
clusterctl alpha phases apply-addons -a ./cmd/clusterctl/examples/aws/out/addons.yaml --kubeconfig=kubeconfig
```

## Deploy the worker node

```bash
cat <<EOF | kubectl create --kubeconfig minikube.kubeconfig -f -
apiVersion: "cluster.k8s.io/v1alpha1"
kind: Machine
metadata:
  generateName: aws-node-
  labels:
    set: node
spec:
  versions:
    kubelet: v1.13.0
  providerSpec:
    value:
      apiVersion: awsprovider/v1alpha1
      kind: AWSMachineProviderSpec
      instanceType: "t2.medium"
      iamInstanceProfile: "nodes.cluster-api-provider-aws.sigs.k8s.io"
      keyName: "default"
EOF
```

## About Node Join

[Control plane node join](https://github.com/kubernetes-sigs/cluster-api-provider-aws/pull/463)
[WIP: re-use existing subnets](https://github.com/sethp-nr/cluster-api-provider-aws/commit/7b9ad1256dccbde151484fbc9375135f22b20005)
