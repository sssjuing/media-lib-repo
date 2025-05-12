package model

import (
	"encoding/json"
	"media-lib/internal/app/server/dto"
	"media-lib/internal/pkg/config"
	"media-lib/internal/pkg/utils"
	"time"

	"gorm.io/datatypes"
	"gorm.io/gorm"
)

type Video struct {
	ID           uint
	CreatedAt    *time.Time
	UpdatedAt    *time.Time
	DeletedAt    gorm.DeletedAt  `gorm:"index"`
	SerialNumber string          `gorm:"type:varchar(128);uniqueIndex;not null"`
	CoverPath    string          `gorm:"size:1024;not null" ` // 封面在对象存储中桶内的路径
	Title        *string         `gorm:"size:512"`
	ChineseTitle *string         `gorm:"size:512"`
	Actresses    []*Actress      `gorm:"many2many:actress_video"`
	ReleaseDate  *time.Time      `json:"release_date"` // 发行日期
	VideoPath    *string         `gorm:"size:1024"`    // 视频在对象存储中桶内的路径
	Mosaic       *bool           `json:"mosaic"`
	Tags         *datatypes.JSON `json:"tags"`
	Synopsis     *string         `json:"synopsis"` // 概要
}

var publicUrl string

func init() {
	publicUrl = config.GetMinioPublicUrl()
}

func (v *Video) DTO() *dto.VideoDTO {
	if v == nil {
		return nil
	}
	var videoUrl *string
	if v.VideoPath != nil && *v.VideoPath != "" {
		videoUrl = new(string)
		*videoUrl = publicUrl + *v.VideoPath
	}
	return &dto.VideoDTO{
		ID:           v.ID,
		SerialNumber: v.SerialNumber,
		CoverUrl:     publicUrl + v.CoverPath,
		Title:        v.Title,
		ChineseTitle: v.ChineseTitle,
		Actresses: utils.Map(v.Actresses, func(a *Actress) *dto.ActressDTO {
			return a.DTO()
		}),
		ReleaseDate: v.ReleaseDate,
		VideoUrl:    videoUrl,
		Mosaic:      v.Mosaic,
		Tags:        (*json.RawMessage)(v.Tags),
		Synopsis:    v.Synopsis,
		CreatedAt:   v.CreatedAt,
		UpdatedAt:   v.UpdatedAt,
	}
}
