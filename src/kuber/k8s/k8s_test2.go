package k8s

import (
	"fmt"
	"net"
	"testing"
	"time"

	"github.com/kris-nova/kubicorn/apis/cluster"
	"github.com/kris-nova/kubicorn/cutil"
	"github.com/kris-nova/kubicorn/cutil/initapi"
	"github.com/kris-nova/kubicorn/cutil/logger"
	"github.com/kris-nova/kubicorn/profiles/amazon"
)

const (
	ApiSleepSeconds   = 5
	ApiSocketAttempts = 40
	ClusterName       = "kuber-test-1"
	AwsProfile        = "kuber-test"
)

var testCluster *cluster.Cluster

func TestMain(m *testing.M) {
	m.Run()
}

func TestGetSateStore(t *testing.T) {
	kc := KuberCluster{
		Name: "kuber",
	}
	stateStore := GetStateStore(kc)
	fmt.Println(stateStore)
}

func TestCreateClusterDef(t *testing.T) {
	CreateClusterDef(Options(ClusterName, AwsProfile))
}

func TestGetCluster(t *testing.T) {
	kc := KuberCluster{
		Name: "kuber",
	}
	cluster, err := GetCluster(kc)
	if err != nil {
		panic(err.Error())
	}
	fmt.Println(cluster)
	fmt.Println(cluster.GetCreationTimestamp())
	fmt.Println(cluster.GetName())
}

func TestCreateCluster(t *testing.T) {
	CreateCluster(Options(ClusterName, AwsProfile))
}

func TestDeleteCluster(t *testing.T) {
	DeleteCluster(Options(ClusterName, AwsProfile))
}

func TestCreateDeleteCluster(t *testing.T) {

	logger.Level = 4

	cluster := amazon.NewUbuntuCluster("TestCluster")
	cluster, err := initapi.InitCluster(cluster)
	if err != nil {
		panic(err.Error())
	}

	reconciler, err := cutil.GetReconciler(cluster, &cutil.RuntimeParameters{AwsProfile: "default"})
	if err != nil {
		panic(err.Error())
	}
	expected, err := reconciler.Expected(cluster)
	if err != nil {
		panic(err.Error())
	}
	actual, err := reconciler.Actual(cluster)
	if err != nil {
		panic(err.Error())
	}
	created, err := reconciler.Reconcile(actual, expected)
	logger.Success("Created cluster [%s]", created.Name)
	if err != nil {
		panic(err.Error())
	}
	_, err = reconciler.Destroy()
	if err != nil {
		panic(err.Error())
	}

}

func TestApiListen(t *testing.T) {
	success := false
	for i := 0; i < ApiSocketAttempts; i++ {
		_, err := assertTcpSocketAcceptsConnection(fmt.Sprintf("%s:%s", testCluster.KubernetesAPI.Endpoint, testCluster.KubernetesAPI.Port), "opening a new socket connection against the Kubernetes API")
		if err != nil {
			logger.Info("Attempting to open a socket to the Kubernetes API: %v...\n", err)
			time.Sleep(time.Duration(ApiSleepSeconds) * time.Second)
			continue
		}
		success = true
	}
	if !success {
		t.Fatalf("Unable to connect to Kubernetes API")
	}
}

func assertTcpSocketAcceptsConnection(addr, msg string) (bool, error) {
	conn, err := net.Dial("tcp", addr)
	if err != nil {
		return false, fmt.Errorf("%s: %s", msg, err)
	}
	defer conn.Close()
	return true, nil
}
