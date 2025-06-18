package model

import (
	"encoding/json"
	"media-lib/internal/app/server/types"
	"time"

	"gorm.io/datatypes"
	"gorm.io/gorm"
)

type Actress struct {
	ID        uint           `json:"id"`
	CreatedAt *time.Time     `json:"created_at"`
	UpdatedAt *time.Time     `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`

	UniqueName   string          `gorm:"type:varchar(128);uniqueIndex;not null" json:"unique_name"`
	ChineseName  string          `gorm:"type:varchar(128);uniqueIndex;not null" json:"chinese_name"`
	EnglishName  *string         `gorm:"type:varchar(128)" json:"english_name"`
	OtherNames   *datatypes.JSON `json:"other_names"`
	BirthDate    *time.Time      `json:"birth_date"`
	BirthPlace   *string         `gorm:"size:255" json:"birth_place"`
	Height       *int            `json:"height"`
	Weight       *int            `json:"weight"`
	Measurements *datatypes.JSON `json:"measurements"`
	Cup          *string         `gorm:"size:2" json:"cup"`
	BloodGroup   *string         `gorm:"size:2" json:"blood_group"`
	DebutDate    *time.Time      `json:"debut_date"`
	Hobbies      *string         `gorm:"size:255" json:"hobbies"`
	Notes        *string         `json:"notes"`
	Videos       []*Video        `gorm:"many2many:actress_video" json:"videos"`
}

func (a *Actress) DTO() *types.ActressDTO {
	if a == nil {
		return nil
	}
	return &types.ActressDTO{
		ID:           a.ID,
		UniqueName:   a.UniqueName,
		ChineseName:  a.ChineseName,
		EnglishName:  a.EnglishName,
		OtherNames:   (*json.RawMessage)(a.OtherNames),
		BirthDate:    a.BirthDate,
		BirthPlace:   a.BirthPlace,
		Height:       a.Height,
		Weight:       a.Weight,
		Measurements: (*json.RawMessage)(a.Measurements),
		Cup:          a.Cup,
		BloodGroup:   a.BloodGroup,
		DebutDate:    a.DebutDate,
		Hobbies:      a.Hobbies,
		Notes:        a.Notes,
		CreatedAt:    a.CreatedAt,
		UpdatedAt:    a.UpdatedAt,
	}
}
