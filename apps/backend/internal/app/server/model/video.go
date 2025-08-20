package model

import (
	"encoding/json"
	"time"

	"github.com/samber/lo"
	"github.com/sssjuing/media-lib-repo/apps/backend/internal/app/server/types"
	"github.com/sssjuing/media-lib-repo/apps/backend/internal/pkg/config"
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

func (v *Video) DTO() *types.VideoDTO {
	if v == nil {
		return nil
	}
	var videoUrl *string
	if v.VideoPath != nil && *v.VideoPath != "" {
		videoUrl = new(string)
		*videoUrl = publicUrl + *v.VideoPath
	}
	return &types.VideoDTO{
		ID:           v.ID,
		SerialNumber: v.SerialNumber,
		CoverUrl:     publicUrl + v.CoverPath,
		Title:        v.Title,
		ChineseTitle: v.ChineseTitle,
		Actresses: lo.Map(v.Actresses, func(a *Actress, _ int) *types.ActressDTO {
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
