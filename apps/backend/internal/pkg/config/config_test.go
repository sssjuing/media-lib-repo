package config

import (
	"fmt"
	"testing"
)

func TestGetMysqlDsn(t *testing.T) {
	dsn := GetMysqlDsn()
	fmt.Println(dsn)
}

func TestGetMinioPublicUrl(t *testing.T) {
	url := GetMinioPublicUrl()
	fmt.Println(url)
}
