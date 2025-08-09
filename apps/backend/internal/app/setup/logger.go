package setup

import (
	"media-lib/internal/pkg/config"

	"github.com/sirupsen/logrus"
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

func Logger() *logrus.Logger {
	return logger
}
