package database

import (
	"go-echo-server/model"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func New() *gorm.DB {
	dsn := "mysqladmin:mysqlpassword@tcp(192.168.7.21:3306)/testdb?charset=utf8&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}
	return db
}

func AutoMigrate(db *gorm.DB) {
	db.AutoMigrate(
		// &model.User{},
		&model.Actress{},
		&model.Video{},
		// &model.Artist{},
		// &model.Album{},
		// &model.Song{},
	)
}
