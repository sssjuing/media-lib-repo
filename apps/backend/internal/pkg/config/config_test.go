package config

import (
	"fmt"
	"testing"
)

func TestGetMysqlDsn(t *testing.T) {
	dsn := GetMysqlDsn()
	fmt.Println(dsn)
}
