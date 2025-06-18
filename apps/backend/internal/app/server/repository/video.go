package repository

import (
	"encoding/json"
	"errors"
	"media-lib/internal/app/server/model"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type VidoesQueryOptions struct {
	Tags []string `json:"tags"`
	Page int      `json:"page"`
	Size int      `json:"size"`
}

type VideoRepository interface {
	FindAll(VidoesQueryOptions) ([]model.Video, error)
	PaginateAll(VidoesQueryOptions) ([]model.Video, error)
	Count(VidoesQueryOptions) (int64, error)
	FindByID(uint) (*model.Video, error)
	Create(*model.Video) error
	Update(*model.Video) error
	Delete(*model.Video) error
}

type VideoRepositoryImpl struct {
	db *gorm.DB
}

func NewVideoRepositoryImpl(db *gorm.DB) *VideoRepositoryImpl {
	return &VideoRepositoryImpl{db: db}
}

// TODO: 待删除, 用 PaginateAll 代替
func (r *VideoRepositoryImpl) FindAll(options VidoesQueryOptions) ([]model.Video, error) {
	var videos []model.Video
	var err error
	if len(options.Tags) == 0 {
		err = r.db.Preload("Actresses").Order("created_at desc").Find(&videos).Error
	} else {
		jsonTags, _ := json.Marshal(options.Tags)
		err = r.db.Where("tags @> ?", string(jsonTags)).Preload("Actresses").Order("created_at desc").Find(&videos).Error
	}
	if err != nil {
		return nil, err
	}
	return videos, nil
}

func (r *VideoRepositoryImpl) PaginateAll(options VidoesQueryOptions) ([]model.Video, error) {
	var videos []model.Video
	var err error
	if len(options.Tags) == 0 {
		err = r.db.Preload("Actresses").Order("created_at desc").Scopes(paginate(options.Page, options.Size)).Find(&videos).Error
	} else {
		jsonTags, _ := json.Marshal(options.Tags)
		err = r.db.Where("tags @> ?", string(jsonTags)).Preload("Actresses").Order("created_at desc").
			Scopes(paginate(options.Page, options.Size)).Find(&videos).Error
	}
	if err != nil {
		return nil, err
	}
	return videos, nil
}

func (r *VideoRepositoryImpl) Count(options VidoesQueryOptions) (int64, error) {
	var count int64
	var err error
	if len(options.Tags) == 0 {
		err = r.db.Model(&model.Video{}).Count(&count).Error
	} else {
		jsonTags, _ := json.Marshal(options.Tags)
		err = r.db.Model(&model.Video{}).Where("tags @> ?", string(jsonTags)).Count(&count).Error
	}
	if err != nil {
		return 0, err
	}
	return count, nil
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
	if err := r.db.Model(v).Updates(v).Error; err != nil {
		return err
	}
	return r.db.Preload("Actresses").First(&v, v.ID).Error
}

func (r *VideoRepositoryImpl) Delete(v *model.Video) error {
	return r.db.Select(clause.Associations).Unscoped().Delete(v).Error
}
