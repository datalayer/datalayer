package config

import (
	"bytes"
	"fmt"
	"log"
	"testing"

	"github.com/spf13/viper"
	"github.com/stretchr/testify/assert"
)

func TestLoad(t *testing.T) {

	//	os.Setenv("KUBER_EXPLORER_UI", "1")
	//	os.Setenv("KUBER_EXPLORERUI", "1")

	viper.SetEnvPrefix("kuber")
	//	viper.SetEnvKeyReplacer(strings.NewReplacer("_", ""))
	viper.AutomaticEnv()

	viper.SetConfigName("kuber")
	viper.SetConfigType("yml")
	viper.AddConfigPath(".")
	var configuration Config
	if err := viper.ReadInConfig(); err != nil {
		log.Fatalf("Error reading config file, %s", err)
	}
	err := viper.Unmarshal(&configuration)
	if err != nil {
		log.Fatalf("unable to decode into struct, %v", err)
	}
	fmt.Printf("Config is %v\n", configuration)
	//	log.Printf("database uri is %s", configuration.Database.ConnectionUri)
	//  log.Printf("port for this application is %d", configuration.Server.Port)
	fmt.Printf("LibraryRest: %v\n", configuration.LibraryRest)
}

func TestYaml(t *testing.T) {
	viper.SetConfigType("yaml") // or viper.SetConfigType("YAML")
	// any approach to require this configuration into your program.
	var yamlExample = []byte(`
Hacker: true
name: steve
hobbies:
- skateboarding
- snowboarding
- go
clothing:
  jacket: leather
  trousers: denim
age: 35
eyes : brown
beard: true
`)
	viper.ReadConfig(bytes.NewBuffer(yamlExample))
	n := viper.GetString("name")
	assert.Equal(t, n, "steve", "they should be equal")
}
