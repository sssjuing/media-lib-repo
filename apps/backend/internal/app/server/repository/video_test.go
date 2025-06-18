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
	videos, _ := videoRepo.FindAll(VidoesQueryOptions{Tags: []string{"OL"}})
	t.Log(len(videos))
	for _, v := range videos {
		t.Log(v.SerialNumber)
		for _, a := range v.Actresses {
			t.Log(a.UniqueName)
		}
	}
	allVideos, _ := videoRepo.FindAll(VidoesQueryOptions{})
	t.Log(len(allVideos))
}

func TestPaginateAll(t *testing.T) {
	videos, _ := videoRepo.PaginateAll(VidoesQueryOptions{Page: 2, Size: 10})
	for _, v := range videos {
		t.Log(v.SerialNumber)
	}
}

func TestCount(t *testing.T) {
	count1, _ := videoRepo.Count(VidoesQueryOptions{})
	t.Log(count1)
	count2, _ := videoRepo.Count(VidoesQueryOptions{Tags: []string{"OL"}})
	t.Log(count2)
}
