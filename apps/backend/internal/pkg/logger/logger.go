package logger

import (
	"github.com/sirupsen/logrus"
	"github.com/sssjuing/media-lib-repo/apps/backend/internal/pkg/config"
)

var logger *logrus.Logger

func getLogLevel() logrus.Level {
	cfg := config.GetConfig()
	level := cfg.GetString("server.log_level")
	logger.Info("log level is ", level)
	switch level {
	case "debug":
		return logrus.DebugLevel
	case "info":
		return logrus.InfoLevel
	case "warn":
		return logrus.WarnLevel
	case "error":
		return logrus.ErrorLevel
	default:
		return logrus.InfoLevel
	}
}

func init() {
	logger = logrus.New()
	logger.SetFormatter(&logrus.TextFormatter{FullTimestamp: true})
	// logger.SetReportCaller(true) // 显示调用者信息
	logger.SetLevel(getLogLevel())
}

func GetLogger() *logrus.Logger {
	return logger
}
