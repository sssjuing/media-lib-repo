package config

import (
	"fmt"
	"log"
	"media-lib/internal/pkg/util"

	"github.com/spf13/viper"
)

var config *viper.Viper

// Init is an exported method that takes the environment starts the viper
// (external lib) and returns the configuration struct.
func init() {
	config = viper.New()
	config.SetConfigType("yaml")
	config.SetConfigName("config")
	// config.AddConfigPath("$MEDIA_LIB_CONFIG_PATH")
	config.AddConfigPath("/etc/media-lib")

	if err := config.ReadInConfig(); err != nil {
		configsDirPath := util.GetRootPath() + "/configs"
		config.AddConfigPath(configsDirPath)
		if err := config.ReadInConfig(); err != nil {
			log.Fatal("Error on parsing default configuration file. ", err)
		}
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

func GetMinioPublicUrl() string {
	endpoint := config.GetString("minio.public_endpoint")
	bucketName := config.GetString("minio.bucket_name")
	return fmt.Sprintf("//%s/%s/", endpoint, bucketName)
}
