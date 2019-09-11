#!/bin/bash -ve

touch /home/ubuntu/userdata.log

apt update
apt install -y awscli jq

INSTANCE_ID=`curl -s http://169.254.169.254/latest/meta-data/instance-id`
echo $${INSTANCE_ID} >> /home/ubuntu/userdata.log

REGION=`curl http://169.254.169.254/latest/dynamic/instance-identity/document | grep region | awk -F\" '{print $4}'`
echo $${REGION} >> /home/ubuntu/userdata.log

VOLUME_ID=`aws ec2 create-volume --size 100 --availability-zone $${REGION}a --volume-type gp2 --region $${REGION} | jq -r ".VolumeId"`
echo $${VOLUME_ID} >> /home/ubuntu/userdata.log

sleep 10
aws ec2 attach-volume --volume-id $${VOLUME_ID} --instance-id $${INSTANCE_ID} --device /dev/xvdb --region $${REGION} >> /home/ubuntu/userdata.log
sleep 10
aws ec2 modify-instance-attribute --instance-id $${INSTANCE_ID} --region $${REGION} --block-device-mappings "[{\"DeviceName\": \"/dev/xvdb\",\"Ebs\":{\"DeleteOnTermination\":true}}]" >> /home/ubuntu/userdata.log
lsblk >> /home/ubuntu/userdata.log
mkfs -t ext4 /dev/xvdb >> /home/ubuntu/userdata.log
if [ ! -d "/mnt" ]; then
  mkdir /mnt
fi
mount /dev/xvdb /mnt >> /home/ubuntu/userdata.log
df -k >> /home/ubuntu/userdata.log
mkdir /mnt/docker
chmod 711 /mnt/docker

curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add -
touch /etc/apt/sources.list.d/kubernetes.list

su -c "echo 'deb http://apt.kubernetes.io/ kubernetes-xenial main' >> \
    /etc/apt/sources.list.d/kubernetes.list"
apt update
# Has to be configured before installing kubelet, or kubelet has to be restarted to pick up changes.
mkdir -p /etc/systemd/system/kubelet.service.d
touch /etc/systemd/system/kubelet.service.d/20-cloud-provider.conf
# Do we need to tune the docker pull timeout? It does not seem to give good results...
# --runtime-request-timeout 4m0s
cat << EOF  > /etc/systemd/system/kubelet.service.d/20-cloud-provider.conf
[Service]
Environment="KUBELET_EXTRA_ARGS=--cloud-provider=aws"
EOF
chmod 0600 /etc/systemd/system/kubelet.service.d/20-cloud-provider.conf

# Install kubelet kubeadm kubectl kubernetes-cni docker
apt install -y kubelet kubeadm kubectl kubernetes-cni
curl -sSL https://get.docker.com/ | sh
sudo usermod -aG docker ubuntu
systemctl start docker
echo '[Finished] Installing kubelet kubeadm kubectl kubernetes-cni docker' >> /home/ubuntu/userdata.log

# Install etcdctl for the version of etcd we're running
ETCD_VERSION=$(kubeadm config images list | grep etcd | cut -d':' -f2)
wget "https://github.com/coreos/etcd/releases/download/v$${ETCD_VERSION}/etcd-v$${ETCD_VERSION}-linux-amd64.tar.gz"
tar xvf "etcd-v$${ETCD_VERSION}-linux-amd64.tar.gz"
mv "etcd-v$${ETCD_VERSION}-linux-amd64/etcdctl" /usr/local/bin/
rm -rf etcd*
echo '[Finished] Installing etcdctl' >> /home/ubuntu/userdata.log

systemctl stop docker
cat <<EOF > /etc/docker/daemon.json
{
    "data-root": "/mnt/docker",
    "log-driver": "json-file",
    "log-opts": {
        "max-size": "10m",
        "max-file": "5"
    }
}
EOF
systemctl start docker
systemctl enable docker
echo '[Finished] docker configure' >> /home/ubuntu/userdata.log

