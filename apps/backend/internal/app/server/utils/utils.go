package utils

import (
	"fmt"
	"media-lib/internal/pkg/config"

	"github.com/labstack/gommon/log"
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
