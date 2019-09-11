package helm

import (
	"testing"

	"github.com/datalayer/datalayer/apps/kuber/cluster"
	"github.com/datalayer/datalayer/apps/kuber/log"
	c "github.com/kris-nova/kubicorn/apis/cluster"
)

const (
	clusterName = "kuber"
	chartName   = "etcd"
	releaseName = "kuber-etcd-test"
)

var overrides = []byte(`{"StorageClass":"gp2"}`)

func TestMain(m *testing.M) {
	m.Run()
}

func TestDeploy(t *testing.T) {
	res, err := Deploy(getCluster(), chartName, releaseName, overrides)
	if err != nil {
		panic(err.Error())
	}
	log.Info("%+v\n", res)
}

func TestGetDeployment(t *testing.T) {
	res, err := GetDeployment(getCluster(), releaseName)
	if err != nil {
		panic(err.Error())
	}
	log.Info("%+v\n", res)
}

func TestGetDeployments(t *testing.T) {
	res, err := GetDeployments(getCluster(), nil)
	if err != nil {
		panic(err.Error())
	}
	log.Info("%+v\n", res)
}

func TestPurgeDeployment(t *testing.T) {
	err := PurgeDeployment(getCluster(), releaseName)
	if err != nil {
		panic(err.Error())
	}
}

func TestCheckDeploymentState(t *testing.T) {
	state, err := CheckDeploymentState(getCluster(), releaseName)
	if err != nil {
		panic(err.Error())
	}
	log.Info("State: " + state)
}

func getCluster() *c.Cluster {
	kc := cluster.KuberCluster{
		Name: clusterName,
	}
	cluster, err := cluster.GetCluster(kc)
	if err != nil {
		panic(err.Error())
	}
	return cluster
}
