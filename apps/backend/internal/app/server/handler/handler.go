package handler

import (
	"github.com/sssjuing/media-lib-repo/apps/backend/internal/app/server/repository"
	"github.com/sssjuing/media-lib-repo/apps/backend/internal/app/server/service"
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
