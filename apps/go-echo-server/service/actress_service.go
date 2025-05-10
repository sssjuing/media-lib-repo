package service

import (
	"errors"
	"go-echo-server/model"
	"go-echo-server/util"

	"gorm.io/gorm"
)

type ActressService struct {
	db *gorm.DB
}

func NewActressStore(db *gorm.DB) *ActressService {
	return &ActressService{
		db: db,
	}
}

func (as *ActressService) GetList() ([]model.Actress, error) {
	var actresses []model.Actress
	if err := as.db.Order("CONVERT(chinese_name USING gbk)").Find(&actresses).Error; err != nil {
		return nil, err
	}
	return actresses, nil
}

func (as *ActressService) GetById(actress_id string) (*model.Actress, error) {
	actressId, err := util.ParseUint(actress_id)
	if err != nil {
		return nil, err
	}
	var m model.Actress
	if err := as.db.First(&m, actressId).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return &m, nil
}

func (as *ActressService) Create(a *model.Actress) (err error) {
	return as.db.Create(a).Error
}

func (as *ActressService) Update(a *model.Actress) error {
	return as.db.Model(&a).Updates(a).Error
}

func (as *ActressService) Delete(a *model.Actress) error {
	return as.db.Select("Videos").Delete(&a).Error
}
