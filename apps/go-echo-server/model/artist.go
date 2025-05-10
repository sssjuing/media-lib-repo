package model

import "time"

type Artist struct {
	ID          uint      `json:"id"`
	Name        string    `gorm:"type:varchar(128);not null" json:"name"`
	ChineseName string    `gorm:"type:varchar(128)" json:"chinese_name"`
	Albums      []*Album  `json:"albums"`
	Songs       []*Song   `gorm:"many2many:artist_song" json:"artists" json:"songs"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}
