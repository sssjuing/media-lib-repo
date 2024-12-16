package model

import (
	"time"

	"gorm.io/datatypes"
)

type Video struct {
	ID           uint            `json:"id"`
	SerialNumber string          `gorm:"type:varchar(128);uniqueIndex;not null" json:"serial_number"`
	CoverPath    string          `gorm:"size:1024;not null" json:"cover_path"` // 封面在对象存储中桶内的路径
	Title        *string         `gorm:"size:512" json:"title"`
	ChineseTitle *string         `gorm:"size:512" json:"chinese_title"`
	Actresses    []*Actress      `gorm:"many2many:actress_video" json:"actresses"`
	ReleaseDate  *time.Time      `json:"release_date"`                 // 发行日期
	BucketPath   *string         `gorm:"size:1024" json:"bucket_path"` // 视频在对象存储中桶内的路径
	Mosaic       bool            `json:"mosaic"`
	Tags         *datatypes.JSON `json:"tags"`
	Synopsis     *string         `json:"synopsis"` // 概要
	CreatedAt    time.Time       `json:"created_at"`
	UpdatedAt    time.Time       `json:"updated_at"`
	DeletedAt    time.Time       `json:"-"`
}
