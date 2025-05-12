package repository

import (
	"errors"
	"media-lib/internal/app/server/model"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type ActressRepository interface {
	FindAll() ([]model.Actress, error)
	FindByID(uint) (*model.Actress, error)
	Create(*model.Actress) error
	Update(*model.Actress) error
	Delete(*model.Actress) error
	// FindVideos(uint) ([]model.Video, error)
}

type ActressRepositoryImpl struct {
	db *gorm.DB
}

func NewActressRepository(db *gorm.DB) *ActressRepositoryImpl {
	return &ActressRepositoryImpl{db: db}
}

func (r *ActressRepositoryImpl) FindAll() ([]model.Actress, error) {
	var actresses []model.Actress
	if err := r.db.Order("CONVERT_TO(chinese_name, 'GBK')").Find(&actresses).Error; err != nil {
		return nil, err
	}
	return actresses, nil
}

func (r *ActressRepositoryImpl) FindByID(id uint) (*model.Actress, error) {
	var a model.Actress
	if err := r.db.First(&a, id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return &a, nil
}

func (r *ActressRepositoryImpl) Create(a *model.Actress) error {
	return r.db.Create(a).Error
}

func (r *ActressRepositoryImpl) Update(a *model.Actress) error {
	return r.db.Model(a).Updates(a).Error
}

func (r *ActressRepositoryImpl) Delete(a *model.Actress) error {
	return r.db.Select(clause.Associations).Unscoped().Delete(a).Error
}

// TODO: 返回结果按照 release_date 排序
// func (r *ActressRepositoryImpl) FindVideos(id uint) ([]model.Video, error) {
// 	actress, err := r.FindByID(id)
// 	if err != nil {
// 		return nil, err
// 	}
// 	var videos []model.Video
// 	if err := r.db.Model(actress).Association("Videos").Find(&videos); err != nil {
// 		return nil, err
// 	}
// 	r.db.Preload("Actresses").Find(&videos)
// 	return videos, nil
// }
