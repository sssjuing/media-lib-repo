package setup

import (
	"media-lib/internal/app/server/db"
	"media-lib/internal/pkg/config"
)

func Run() {
	logger := Logger()
	dsn := config.GetPostgresDsn()
	d := db.NewDB(dsn)
	db.AutoMigrate(d)
	logger.Info("setup successfully")
}
