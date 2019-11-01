package aws

import (
	"fmt"
	"testing"
)

/*
US East (Ohio) 	us-east-2
US East (N. Virginia) 	us-east-1
US West (N. California) 	us-west-1
US West (Oregon) 	us-west-2
Asia Pacific (Mumbai) 	ap-south-1
Asia Pacific (Seoul) 	ap-northeast-2
Asia Pacific (Osaka-Local) 	ap-northeast-3
Asia Pacific (Singapore) 	ap-southeast-1
Asia Pacific (Sydney) 	ap-southeast-2
Asia Pacific (Tokyo) 	ap-northeast-1
Canada (Central) 	ca-central-1
China (Beijing) 	cn-north-1
EU (Frankfurt) 	eu-central-1
EU (Ireland) 	eu-west-1
EU (London) 	eu-west-2
EU (Paris) 	eu-west-3
South America (São Paulo) 	sa-east-1
*/
const region_eu_central_1 = "eu-central-1"
const region_us_west_1 = "us-west-1"
const region_us_west_2 = "us-west-2"
const region_us_east_1 = "us-east-1"
const region = region_eu_central_1

func TestMain(m *testing.M) {
	m.Run()
	//	logger.TestMode = true
	//	logger.Level = 4
	//	testCluster = amazon.NewUbuntuCluster("aws-ubuntu-test")
}

func TestKuberVolumes(t *testing.T) {
	volumes := KuberVolumes(region)
	fmt.Println(volumes)
}

func TestKuberVolumesForInstance(t *testing.T) {
	volumes := KuberVolumesForInstance(region, "i-08a86a21b0b7c22a7")
	fmt.Println(volumes)
}

func TestInstancesByRegions(t *testing.T) {
	InstancesByRegions([]string{"running"}, []string{region})
}

func TestInstancesByTag(t *testing.T) {
	//	resp := InstancesByTag("KubernetesCluster", "kuber", region)
	resp := InstancesByTag("Name", "datalayer.master", region)
	t.Logf("%+v\n", *resp)
}

func TestTagResource(t *testing.T) {
	resp := InstancesByTag("Name", "datalayer.master2", region)
	for _, instance := range resp.Reservations[0].Instances {
		id := *instance.InstanceId
		fmt.Println(id)
		TagResource(id, "foo", "bar", region)
	}
}

func TestGetLoadBalancersByTag(t *testing.T) {
	resp := GetLoadBalancersByTag("datalayer-role", "kuber", region)
	fmt.Println(resp)
}
func TestRegisterInstanceToLoadBalancer(t *testing.T) {
	inst := InstancesByTag("Name", "datalayer.master", region).Reservations[0].Instances[0].InstanceId
	fmt.Println(*inst)
	lb := GetLoadBalancersByTag("datalayer-role", "datalayer", region)[0]
	fmt.Println(*lb)
	result := RegisterInstanceToLoadBalancer(inst, lb, region)
	fmt.Println(result)
}

func TestScaleWorkers(t *testing.T) {
	result := ScaleWorkers(3, 3, region)
	fmt.Println(result)
}

func TestListS3Buckets(t *testing.T) {
	result := ListS3Buckets(region)
	fmt.Println(result)
}

func TestListS3Bucket(t *testing.T) {
	ListS3Bucket(region, "datalayer")
}

func TestDownloadS3Bucket(t *testing.T) {
	DownloadS3Bucket(region, "datalayer", "", "/tmp/s3")
}
