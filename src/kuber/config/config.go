package config

const DefaultRegion = "eu-central-1"

var KuberConfig Config

var KuberConfigSecret ConfigSecret

type Config struct {
	GoogleClientId    string `json:"googleClientId"`
	GoogleRedirect    string `json:"googleRedirect"`
	GoogleScope       string `json:"googleScope"`
	LibraryRest       string `json:"libraryRest"`
	Hdfs              string `json:"hdfs"`
	IamRest           string `json:"iamRest"`
	JupyterhubUi      string `json:"jupyterhubUi"`
	KuberRest         string `json:"kuberRest"`
	KuberWs           string `json:"kuberWs"`
	MicrosoftRedirect string `json:"microsoftRedirect"`
	TwitterRedirect   string `json:"twitterRedirect"`
	//	Server   ServerConfig
	//	Database PersistenceConfig
}

type ConfigSecret struct {
	GoogleSecret           string `json:"googleSecret"`
	GoogleApiKey           string `json:"googleApiKey"`
	MicrosoftApplicationId string `json:"microsoftApplicationId"`
	MicrosoftScope         string `json:"microsoftScope"`
	MicrosoftSecret        string `json:"microsoftSecret"`
	TwitterConsumerKey     string `json:"twitterConsumerKey"`
	TwitterConsumerSecret  string `json:"twitterConsumerSecret"`
}

type ServerConfig struct {
	Port int
}

type PersistenceConfig struct {
	ConnectionUri string
}
