package utils

import (
	"fmt"

	"github.com/labstack/gommon/log"
	"github.com/sssjuing/media-lib-repo/apps/backend/internal/pkg/config"
)

func GetLogLevel() log.Lvl {
	cfg := config.GetConfig()
	level := cfg.GetString("server.log_level")
	fmt.Println("log level is", level)

	switch level {
	case "debug":
		return log.DEBUG
	case "info":
		return log.INFO
	case "warn":
		return log.WARN
	case "error":
		return log.ERROR
	default:
		return log.INFO
	}
}
