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

# Pass bridged IPv4 traffic to iptables chains (required by Flannel)
echo "net.bridge.bridge-nf-call-iptables = 1" > /etc/sysctl.d/60-flannel.conf
service procps start

echo '[Wait] kubeadm join until kubeadm cluster have been created.' >> /home/ubuntu/userdata.log
for i in {1..50}; do sudo kubeadm join --token=${k8stoken} --discovery-token-unsafe-skip-ca-verification --node-name=$(hostname -f) ${masterIP}:6443 && break || sleep 15; done
