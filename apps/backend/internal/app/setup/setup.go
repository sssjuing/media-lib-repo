package setup

import (
	"github.com/sssjuing/media-lib-repo/apps/backend/internal/app/server/db"
	"github.com/sssjuing/media-lib-repo/apps/backend/internal/pkg/config"
	"github.com/sssjuing/media-lib-repo/apps/backend/internal/pkg/logger"
)

func Run() {
	logger := logger.GetLogger()
	dsn := config.GetPostgresDsn()
	d := db.NewDB(dsn, config.GetPostgresReplicas())
	db.AutoMigrate(d)
	logger.Info("setup successfully")
}
