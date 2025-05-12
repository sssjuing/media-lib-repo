package config

import (
	"fmt"
	"log"
	"media-lib/internal/pkg/utils"

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
		configsDirPath := utils.GetRootPath() + "/configs"
		config.AddConfigPath(configsDirPath)
		if err := config.ReadInConfig(); err != nil {
			log.Fatal("Error on parsing default configuration file. ", err)
		}
	}
}

func GetConfig() *viper.Viper {
	return config
}

func GetPostgresDsn() string {
	host := config.GetString("postgres.host")
	port := config.GetString("postgres.port")
	username := config.GetString("postgres.username")
	password := config.GetString("postgres.password")
	dbname := config.GetString("postgres.dbname")
	// host=localhost user=gorm password=gorm dbname=gorm port=9920 sslmode=disable TimeZone=Asia/Shanghai
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Shanghai", host, username, password, dbname, port)
	return dsn
}

func GetMinioPublicUrl() string {
	endpoint := config.GetString("minio.public_endpoint")
	bucketName := config.GetString("minio.bucket_name")
	return fmt.Sprintf("//%s/%s/", endpoint, bucketName)
}
