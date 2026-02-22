package model

import (
	"time"

	"gorm.io/gorm"
)

type VideoTag struct {
	ID        uint           `json:"id"`
	CreatedAt *time.Time     `json:"created_at"`
	UpdatedAt *time.Time     `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
	Name      string         `gorm:"type:varchar(128);uniqueIndex;not null" json:"name" validate:"required"`
	Rank      float64        `gorm:"type:float;default:0;not null" json:"rank"`
}
