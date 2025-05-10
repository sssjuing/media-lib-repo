package model

import "time"

type Album struct {
	ID          uint       `json:"id"`
	Name        string     `gorm:"type:varchar(128);not null" json:"name"`
	CoverPath   string     `gorm:"size:1024" json:"cover_path"` // 封面在对象存储中桶内的路径
	ArtistID    uint       `json:"artist_id"`
	Artist      *Artist    `json:"artists"`
	ReleaseDate *time.Time `json:"release_date"`
	Songs       []*Song    `json:"songs"`
	CreatedAt   time.Time  `json:"created_at"`
	UpdatedAt   time.Time  `json:"updated_at"`
}
