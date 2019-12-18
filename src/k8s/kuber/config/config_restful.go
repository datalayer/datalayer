package config

import (
	"github.com/emicklei/go-restful"
)

type ConfigResource struct {
	Config Config
}

func (c ConfigResource) WebService() *restful.WebService {
	ws := new(restful.WebService)
	ws.Path("/kuber/api/v1/config").
		Consumes(restful.MIME_JSON).
		Produces(restful.MIME_JSON)
	ws.Route(ws.GET("/").To(c.GetConf))
	return ws
}

func (c ConfigResource) GetConf(request *restful.Request, response *restful.Response) {
	response.WriteEntity(KuberConfig)
}
