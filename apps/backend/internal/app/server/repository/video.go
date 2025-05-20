package repository

import (
	"errors"
	"media-lib/internal/app/server/model"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type VideoRepository interface {
	FindAll() ([]model.Video, error)
	FindByID(uint) (*model.Video, error)
	Create(*model.Video) error
	Update(*model.Video) error
	Delete(*model.Video) error
}

type VideoRepositoryImpl struct {
	db *gorm.DB
}

func NewVideoRepository(db *gorm.DB) *VideoRepositoryImpl {
	return &VideoRepositoryImpl{db: db}
}

func (r *VideoRepositoryImpl) FindAll() ([]model.Video, error) {
	var videos []model.Video
	if err := r.db.Preload("Actresses").Order("created_at desc").Find(&videos).Error; err != nil {
		return nil, err
	}
	return videos, nil
}

// func (r *VideoRepositoryImpl) FindAllByActressId(actressId uint) ([]*model.Video, error) {
// 	var actress model.Actress
// 	if err := r.db.Preload("Videos").Preload("Videos.Actresses").First(&actress, actressId).Error; err != nil {
// 		return nil, err
// 	}
// 	return actress.Videos, nil
// }

func (r *VideoRepositoryImpl) FindByID(id uint) (*model.Video, error) {
	var v model.Video
	if err := r.db.Preload("Actresses").First(&v, id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return &v, nil
}

func (r *VideoRepositoryImpl) Create(v *model.Video) error {
	return r.db.Create(v).Error
}

func (r *VideoRepositoryImpl) Update(v *model.Video) error {
	if err := r.db.Model(v).Association("Actresses").Replace(v.Actresses); err != nil {
		return err
	}
	return r.db.Model(v).Updates(v).Error
}

func (r *VideoRepositoryImpl) Delete(v *model.Video) error {
	return r.db.Select(clause.Associations).Unscoped().Delete(v).Error
}
