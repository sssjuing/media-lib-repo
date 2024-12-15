package config

import (
	"fmt"
	"log"

	"github.com/spf13/viper"
)

var config *viper.Viper

// Init is an exported method that takes the environment starts the viper
// (external lib) and returns the configuration struct.
func init() {
	var err error
	config = viper.New()
	config.SetConfigType("yaml")
	config.SetConfigName("config")
	config.AddConfigPath("$CONFIG_PATH")
	config.AddConfigPath("/etc/webcamera")

	if err = config.ReadInConfig(); err != nil {
		log.Fatal("Error on parsing default configuration file. ", err)
	}

}

func GetConfig() *viper.Viper {
	return config
}

func GetMysqlDsn() string {
	host := config.GetString("mysql.host")
	port := config.GetString("mysql.port")
	username := config.GetString("mysql.username")
	password := config.GetString("mysql.password")
	dbname := config.GetString("mysql.dbname")
	// dsn := "<user>:<password>@tcp(<ip>:<port>)/<database_name>?charset=utf8&parseTime=True&loc=Local"
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8&parseTime=True&loc=Local", username, password, host, port, dbname)
	return dsn
}
