package ws

import (
	"fmt"
	"net/http"

	"github.com/gorilla/websocket"
)

var echoUpgrader = websocket.Upgrader{
	CheckOrigin:       func(r *http.Request) bool { return true },
	ReadBufferSize:    1024,
	WriteBufferSize:   1024,
	EnableCompression: false,
}

func Echo(w http.ResponseWriter, r *http.Request) {

	conn, err := echoUpgrader.Upgrade(w, r, nil)
	if err != nil {
		http.Error(w, "Could not open websocket connection", http.StatusBadRequest)
	}

	for {

		m := WsMessage{}
		err := conn.ReadJSON(&m)
		if err != nil {
			fmt.Println("Error reading json.", err)
		}

		fmt.Printf("Got message: %#v\n", m)

		if err = conn.WriteJSON(m); err != nil {
			fmt.Println(err)
			conn.Close()
		}

	}

}
