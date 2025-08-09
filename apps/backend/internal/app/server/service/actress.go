package service

import (
	"media-lib/internal/app/server/model"
	"media-lib/internal/app/server/repository"
	"media-lib/internal/app/server/types"

	"github.com/samber/lo"
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
