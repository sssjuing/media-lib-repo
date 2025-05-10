package service

import (
	"errors"
	"go-echo-server/model"
	"go-echo-server/util"

	"gorm.io/gorm"
)

type VideoService struct {
	db *gorm.DB
}

func NewVedioStore(db *gorm.DB) *VideoService {
	return &VideoService{
		db: db,
	}
}

func (vs *VideoService) GetList() ([]model.Video, error) {
	var videos []model.Video
	if err := vs.db.Preload("Actresses").Order("created_at desc").Find(&videos).Error; err != nil {
		return nil, err
	}
	return videos, nil
}

// TODO 返回结果按照 release_date 排序
func (vs *VideoService) GetListByActressId(actressId uint) ([]*model.Video, error) {
	var actress model.Actress
	if err := vs.db.Preload("Videos").Preload("Videos.Actresses").First(&actress, actressId).Error; err != nil {
		return nil, err
	}
	return actress.Videos, nil
}

func (vs *VideoService) GetById(video_id string) (*model.Video, error) {
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

func (vs *VideoService) Create(v *model.Video) (err error) {
	return vs.db.Create(v).Error
}

func (vs *VideoService) Update(v *model.Video) error {
	if err := vs.db.Model(&v).Association("Actresses").Replace(v.Actresses); err != nil {
		return err
	}
	return vs.db.Model(&v).Updates(v).Error
}

func (vs *VideoService) Delete(v *model.Video) error {
	return vs.db.Select("Actresses").Delete(&v).Error
}
