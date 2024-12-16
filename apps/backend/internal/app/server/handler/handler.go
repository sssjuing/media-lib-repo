package handler

import (
	"media-lib/internal/app/server/store"
)

type Handler struct {
	actressStore store.IActressStore
	videoStore   store.IVideoStore
}

func NewHandler(as store.IActressStore, vs store.IVideoStore) *Handler {

	return &Handler{
		actressStore: as,
		videoStore:   vs,
	}
}
