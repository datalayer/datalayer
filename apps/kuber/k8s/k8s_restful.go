package k8s

import (
	"strconv"

	"github.com/datalayer/datalayer/apps/kuber/aws"
	cf "github.com/datalayer/datalayer/apps/kuber/config"
	"github.com/emicklei/go-restful"
)

type Cluster struct {
	ID   string `json:"id" description:"identifier of the kuber"`
	Name string `json:"name" description:"name of the cluster"`
}
type ClusterResource struct {
}

func (cl ClusterResource) WebService() *restful.WebService {
	ws := new(restful.WebService)
	ws.Path("/kuber/api/v1/k8s").
		Consumes(restful.MIME_JSON).
		Produces(restful.MIME_JSON)
	ws.Route(ws.GET("/cluster/scale/{size}").To(cl.ScaleCluster))
	return ws
}

func (cl ClusterResource) ScaleCluster(request *restful.Request, response *restful.Response) {
	nw, _ := strconv.Atoi(request.PathParameter("size"))
	scaled := aws.ScaleWorkers(int64(nw), int64(nw), cf.DefaultRegion)
	response.WriteEntity(scaled)
}
