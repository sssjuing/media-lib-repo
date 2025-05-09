package config

import (
	"fmt"
	"testing"
)

func TestGetPostgresDsn(t *testing.T) {
	dsn := GetPostgresDsn()
	fmt.Println(dsn)
}

func TestGetMinioPublicUrl(t *testing.T) {
	url := GetMinioPublicUrl()
	fmt.Println(url)
}
