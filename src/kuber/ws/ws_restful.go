package ws

import (
	restful "github.com/emicklei/go-restful"
)

type WsResource struct {
	WsMessage WsMessage
}

func (wsr *WsResource) ToWs(request *restful.Request, response *restful.Response) {
	Ws(response.ResponseWriter, request.Request)
}

func (wsr WsResource) WebService() *restful.WebService {
	ws := new(restful.WebService)
	ws.Path("/kuber/api/v1/ws").
		Consumes(restful.MIME_JSON).
		Produces(restful.MIME_JSON)
	ws.Route(ws.GET("/").To(wsr.ToWs))
	return ws
}
