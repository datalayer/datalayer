package spl

type Spl struct {
	ID    int    `json:"id" description:"identifier of the user"`
	Name  string `json:"name" description:"name of the user" default:"john"`
	Age   int    `json:"age" description:"age of the user" default:"21"`
	Tel   string `json:"tel"`
	Email string `json:"email"`
}

type RequestCount struct {
	Count int `json:"count"`
}

var database = make(map[string]interface{})

func FindAll() []interface{} {
	items := make([]interface{}, 0, len(database))
	for _, v := range database {
		items = append(items, v)
	}
	return items
}

func FindBy(key string) (interface{}, bool) {
	com, ok := database[key]

	return com, ok
}

func Save(key string, item interface{}) {
	database[key] = item
}

func Remove(key string) {
	delete(database, key)
}
