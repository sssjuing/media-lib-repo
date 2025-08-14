package handler

import (
	"media-lib/internal/app/server/download"
	"media-lib/internal/app/server/utils"
	commonUtils "media-lib/internal/pkg/utils"
	"net/http"

	"github.com/labstack/echo/v4"
)

type submitDownloadRequest struct {
	Url  string `json:"url" validate:"required"`
	Name string `json:"name" validate:"required"`
}

func (h *Handler) SubmitDownload(c echo.Context) error {
	req := &submitDownloadRequest{}
	if code, err := validateRequest(c, req); err != nil {
		return c.JSON(code, utils.NewError(err))
	}
	if err := download.AddTask(req.Url, req.Name, c.Logger()); err != nil {
		return c.JSON(http.StatusServiceUnavailable, utils.NewError(err))
	}
	return c.NoContent(http.StatusAccepted)
}

func (h *Handler) ListDownloadedFiles(c echo.Context) error {
	files, err := commonUtils.ListFilesInDir("/data")
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.NewError(err))
	}
	return c.JSON(http.StatusOK, files)
}
