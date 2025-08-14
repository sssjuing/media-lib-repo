package setup

import (
	"media-lib/internal/app/server/db"
	"media-lib/internal/pkg/config"
	"media-lib/internal/pkg/logger"
)

func Run() {
	logger := logger.GetLogger()
	dsn := config.GetPostgresDsn()
	d := db.NewDB(dsn)
	db.AutoMigrate(d)
	logger.Info("setup successfully")
}
