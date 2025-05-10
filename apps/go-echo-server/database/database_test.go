package database

import (
	"testing"
)

func TestAutoMigrate(t *testing.T) {
	d := New()
	AutoMigrate(d)
}
