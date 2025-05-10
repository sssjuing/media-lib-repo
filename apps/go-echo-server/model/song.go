package model

import "time"

type Song struct {
	ID        uint      `json:"id"`
	Name      string    `gorm:"type:varchar(128);not null" json:"name"`
	AlbumID   uint      `json:"album_id"`
	Album     *Album    `json:"album"`
	Artists   []*Artist `gorm:"many2many:artist_song" json:"artists"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
