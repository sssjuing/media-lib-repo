package service

import (
	"github.com/samber/lo"
	"github.com/sssjuing/media-lib-repo/apps/backend/internal/app/server/model"
	"github.com/sssjuing/media-lib-repo/apps/backend/internal/app/server/repository"
	"github.com/sssjuing/media-lib-repo/apps/backend/internal/app/server/types"
)

type ActressService interface {
	GetList() ([]types.ActressDTO, error)
}

type ActressServiceImpl struct {
	actressRepo repository.ActressRepository
}

func NewActressService(actressRepo repository.ActressRepository) *ActressServiceImpl {
	return &ActressServiceImpl{
		actressRepo: actressRepo,
	}
}

func (svc *ActressServiceImpl) GetList() ([]types.ActressDTO, error) {
	actresses, err := svc.actressRepo.FindAll()
	if err != nil {
		return nil, err
	}
	list := lo.Map(actresses, func(a model.Actress, _ int) types.ActressDTO {
		return *a.DTO()
	})
	return list, nil
}
