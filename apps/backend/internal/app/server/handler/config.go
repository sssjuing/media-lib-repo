package handler

import (
	"media-lib/internal/app/server/utils"
	"media-lib/internal/pkg/config"
	commonUtils "media-lib/internal/pkg/utils"
	"net/http"

	"github.com/labstack/echo/v4"
	"gopkg.in/yaml.v3"
)

func (h *Handler) GetVideoTags(c echo.Context) error {
	filePath := config.GetConfig().ConfigFileUsed()
	bytes, err := commonUtils.ReadFile(filePath)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.NewError(err))
	}

	type Config struct {
		Server struct {
			VideoTags []string `yaml:"video_tags"`
		} `yaml:"server"`
	}
	var cfg Config
	if err := yaml.Unmarshal(bytes, &cfg); err != nil {
		return c.JSON(http.StatusInternalServerError, utils.NewError(err))
	}
	return c.JSON(http.StatusOK, cfg.Server.VideoTags)
}
