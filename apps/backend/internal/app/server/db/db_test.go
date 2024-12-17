package db

import (
	"media-lib/internal/pkg/config"
	"testing"
)

func TestAutoMigrate(t *testing.T) {
	dsn := config.GetMysqlDsn()
	d := NewDB(dsn)
	AutoMigrate(d)
}
