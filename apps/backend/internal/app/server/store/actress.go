package store

import (
	"errors"
	"media-lib/internal/app/server/model"
	"media-lib/pkg/util"

	"gorm.io/gorm"
)

type ActressStore struct {
	db *gorm.DB
}

func NewActressStore(db *gorm.DB) *ActressStore {
	return &ActressStore{
		db: db,
	}
}

func (as *ActressStore) GetList() ([]*model.Actress, error) {
	var actresses []*model.Actress
	if err := as.db.Order("CONVERT(chinese_name USING gbk)").Find(&actresses).Error; err != nil {
		return nil, err
	}
	return actresses, nil
}

func (as *ActressStore) GetById(actress_id string) (*model.Actress, error) {
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

func (as *ActressStore) Create(a *model.Actress) (err error) {
	return as.db.Create(a).Error
}

func (as *ActressStore) Update(a *model.Actress) error {
	return as.db.Model(&a).Updates(a).Error
}

func (as *ActressStore) Delete(a *model.Actress) error {
	return as.db.Select("Videos").Delete(&a).Error
}
