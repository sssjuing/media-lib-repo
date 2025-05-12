package service

import (
	"media-lib/internal/app/server/dto"
	"media-lib/internal/app/server/model"
	"media-lib/internal/app/server/repository"
	"media-lib/internal/pkg/utils"
)

type ActressService interface {
	GetList() ([]dto.ActressDTO, error)
}

type ActressServiceImpl struct {
	actressRepo repository.ActressRepository
}

func NewActressService(actressRepo repository.ActressRepository) *ActressServiceImpl {
	return &ActressServiceImpl{
		actressRepo: actressRepo,
	}
}

func (svc *ActressServiceImpl) GetList() ([]dto.ActressDTO, error) {
	actresses, err := svc.actressRepo.FindAll()
	if err != nil {
		return nil, err
	}
	list := utils.Map(actresses, func(a model.Actress) dto.ActressDTO {
		return *a.DTO()
	})
	return list, nil
}
