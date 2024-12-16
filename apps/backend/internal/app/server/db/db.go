package db

import (
	"media-lib/internal/app/server/model"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func New(dsn string) *gorm.DB {
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}
	return db
}

func AutoMigrate(db *gorm.DB) {
	db.AutoMigrate(
		&model.Actress{},
		&model.Video{},
	)
}
