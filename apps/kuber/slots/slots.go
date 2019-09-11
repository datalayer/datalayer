package slots

import (
	"encoding/json"
	"fmt"

	"github.com/datalayer/datalayer/apps/kuber/log"
)

type Slot struct {
	Id     int    `json:"id"`
	Start  string `json:"start"`
	End    string `json:"end"`
	Title  string `json:"title"`
	Desc   string `json:"desc"`
	AllDay bool   `json:"allDay"`
}

var Slots []Slot

func init() {
	var s = []byte(`[
			{"Id":1, "Start": "2013-02-04T22:44:30.652Z", "End": "2013-02-05T22:44:30.652Z", "Title": "Title 1", "Desc": "Desc 1"}
		]`)
	err := json.Unmarshal(s, &Slots)
	if err != nil {
		fmt.Println("error:", err)
	}

//	log.Debug("Initial Slots: %v", Slots)

}

func PutSlots(slots []Slot) {
	log.Debug("Slots: %v", slots)
	Slots = slots
}
func GetSlots() []Slot {
	log.Debug("Slots: %v", Slots)
	return Slots
}
