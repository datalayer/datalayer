package spl

import (
	"encoding/gob"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/gorilla/sessions"
)

var sessionName = "kuber-spl"
var sessionKey = "spl-state"

var store = sessions.NewCookieStore([]byte("spl-session-secret"))

func init() {
	gob.Register(RequestCount{})
	store.Options = &sessions.Options{
		Path:     "/",      // to match all requests
		MaxAge:   3600 * 1, // 1 hour
		HttpOnly: false,
	}
}

func GetAllSpl(w http.ResponseWriter, r *http.Request) {

	count(w, r)

	spl := FindAll()

	bytes, err := json.Marshal(spl)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	writeJsonResponse(w, bytes)
}

func GetSpl(w http.ResponseWriter, r *http.Request) {

	count(w, r)

	vars := mux.Vars(r)
	name := vars["name"]

	com, ok := FindBy(name)
	if !ok {
		http.NotFound(w, r)
		return
	}

	bytes, err := json.Marshal(com)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	writeJsonResponse(w, bytes)
}

func SaveSpl(w http.ResponseWriter, r *http.Request) {

	count(w, r)

	body, err := ioutil.ReadAll(r.Body)
	fmt.Println(string(body))

	if err != nil {
		log.Fatal("error", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	com := new(Spl)
	err = json.Unmarshal(body, com)
	if err != nil {
		log.Fatal("error", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	Save(com.Name, com)

	w.Header().Set("Location", r.URL.Path+"/"+com.Name)
	w.WriteHeader(http.StatusCreated)

	comB, _ := json.Marshal(com)
	writeJsonResponse(w, comB)

}

func UpdateSpl(w http.ResponseWriter, r *http.Request) {

	count(w, r)

	vars := mux.Vars(r)
	name := vars["name"]

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Fatal("error", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	com := new(Spl)
	err = json.Unmarshal(body, com)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	Save(name, com)

	comB, _ := json.Marshal(com)
	writeJsonResponse(w, comB)

}

func DeleteSpl(w http.ResponseWriter, r *http.Request) {

	count(w, r)

	vars := mux.Vars(r)
	name := vars["name"]

	Remove(name)
	//	w.WriteHeader(http.StatusNoContent)

	mapD := map[string]int{"apple": 5, "lettuce": 7}
	mapB, _ := json.Marshal(mapD)
	writeJsonResponse(w, mapB)

}

func writeJsonResponse(w http.ResponseWriter, bytes []byte) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.Write(bytes)
}

func count(w http.ResponseWriter, r *http.Request) {
	session, _ := store.Get(r, sessionName)
	value := session.Values[sessionKey]
	var requestCount RequestCount
	if value == nil {
		fmt.Println("null")
		json.Unmarshal([]byte(`
			{"count": 0},
		`), &requestCount)
		fmt.Println(requestCount)
	} else {
		requestCount, _ = value.(RequestCount)
	}
	requestCount.Count++
	fmt.Println(requestCount.Count)
	session.Values[sessionKey] = requestCount
	err := session.Save(r, w)
	if err != nil {
		log.Println(err)
	}

}
