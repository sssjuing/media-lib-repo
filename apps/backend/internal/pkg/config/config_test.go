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

func TestGetUsers(t *testing.T) {
	users, _ := GetUsers()
	for _, u := range users {
		t.Logf("username: %s, password: %s", u.Username, u.Password)
	}
}