# Point kubelet at big ephemeral drive
mkdir /mnt/kubelet
echo 'KUBELET_EXTRA_ARGS="--root-dir=/mnt/kubelet --cloud-provider=aws"' > /etc/default/kubelet
echo '[Finished] kubelet configure' >> /home/ubuntu/userdata.log

# ---

cat >init-config.yaml <<EOF
apiVersion: kubeadm.k8s.io/v1beta1
kind: InitConfiguration
cloudProvider: aws
bootstrapTokens:
- groups:
  - system:bootstrappers:kubeadm:default-node-token
  token: "${k8stoken}"
  ttl: "0"
nodeRegistration:
  name: "$(hostname -f)"
  taints: []
  kubeletExtraArgs:
    cloud-provider: external
---
apiVersion: kubeadm.k8s.io/v1beta1
kind: ClusterConfiguration
apiServer:
  extraArgs:
    cloud-provider: aws
  certSANs:
  - "$(hostname -f)"
  - "jh.dla.datalayer.io"
  timeoutForControlPlane: 4m0s
controllerManager:
  extraArgs:
    cloud-provider: aws
networking:
  podSubnet: 10.244.0.0/16
EOF

kubeadm init --config=/init-config.yaml --ignore-preflight-errors=NumCPU
touch /tmp/fresh-cluster
echo '[Finished] created kubeadm cluster' >> /home/ubuntu/userdata.log

# Pass bridged IPv4 traffic to iptables chains (required by Flannel like the above cidr setting)
echo "net.bridge.bridge-nf-call-iptables = 1" > /etc/sysctl.d/60-flannel.conf
service procps start

# Set up kubectl for the ubuntu user
mkdir -p /home/ubuntu/.kube && cp -i /etc/kubernetes/admin.conf /home/ubuntu/.kube/config && chown -R ubuntu. /home/ubuntu/.kube
echo 'source <(kubectl completion bash)' >> /home/ubuntu/.bashrc
echo '[Finished] Now you can use kubectl, try : kubectl get nodes' >> /home/ubuntu/userdata.log

if [ -f /tmp/fresh-cluster ]; then
  su -c 'kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/13a990bb716c82a118b8e825b78189dcfbfb2f1e/Documentation/kube-flannel.yml' ubuntu
  echo '[Finished] All nodes are ready' >> /home/ubuntu/userdata.log
  # su -c 'kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/mandatory.yaml' ubuntu
  # su -c 'kubectl apply -f https://raw.githubusercontent.com/datalayer/datalayer/master/etc/terraform/aws/kubeadm/service-l7.yaml' ubuntu
  # su -c 'kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/aws/patch-configmap-l4.yaml' ubuntu
fi

curl -Lo /tmp/helm-v2.14.1-linux-amd64.tar.gz https://storage.googleapis.com/kubernetes-helm/helm-v2.14.1-linux-amd64.tar.gz \
  && tar xvfz /tmp/helm-v2.14.1-linux-amd64.tar.gz -C /tmp \
  && sudo mv /tmp/linux-amd64/helm /usr/local/bin \
  && sudo chmod +x /usr/local/bin/helm

cat << EOF >>/home/ubuntu/aws.sh
alias k=kubectl
export AWS_DEFAULT_REGION=ap-northeast-2
export AWS_ACCESS_KEY_ID=\`curl http://169.254.169.254/latest/meta-data/iam/security-credentials/kubeadm_role | jq -r ".AccessKeyId"\`
export AWS_SECRET_ACCESS_KEY=\`curl http://169.254.169.254/latest/meta-data/iam/security-credentials/kubeadm_role | jq -r ".SecretAccessKey"\`
export AWS_SESSION_TOKEN=\`curl http://169.254.169.254/latest/meta-data/iam/security-credentials/kubeadm_role | jq -r ".Token"\`
EOF

chmod +x /home/ubuntu/aws.sh
