package rest

import (
	"net/http"

	"github.com/datalayer/datalayer/src/k8s/kuber/spl"
	"github.com/datalayer/datalayer/src/k8s/kuber/ws"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func SetupGorilla() *mux.Router {

	r := mux.NewRouter().StrictSlash(false)

	s := r.PathPrefix("/spl/v1").Subrouter()
	s.Methods("GET").Path("/spl").HandlerFunc(spl.GetAllSpl)
	s.Methods("POST").Path("/spl").HandlerFunc(spl.SaveSpl)
	s.Methods("GET").Path("/spl/{name}").HandlerFunc(spl.GetSpl)
	s.Methods("PUT").Path("/spl/{name}").HandlerFunc(spl.UpdateSpl)
	s.Methods("DELETE").Path("/spl/{name}").HandlerFunc(spl.DeleteSpl)

	r.PathPrefix("/echo").HandlerFunc(ws.Echo)
	r.PathPrefix("/pipe").HandlerFunc(ws.Pipe)
	r.PathPrefix("/ws").HandlerFunc(ws.Ws)

	r.PathPrefix("/").Handler(http.FileServer(http.Dir("./static/")))

	return r

}

func CredentialsOk() handlers.CORSOption {
	return handlers.AllowCredentials()
}

func HeadersOk() handlers.CORSOption {
	return handlers.AllowedHeaders(AllowedHeaders())
}

func OriginsOk() handlers.CORSOption {
	return handlers.AllowedOrigins(AllowedOrigins())
}

func MethodsOk() handlers.CORSOption {
	return handlers.AllowedMethods(AllowedMethods())

}
