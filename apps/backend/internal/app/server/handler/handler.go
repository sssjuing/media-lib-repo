package handler

import (
	"media-lib/internal/app/server/repository"
	"media-lib/internal/app/server/service"
)

type Handler struct {
	actressRepo repository.ActressRepository
	actressSvc  service.ActressService
	videoRepo   repository.VideoRepository
	videoSvc    service.VideoService
}

func NewHandler(ar repository.ActressRepository, vr repository.VideoRepository) *Handler {
	as := service.NewActressService(ar)
	vs := service.NewVideoService(vr)
	return &Handler{
		actressRepo: ar,
		actressSvc:  as,
		videoRepo:   vr,
		videoSvc:    vs,
	}
}
