package repository

import (
	"errors"

	"github.com/sssjuing/media-lib-repo/apps/backend/internal/app/server/model"
	"gorm.io/gorm"
)

type VideoTagRepository interface {
	FindAll() ([]model.VideoTag, error)
	FindByID(uint) (*model.VideoTag, error)
	Create(*model.VideoTag) error
	Update(*model.VideoTag) error
	Delete(*model.VideoTag) error
}

type VideoTagRepositoryImpl struct {
	db *gorm.DB
}

func NewVideoTagRepositoryImpl(db *gorm.DB) *VideoTagRepositoryImpl {
	return &VideoTagRepositoryImpl{db: db}
}

func (r *VideoTagRepositoryImpl) FindAll() ([]model.VideoTag, error) {
	var videoTags []model.VideoTag

	if err := r.db.Order("rank").Find(&videoTags).Error; err != nil {
		return nil, err
	}
	return videoTags, nil
}

func (r *VideoTagRepositoryImpl) FindByID(id uint) (*model.VideoTag, error) {
	var tag model.VideoTag
	if err := r.db.First(&tag, id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return &tag, nil
}

func (r *VideoTagRepositoryImpl) Create(tag *model.VideoTag) error {
	return r.db.Create(tag).Error
}

func (r *VideoTagRepositoryImpl) Update(tag *model.VideoTag) error {
	return r.db.Model(tag).Updates(tag).Error
}

func (r *VideoTagRepositoryImpl) Delete(tag *model.VideoTag) error {
	return r.db.Unscoped().Delete(tag).Error
}
