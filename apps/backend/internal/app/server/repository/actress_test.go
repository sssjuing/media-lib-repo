package repository

import (
	"media-lib/internal/app/server/db"
	"media-lib/internal/pkg/config"
	"testing"
)

var actressRepo ActressRepository

func init() {
	dsn := config.GetPostgresDsn()
	d := db.NewDB(dsn)
	actressRepo = NewActressRepositoryImpl(d)
}

func TestFindVideos(t *testing.T) {
	videos, _ := actressRepo.FindVideos(62)
	for _, v := range videos {
		t.Log("\n", v.SerialNumber, v.ReleaseDate)
		for _, a := range v.Actresses {
			t.Log(a.UniqueName)
		}
	}
}
