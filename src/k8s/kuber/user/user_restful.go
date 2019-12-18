package user

import (
	"net/http"

	"github.com/emicklei/go-restful"
)

type User struct {
	ID    string `json:"id" description:"identifier of the user"`
	Name  string `json:"name" description:"name of the user" default:"john"`
	Phone string `json:"phone" description:"phone number of the user"`
	Age   int    `json:"age" description:"age of the user" default:"-1"`
}
type UserResource struct {
	// normally one would use DAO (data access object)
	Users map[string]User
}

func (u UserResource) WebService() *restful.WebService {
	ws := new(restful.WebService)
	ws.Path("/kuber/api/v1/user").
		Consumes(restful.MIME_JSON).
		Produces(restful.MIME_JSON)
	ws.Route(ws.GET("/").To(u.FindAllUsers))
	ws.Route(ws.GET("/{user-id}").To(u.FindUser))
	ws.Route(ws.POST("/{user-id}").To(u.CreateUser))
	ws.Route(ws.PUT("/{user-id}").To(u.UpdateUser))
	ws.Route(ws.PUT("").To(u.CreateUser))
	ws.Route(ws.DELETE("/{user-id}").To(u.RemoveUser))
	return ws
}

func (u UserResource) FindAllUsers(request *restful.Request, response *restful.Response) {
	list := []User{}
	for _, each := range u.Users {
		list = append(list, each)
	}
	response.WriteEntity(list)
}
func (u UserResource) FindUser(request *restful.Request, response *restful.Response) {
	id := request.PathParameter("user-id")
	usr := u.Users[id]
	if len(usr.ID) == 0 {
		response.WriteErrorString(http.StatusNotFound, "User could not be found.")
	} else {
		response.WriteEntity(usr)
	}
}
func (u *UserResource) CreateUser(request *restful.Request, response *restful.Response) {
	ID := request.PathParameter("user-id")
	usr := User{ID: ID}
	err := request.ReadEntity(&usr)
	if err == nil {
		usr.ID = ID
		u.Users[usr.ID] = usr
		response.WriteHeaderAndEntity(http.StatusCreated, usr)
	} else {
		response.WriteError(http.StatusInternalServerError, err)
	}
}
func (u *UserResource) UpdateUser(request *restful.Request, response *restful.Response) {
	usr := new(User)
	err := request.ReadEntity(&usr)
	if err == nil {
		u.Users[usr.ID] = *usr
		response.WriteEntity(usr)
	} else {
		response.WriteError(http.StatusInternalServerError, err)
	}
}
func (u *UserResource) RemoveUser(request *restful.Request, response *restful.Response) {
	id := request.PathParameter("user-id")
	delete(u.Users, id)
}
