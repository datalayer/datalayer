package spl

import (
	"net/http"
	"strconv"

	"github.com/emicklei/go-restful"
)

var ID int = 0

type SplResource struct {
	// normally one would use DAO (data access object)
	Spls map[int]Spl
}

func (u SplResource) WebService() *restful.WebService {
	ws := new(restful.WebService)
	ws.Path("/kuber/api/v1/spl").
		Consumes(restful.MIME_JSON).
		Produces(restful.MIME_JSON)
	ws.Route(ws.GET("/all").To(u.GetAllSpl))
	ws.Route(ws.GET("/").To(u.FindAllSpls))
	ws.Route(ws.GET("/{spl-id}").To(u.FindSpl))
	ws.Route(ws.PUT("").To(u.CreateSpl))
	ws.Route(ws.PUT("/{spl-id}").To(u.UpdateSpl))
	ws.Route(ws.DELETE("/{spl-id}").To(u.RemoveSpl))
	return ws
}
func (u SplResource) FindAllSpls(request *restful.Request, response *restful.Response) {
	list := []Spl{}
	for _, each := range u.Spls {
		list = append(list, each)
	}
	response.WriteEntity(list)
}
func (u SplResource) GetAllSpl(request *restful.Request, response *restful.Response) {
	GetAllSpl(response.ResponseWriter, request.Request)
}
func (u SplResource) FindSpl(request *restful.Request, response *restful.Response) {
	ids := request.PathParameter("spl-id")
	id, _ := strconv.Atoi(ids)
	usr := u.Spls[id]
	if usr.ID == 0 {
		response.WriteErrorString(http.StatusNotFound, "Spl could not be found.")
	} else {
		response.WriteEntity(usr)
	}
}
func (u *SplResource) CreateSpl(request *restful.Request, response *restful.Response) {
	usr := new(Spl)
	ID++
	usr.ID = ID
	err := request.ReadEntity(&usr)
	if err == nil {
		u.Spls[usr.ID] = *usr
		response.WriteEntity(usr)
	} else {
		response.WriteError(http.StatusInternalServerError, err)
	}
}
func (u *SplResource) UpdateSpl(request *restful.Request, response *restful.Response) {
	ids := request.PathParameter("spl-id")
	id, _ := strconv.Atoi(ids)
	usr := Spl{ID: id}
	err := request.ReadEntity(&usr)
	if err == nil {
		u.Spls[usr.ID] = usr
		response.WriteHeaderAndEntity(http.StatusCreated, usr)
	} else {
		response.WriteError(http.StatusInternalServerError, err)
	}
}
func (u *SplResource) RemoveSpl(request *restful.Request, response *restful.Response) {
	ids := request.PathParameter("spl-id")
	id, _ := strconv.Atoi(ids)
	delete(u.Spls, id)
}
