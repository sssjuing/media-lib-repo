package repository

import (
	"testing"

	"github.com/sssjuing/media-lib-repo/apps/backend/internal/app/server/db"
	"github.com/sssjuing/media-lib-repo/apps/backend/internal/pkg/config"
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
