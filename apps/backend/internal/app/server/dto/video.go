package dto

import (
	"encoding/json"
	"time"
)

type VideoDTO struct {
	ID           uint             `json:"id"`
	SerialNumber string           `json:"serial_number"`
	CoverUrl     string           `json:"cover_url"`
	Title        *string          `json:"title"`
	ChineseTitle *string          `json:"chinese_title"`
	Actresses    []*ActressDTO    `json:"actresses"`
	ReleaseDate  *time.Time       `json:"release_date"` // 发行日期
	VideoUrl     *string          `json:"video_url"`
	Mosaic       *bool            `json:"mosaic"`
	Tags         *json.RawMessage `json:"tags"`
	Synopsis     *string          `json:"synopsis"` // 概要
	CreatedAt    *time.Time       `json:"created_at"`
	UpdatedAt    *time.Time       `json:"updated_at"`
}

type CreateVideoDTO struct {
	SerialNumber string           `json:"serial_number" validate:"required"`
	CoverPath    string           `json:"cover_path" validate:"required"` // 封面在对象存储中桶内的路径
	Title        *string          `json:"title"`
	ChineseTitle *string          `json:"chinese_title"`
	Actresses    []*ActressDTO    `json:"actresses"`
	ReleaseDate  *time.Time       `json:"release_date"` // 发行日期
	VideoPath    *string          `json:"video_path"`   // 视频在对象存储中桶内的路径
	Mosaic       *bool            `json:"mosaic"`
	Tags         *json.RawMessage `json:"tags"`
	Synopsis     *string          `json:"synopsis"` // 概要
}

type UpdateVideoDTO struct {
	CreateVideoDTO
}
