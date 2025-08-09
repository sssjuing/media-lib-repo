package handler

import (
	"media-lib/internal/app/server/download"
	"media-lib/internal/app/server/utils"
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
	if err := download.AddResource(req.Url, req.Name, c.Logger()); err != nil {
		return c.JSON(http.StatusServiceUnavailable, utils.NewError(err))
	}
	return c.NoContent(http.StatusAccepted)
}
