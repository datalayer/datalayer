package k8s

import (
	"github.com/datalayer/datalayer/apps/kuber/aws"
	"github.com/datalayer/datalayer/apps/kuber/azure"
	"github.com/datalayer/datalayer/apps/kuber/util"

	"github.com/kris-nova/kubicorn/apis/cluster"
	"github.com/kris-nova/kubicorn/cmd"
	"github.com/kris-nova/kubicorn/cutil/logger"
	"github.com/kris-nova/kubicorn/state"
	"github.com/kris-nova/kubicorn/state/fs"
)

type KuberCluster struct {
	Name             string
	Location         string
	NodeInstanceType string
	Cluster          string
	Amazon           aws.AmazonKuberCluster
	Azure            azure.AzureKuberCluster
}

var stateStorePath = util.GetUserHome() + "/.datalayer/clusters/_state"

func init() {
	logger.Level = 4
	logger.TestMode = true
	logger.Fabulous = true
}

func Options(clusterName string, awsProfile string) cmd.Options {
	return cmd.Options{
		Name:           clusterName,
		CloudId:        cluster.CloudAmazon,
		AwsProfile:     awsProfile,
		StateStorePath: stateStorePath,
		StateStore:     "fs",
		Set:            "",
		GitRemote:      "",
	}
}

func CreateClusterDef(options cmd.Options) {
	opts := &cmd.CreateOptions{
		Profile: "aws",
		Options: options,
	}
	cmd.RunCreate(opts)
}

func CreateCluster(options cmd.Options) {
	opts := &cmd.ApplyOptions{
		Options: options,
	}
	cmd.RunApply(opts)
}

func GetCluster(kc KuberCluster) (*cluster.Cluster, error) {
	stateStore := GetStateStore(kc)
	readCluster, err := stateStore.GetCluster()
	if err != nil {
		return nil, err
	}
	return readCluster, nil
}

func DeleteCluster(options cmd.Options) {
	opts := &cmd.DeleteOptions{
		Options: options,
		Purge:   true,
	}
	cmd.RunDelete(opts)
}

func GetStateStore(kc KuberCluster) (stateStore state.ClusterStorer) {
	stateStore = fs.NewFileSystemStore(&fs.FileSystemStoreOptions{
		BasePath:    stateStorePath,
		ClusterName: kc.Name,
	})
	return stateStore
}
