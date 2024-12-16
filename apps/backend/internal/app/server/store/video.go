package store

import (
	"errors"
	"media-lib/internal/app/server/model"
	"media-lib/pkg/util"

	"gorm.io/gorm"
)

type VideoStore struct {
	db *gorm.DB
}

func NewVedioStore(db *gorm.DB) *VideoStore {
	return &VideoStore{
		db: db,
	}
}

func (vs *VideoStore) GetList() ([]model.Video, error) {
	var videos []model.Video
	if err := vs.db.Preload("Actresses").Order("created_at desc").Find(&videos).Error; err != nil {
		return nil, err
	}
	return videos, nil
}

// TODO: 返回结果按照 release_date 排序
func (vs *VideoStore) GetListByActressId(actressId uint) ([]*model.Video, error) {
	var actress model.Actress
	if err := vs.db.Preload("Videos").Preload("Videos.Actresses").First(&actress, actressId).Error; err != nil {
		return nil, err
	}
	return actress.Videos, nil
}

func (vs *VideoStore) GetById(video_id string) (*model.Video, error) {
	videoId, err := util.ParseUint(video_id)
	if err != nil {
		return nil, err
	}
	var m model.Video
	if err := vs.db.Preload("Actresses").First(&m, videoId).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return &m, nil
}

func (vs *VideoStore) Create(v *model.Video) (err error) {
	return vs.db.Create(v).Error
}

func (vs *VideoStore) Update(v *model.Video) error {
	if err := vs.db.Model(&v).Association("Actresses").Replace(v.Actresses); err != nil {
		return err
	}
	return vs.db.Model(&v).Updates(v).Error
}

func (vs *VideoStore) Delete(v *model.Video) error {
	return vs.db.Select("Actresses").Delete(&v).Error
}
