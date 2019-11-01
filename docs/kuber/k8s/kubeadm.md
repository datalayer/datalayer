---
title: Kubeadm
---

# Kubeadm

Create a Cluster with [Kubeadm](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm).

Read also [kubernetes-kubeadm-and-the-aws-cloud-provider](https://blog.scottlowe.org/2019/02/18/kubernetes-kubeadm-and-the-aws-cloud-provider).

## Kubeadm Specs

https://godoc.org/k8s.io/kubernetes/cmd/kubeadm/app/apis/kubeadm/v1beta1

Here is a fully populated example of a single YAML file containing multiple configuration types to be used during a `kubeadm init` run.

```yaml
apiVersion: kubeadm.k8s.io/v1beta1
kind: InitConfiguration
bootstrapTokens:
- token: "9a08jv.c0izixklcxtmnze7"
  description: "kubeadm bootstrap token"
  ttl: "24h"
- token: "783bde.3f89s0fje9f38fhf"
  description: "another bootstrap token"
  usages:
  - authentication
  - signing
  groups:
  - system:bootstrappers:kubeadm:default-node-token
nodeRegistration:
  name: "ec2-10-100-0-1"
  criSocket: "/var/run/dockershim.sock"
  taints:
  - key: "kubeadmNode"
    value: "master"
    effect: "NoSchedule"
  kubeletExtraArgs:
    cgroup-driver: "cgroupfs"
localAPIEndpoint:
  advertiseAddress: "10.100.0.1"
  bindPort: 6443
---
apiVersion: kubeadm.k8s.io/v1beta1
kind: ClusterConfiguration
etcd:
  # one of local or external
  local:
    imageRepository: "k8s.gcr.io"
    imageTag: "3.2.24"
    dataDir: "/var/lib/etcd"
    extraArgs:
      listen-client-urls: "http://10.100.0.1:2379"
    serverCertSANs:
    -  "ec2-10-100-0-1.compute-1.amazonaws.com"
    peerCertSANs:
    - "10.100.0.1"
  # external:
    # endpoints:
    # - "10.100.0.1:2379"
    # - "10.100.0.2:2379"
    # caFile: "/etcd/kubernetes/pki/etcd/etcd-ca.crt"
    # certFile: "/etcd/kubernetes/pki/etcd/etcd.crt"
    # keyFile: "/etcd/kubernetes/pki/etcd/etcd.key"
networking:
  serviceSubnet: "10.96.0.0/12"
  podSubnet: "10.100.0.1/24"
  dnsDomain: "cluster.local"
kubernetesVersion: "v1.12.0"
controlPlaneEndpoint: "10.100.0.1:6443"
apiServer:
  extraArgs:
    authorization-mode: "Node,RBAC"
  extraVolumes:
  - name: "some-volume"
    hostPath: "/etc/some-path"
    mountPath: "/etc/some-pod-path"
    readOnly: false
    pathType: File
  certSANs:
  - "10.100.1.1"
  - "ec2-10-100-0-1.compute-1.amazonaws.com"
  timeoutForControlPlane: 4m0s
controllerManager:
  extraArgs:
    "node-cidr-mask-size": "20"
  extraVolumes:
  - name: "some-volume"
    hostPath: "/etc/some-path"
    mountPath: "/etc/some-pod-path"
    readOnly: false
    pathType: File
scheduler:
  extraArgs:
    address: "10.100.0.1"
extraVolumes:
- name: "some-volume"
  hostPath: "/etc/some-path"
  mountPath: "/etc/some-pod-path"
  readOnly: false
  pathType: File
certificatesDir: "/etc/kubernetes/pki"
imageRepository: "k8s.gcr.io"
useHyperKubeImage: false
clusterName: "example-cluster"
---
apiVersion: kubelet.config.k8s.io/v1beta1
kind: KubeletConfiguration
# kubelet specific options here
---
apiVersion: kubeproxy.config.k8s.io/v1alpha1
kind: KubeProxyConfiguration
# kube-proxy specific options here
```

# Kubeadm

```
sudo su
cat <<EOF >/etc/apt/sources.list.d/kubernetes.list
deb http://apt.kubernetes.io/ kubernetes-xenial main
EOF
cat << EOF_S > install-kubeadm.sh
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add -
apt update
apt install -y apt-transport-https
apt install -y --allow-unauthenticated \
  kubelet=1.8.4-00 \
  kubeadm=1.8.4-00 \
  kubectl=1.8.4-00
EOF_S
chmod +x install-kubeadm.sh && ./install-kubeadm.sh
# cat <<EOF >/etc/systemd/system/kubelet.service.d/90-local-extras.conf
# --fail-swap-on=false 
cat <<EOF_C >>/etc/systemd/system/kubelet.service.d/10-kubeadm.conf
Environment="KUBELET_EXTRA_ARGS=--cgroup-driver=cgroupfs --cloud-provider=aws"
EOF_C
systemctl daemon-reload && systemctl restart kubelet
systemctl status kubelet && journalctl -fu kubelet
```

```
systemctl disable kubelet
systemctl stop kubelet
```

```
journalctl -fu localkube
```

```
kubectl get nodes
kubectl drain datalayer-001 --delete-local-data --force --ignore-daemonsets
kubectl delete node datalayer-001
```

```
kubeadm reset
docker rm -f $(docker ps -a -q)
# etcdctl del "" --prefix
rm -fr ~/.kube
rm -fr /etc/kubernetes
rm -fr /var/lib/kubelet
rm -fr /var/lib/etcd
```

```
vi /etc/resolv.conf
nameserver 8.8.8.8
```

```
apiVersion: kubeadm.k8s.io/v1alpha1
kind: MasterConfiguration
api:
  advertiseAddress: <address|string>
  bindPort: <int>
etcd:
  endpoints:
  - <endpoint1|string>
  - <endpoint2|string>
  caFile: <path|string>
  certFile: <path|string>
  keyFile: <path|string>
  dataDir: <path|string>
  extraArgs:
    <argument>: <value|string>
    <argument>: <value|string>
  image: <string>
networking:
  dnsDomain: <string>
  serviceSubnet: <cidr>
  podSubnet: <cidr>
kubernetesVersion: <string>
cloudProvider: <string>
nodeName: <string>
authorizationModes:
- <authorizationMode1|string>
- <authorizationMode2|string>
token: <string>
tokenTTL: <time duration>
selfHosted: <bool>
apiServerExtraArgs:
  <argument>: <value|string>
  <argument>: <value|string>
controllerManagerExtraArgs:
  <argument>: <value|string>
  <argument>: <value|string>
schedulerExtraArgs:
  <argument>: <value|string>
  <argument>: <value|string>
apiServerCertSANs:
- <name1|string>
- <name2|string>
certificatesDir: <string>
imageRepository: <string>
unifiedControlPlaneImage: <string>
featureGates:
  <feature>: <bool>
  <feature>: <bool>
```

```
# TOKEN=$(cat /etc/kubicorn/cluster.json | jq -r '.values.itemMap.INJECTEDTOKEN')
# PORT=$(cat /etc/kubicorn/cluster.json | jq -r '.values.itemMap.INJECTEDPORT | tonumber')
# Tag AWS Resources with `KubernetesCluster=kubernetes`.
# --skip-preflight-checks
# --apiserver-advertise-address=127.0.0.1
# kubeadm init --pod-network-cidr=192.168.0.0/16
# docker rm -f $(docker ps -a -q)
# etcdctl del "" --prefix
# rm -fr ~/.kube
# rm -fr /etc/kubernetes
# rm -fr /var/lib/kubelet
# rm -fr /var/lib/etcd
kubeadm reset
PUBLIC_IP=$(ec2metadata --public-ipv4 | cut -d " " -f 2)
PRIVATE_IP=$(ec2metadata --local-ipv4 | cut -d " " -f 2)
PRIVATE_HOSTNAME=$(ec2metadata --local-hostname | cut -d " " -f 2)
cat <<EOF >kubeadm.conf
apiVersion: kubeadm.k8s.io/v1alpha1
kind: MasterConfiguration
kubernetesVersion: 1.8.3
token: ed5ef9.6c35783ca6cb8994
tokenTTL: 99999h0m0s
api:
  advertiseAddress: $PUBLIC_IP
  bindPort: 433
nodeName: $PRIVATE_HOSTNAME
networking:
  podSubnet: 192.168.0.0/16
cloudProvider: aws
apiServerExtraArgs:
  cloud-provider: aws
controllerManagerExtraArgs:
  cloud-provider: aws
apiServerCertSANs:
- $PUBLIC_IP
- $PRIVATE_IP
EOF
more kubeadm.conf
kubeadm init --config=kubeadm.conf
journalctl -fu kubelet
```

```
alias k=kubectl
export KUBECONFIG=/etc/kubernetes/admin.conf
kubectl get pods --all-namespaces -w
```

```
# Make kubectl work for your non-root user.
rm -fr  ~/.kube
mkdir -p ~/.kube
sudo cp -i /etc/kubernetes/admin.conf ~/.kube/config
sudo chown $(id -u):$(id -g) ~/.kube/config
# export KUBECONFIG=~/.kube/admin.conf
kubectl get pods --all-namespaces -w
```

```
# The network must be deployed before any applications.
# Also, kube-dns, a helper service, will not start up before a network is installed (should be in Pending state).
# kubeadm only supports Container Network Interface (CNI) based networks (and does not support kubenet).
kubectl apply -f https://docs.projectcalico.org/v2.6/getting-started/kubernetes/installation/hosted/kubeadm/1.6/calico.yaml
kubectl apply -f calico.yaml
kubectl get nodes -o jsonpath='{.items[*].spec.podCIDR}'
kubectl get pods --all-namespaces -w
```

```
# https://docs.projectcalico.org/v2.0/usage/troubleshooting/faq#how-can-i-enable-nat-for-outgoing-traffic-from-containers-with-private-ip-addresses
curl -O -L https://github.com/projectcalico/calicoctl/releases-download/v1.4.0/calicoctl
chmod +x calicoctl
mv calicoctl $DLAHOME/bin
cat << EOF | calicoctl apply -f -
apiVersion: v1
kind: ipPool
metadata:
  cidr: 192.168.0.0/16
spec:
  ipip:
    enabled: true
  nat-outgoing: true
EOF
calicoctl get ippools -o wide
CIDR             NAT    IPIP    
192.168.0.0/16   true   false   
```

```
Note:
  For flannel to work correctly, --pod-network-cidr=10.244.0.0/16 has to be passed to kubeadm init.
  flannel works on amd64, arm, arm64 and ppc64le, but for it to work on a platform other than amd64 you have to manually download the manifest and replace amd64 occurences with your chosen platform.
  Set /proc/sys/net/bridge/bridge-nf-call-iptables to 1 by running sysctl net.bridge.bridge-nf-call-iptables=1 to pass bridged IPv4 traffic to iptables’ chains. This is a requirement for some CNI plugins to work, for more information please see here.
kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/v0.9.1/Documentation/kube-flannel.yml
```

```
# Controlling your cluster from machines other than the master.
# In order to get a kubectl on some other computer (e.g. laptop) to talk to your cluster, you need to copy kubeconfig from your master to your workstation.
# If you are using GCE, instances disable ssh access for root by default.
# If that’s the case you can log in to the machine, copy the file someplace that can be accessed and then use gcloud compute copy-files.
cp /etc/kubernetes/admin.conf /tmp
chown ubuntu:ubuntu /tmp/admin.conf
exit
# On your local machine
rm -fr ~/.kube
mkdir ~/.kube
scp ubuntu@52.88.44.52:/tmp/admin.conf ~/.kube/config
sudo chown $(id -u):$(id -g) ~/.kube/config
# export KUBECONFIG=~/.kube/config
# kubectl --kubeconfig ./admin.conf get nodes
```

```
# Taint master to host pods.
# This will remove the node-role.kubernetes.io/master taint from any nodes that have it, including the master node, 
# meaning that the scheduler will then be able to schedule pods everywhere
kubectl taint nodes --all node-role.kubernetes.io/master-
```

```
# Untaint so master does not host pods.
kubectl taint nodes --all node-role.kubernetes.io/master:NoSchedule
```

```
# Proxying API Server to localhost.
# If you want to connect to the API Server from outside the cluster you can use kubectl proxy.
# You can now access the API Server locally at http://localhost:8001/api/v1.
kubectl proxy --port=8081 &
```

```
NodeConfiguration
	metav1.TypeMeta
	CACertPath     string
	DiscoveryFile  string
	DiscoveryToken string
	// Currently we only pay attention to one api server but hope to support >1 in the future
	DiscoveryTokenAPIServers []string
	NodeName                 string
	TLSBootstrapToken        string
	Token                    string
	// DiscoveryTokenCACertHashes specifies a set of public key pins to verify
	// when token-based discovery is used. The root CA found during discovery
	// must match one of these values. Specifying an empty set disables root CA
	// pinning, which can be unsafe. Each hash is specified as "<type>:<value>",
	// where the only currently supported type is "sha256". This is a hex-encoded
	// SHA-256 hash of the Subject Public Key Info (SPKI) object in DER-encoded
	// ASN.1. These hashes can be calculated using, for example, OpenSSL:
	// openssl x509 -pubkey -in ca.crt openssl rsa -pubin -outform der 2>&/dev/null | openssl dgst -sha256 -hex
	DiscoveryTokenCACertHashes []string
	// DiscoveryTokenUnsafeSkipCAVerification allows token-based discovery
	// without CA verification via DiscoveryTokenCACertHashes. This can weaken
	// the security of kubeadm since other nodes can impersonate the master.
	DiscoveryTokenUnsafeSkipCAVerification bool
```

## Ansible

+ https://www.digitalocean.com/community/tutorials/how-to-create-a-kubernetes-cluster-using-kubeadm-on-centos-7
+ https://github.com/kairen/kubeadm-ansible
