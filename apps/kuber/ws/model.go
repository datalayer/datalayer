package ws

import (
	"github.com/aws/aws-sdk-go/service/autoscaling"
	"github.com/aws/aws-sdk-go/service/ec2"
	"github.com/datalayer/datalayer/apps/kuber/slots"
	corev1 "k8s.io/api/core/v1"
)

type WsMessage struct {
	Op            string        `json:"op"`
	Message       interface{}   `json:"message"`
	Cluster       Cluster       `json:"cluster,omitempty"`
	ClusterStatus ClusterStatus `json:"clusterStatus,omitempty"`
	Slots         []slots.Slot  `json:"slots,omitempty"`
}

type Cluster struct {
	ClusterName string `json:"clusterName,omitempty"`
	AwsProfile  string `json:"awsProfile,omitempty`
}

type ClusterStatus struct {
	ClusterName               string                       `json:"clusterName,omitempty"`
	AwsProfile                string                       `json:"awsProfile,omitempty`
	AwsInstances              *ec2.DescribeInstancesOutput `json:"awsInstances,omitempty"`
	AwsMasterAutoscalingGroup *autoscaling.Group           `json:"awsMasterAutoscalingGroup,omitempty"`
	AwsWorkerAutoscalingGroup *autoscaling.Group           `json:"awsWorkerAutoscalingGroup,omitempty"`
	Nodes                     *corev1.NodeList             `json:"nodes,omitempty"`
	Pods                      *corev1.PodList              `json:"pods,omitempty"`
}
