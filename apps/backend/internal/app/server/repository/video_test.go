package repository

import (
	"media-lib/internal/app/server/db"
	"media-lib/internal/pkg/config"
	"testing"
)

var videoRepo VideoRepository

func init() {
	dsn := config.GetPostgresDsn()
	d := db.NewDB(dsn)
	videoRepo = NewVideoRepositoryImpl(d)
}

func TestFindAll(t *testing.T) {
	videos, _ := videoRepo.FindAll(QueryOptions{Tags: []string{"OL"}})
	t.Log(len(videos))
	for _, v := range videos {
		t.Log(v.SerialNumber)
		for _, a := range v.Actresses {
			t.Log(a.UniqueName)
		}
	}
	allVideos, _ := videoRepo.FindAll(QueryOptions{})
	t.Log(len(allVideos))
}
