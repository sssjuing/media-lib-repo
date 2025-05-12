package setup

import (
	"log"
	"media-lib/internal/app/server/db"
	"media-lib/internal/pkg/config"
)

func Run() {
	dsn := config.GetPostgresDsn()
	d := db.NewDB(dsn)
	db.AutoMigrate(d)
	log.Default().Println("setup successfully")
}
