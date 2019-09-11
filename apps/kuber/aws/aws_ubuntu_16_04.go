package aws

import (
	"fmt"

	"github.com/kris-nova/kubicorn/apis/cluster"
	"github.com/kris-nova/kubicorn/cutil/kubeadm"
	"github.com/kris-nova/kubicorn/cutil/uuid"
)

func NewUbuntuCluster(name string, zone string, image string) *cluster.Cluster {

	return &cluster.Cluster{
		Name:     name,
		Cloud:    cluster.CloudAmazon,
		Location: zone,
		SSH: &cluster.SSH{
			PublicKeyPath: "~/.ssh/id_rsa.pub",
			User:          "ubuntu",
		},
		KubernetesAPI: &cluster.KubernetesAPI{
			Port: "443",
		},
		Network: &cluster.Network{
			Type:       cluster.NetworkTypePublic,
			CIDR:       "10.0.0.0/16",
			InternetGW: &cluster.InternetGW{},
		},
		Values: &cluster.Values{
			ItemMap: map[string]string{
				"INJECTEDTOKEN": kubeadm.GetRandomToken(),
			},
		},
		ServerPools: []*cluster.ServerPool{
			{
				Type:     cluster.ServerPoolTypeMaster,
				Name:     fmt.Sprintf("%s.master", name),
				MaxCount: 1,
				MinCount: 1,
				Image:    image,
				Size:     "c5.4xlarge",
				BootstrapScripts: []string{
					"https://raw.githubusercontent.com/datalayer/datalayer/master/aws/aws_k8s_ubuntu_16.04_master.sh",
				},
				InstanceProfile: &cluster.IAMInstanceProfile{
					Name: fmt.Sprintf("%s-KubicornMasterInstanceProfile", name),
					Role: &cluster.IAMRole{
						Name: fmt.Sprintf("%s-KubicornMasterRole", name),
						Policies: []*cluster.IAMPolicy{
							{
								Name: "MasterPolicy",
								Document: `{
								  "Version": "2012-10-17",
								  "Statement": [
									 {
										"Effect": "Allow",
										"Action": [
										   "ec2:*",
										   "elasticloadbalancing:*",
										   "ecr:GetAuthorizationToken",
										   "ecr:BatchCheckLayerAvailability",
										   "ecr:GetDownloadUrlForLayer",
										   "ecr:GetRepositoryPolicy",
										   "ecr:DescribeRepositories",
										   "ecr:ListImages",
										   "ecr:BatchGetImage",
										   "autoscaling:DescribeAutoScalingGroups",
										   "autoscaling:UpdateAutoScalingGroup"
										],
										"Resource": "*"
									 }
								  ]
								}`,
							},
						},
					},
				},
				Subnets: []*cluster.Subnet{
					{
						Name: fmt.Sprintf("%s.master", name),
						CIDR: "10.0.0.0/24",
						Zone: zone + "a",
					},
				},
				AwsConfiguration: &cluster.AwsConfiguration{},
				Firewalls: []*cluster.Firewall{
					{
						Name: fmt.Sprintf("%s.master-external-%s", name, uuid.TimeOrderedUUID()),
						IngressRules: []*cluster.IngressRule{
							{
								IngressFromPort: "22",
								IngressToPort:   "22",
								IngressSource:   "0.0.0.0/0",
								IngressProtocol: "tcp",
							},
							{
								IngressFromPort: "443",
								IngressToPort:   "443",
								IngressSource:   "0.0.0.0/0",
								IngressProtocol: "tcp",
							},
							{
								IngressFromPort: "0",
								IngressToPort:   "65535",
								IngressSource:   "10.0.100.0/24",
								IngressProtocol: "-1",
							},
							{
								IngressFromPort: "0",
								IngressToPort:   "65535",
								IngressSource:   "0.0.0.0/0",
								IngressProtocol: "-1",
							},
						},
					},
				},
			},
			{
				Type:     cluster.ServerPoolTypeNode,
				Name:     fmt.Sprintf("%s.node", name),
				MaxCount: 3,
				MinCount: 3,
				Image:    image,
				Size:     "r4.2xlarge",
				BootstrapScripts: []string{
					"https://raw.githubusercontent.com/datalayer/datalayer/master/aws/aws_k8s_ubuntu_16.04_node.sh",
				},
				InstanceProfile: &cluster.IAMInstanceProfile{
					Name: fmt.Sprintf("%s-KubicornNodeInstanceProfile", name),
					Role: &cluster.IAMRole{
						Name: fmt.Sprintf("%s-KubicornNodeRole", name),
						Policies: []*cluster.IAMPolicy{
							{
								Name: "NodePolicy",
								Document: `{
								  "Version": "2012-10-17",
								  "Statement": [
									 {
										"Effect": "Allow",
										"Action": [
											"ec2:*",
											"ec2:Describe*",
											"ec2:AttachVolume",
											"ec2:DetachVolume",
											"ecr:GetAuthorizationToken",
											"ecr:BatchCheckLayerAvailability",
											"ecr:GetDownloadUrlForLayer",
											"ecr:GetRepositoryPolicy",
											"ecr:DescribeRepositories",
											"ecr:ListImages",
											"ecr:BatchGetImage",
											"autoscaling:DescribeAutoScalingGroups",
											"autoscaling:UpdateAutoScalingGroup"
										],
										"Resource": "*"
									 }
								  ]
								}`,
							},
						},
					},
				},
				Subnets: []*cluster.Subnet{
					{
						Name: fmt.Sprintf("%s.node", name),
						CIDR: "10.0.100.0/24",
						Zone: zone + "a",
					},
				},
				AwsConfiguration: &cluster.AwsConfiguration{
				//					SpotPrice: "0.6",
				},
				Firewalls: []*cluster.Firewall{
					{
						Name: fmt.Sprintf("%s.node-external-%s", name, uuid.TimeOrderedUUID()),
						IngressRules: []*cluster.IngressRule{
							{
								IngressFromPort: "22",
								IngressToPort:   "22",
								IngressSource:   "0.0.0.0/0",
								IngressProtocol: "tcp",
							},
							{
								IngressFromPort: "0",
								IngressToPort:   "65535",
								IngressSource:   "10.0.0.0/24",
								IngressProtocol: "-1",
							},
							{
								IngressFromPort: "0",
								IngressToPort:   "65535",
								IngressSource:   "0.0.0.0/0",
								IngressProtocol: "-1",
							},
						},
					},
				},
			},
		},
	}
}
