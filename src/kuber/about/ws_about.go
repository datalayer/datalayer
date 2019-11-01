package about

import (
	"fmt"
	"net/http"
	"path"

	restful "github.com/emicklei/go-restful"
)

var rootdir = "./static"

type AboutResource struct {
}

func (m AboutResource) WebService() *restful.WebService {
	ws := new(restful.WebService)
	ws.Path("/kuber/about")
	ws.Route(ws.GET("/{subpath:*}").To(staticFromPathParam))
	return ws
}

func staticFromPathParam(req *restful.Request, resp *restful.Response) {
	actual := path.Join(rootdir, req.PathParameter("subpath"))
	if actual == "" {
		actual = "index.html"
	}
	fmt.Printf("serving %s ... (from %s)\n", actual, req.PathParameter("subpath"))
	http.ServeFile(
		resp.ResponseWriter,
		req.Request,
		actual)
}
