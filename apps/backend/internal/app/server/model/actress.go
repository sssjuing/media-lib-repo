package model

import (
	"time"

	"gorm.io/datatypes"
)

type Actress struct {
	ID           uint            `json:"id"`
	UniqueName   string          `gorm:"type:varchar(128);uniqueIndex;not null" json:"unique_name"`
	ChineseName  string          `gorm:"type:varchar(128);uniqueIndex;not null" json:"chinese_name"`
	EnglishName  *string         `gorm:"type:varchar(128)" json:"english_name"`
	Names        *datatypes.JSON `gorm:"size:1024" json:"names"`
	BirthDate    *time.Time      `json:"birth_date"`
	BirthPlace   *string         `gorm:"size:255" json:"birth_place"`
	Height       *float32        `json:"height"`
	Weight       *float32        `json:"weight"`
	Measurements *datatypes.JSON `json:"measurements"`
	Cup          *string         `gorm:"size:2" json:"cup"`
	BloodGroup   *string         `gorm:"size:2" json:"blood_group"`
	DebutDate    *time.Time      `json:"debut_date"`
	Hobbies      *string         `gorm:"size:255" json:"hobbies"`
	Notes        *string         `json:"notes"`
	Videos       []*Video        `gorm:"many2many:actress_video" json:"videos"`
	CreatedAt    *time.Time      `json:"created_at"`
	UpdatedAt    *time.Time      `json:"updated_at"`
	DeletedAt    *time.Time      `json:"-"`
}
