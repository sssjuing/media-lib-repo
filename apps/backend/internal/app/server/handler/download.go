package handler

import (
	"fmt"
	"media-lib/internal/app/server/download"
	"media-lib/internal/app/server/utils"
	"media-lib/internal/pkg/config"
	"media-lib/internal/pkg/downloader"
	commonUtils "media-lib/internal/pkg/utils"
	"net/http"
	"path/filepath"

	"github.com/labstack/echo/v4"
	"github.com/samber/lo"
)

func (h *Handler) ListResources(c echo.Context) error {
	cache := download.GetCache()
	resources := cache.FindAll()
	list := lo.Map(resources, func(r *downloader.Resource, _ int) downloader.ResourceDTO {
		return r.DTO()
	})
	return c.JSON(http.StatusOK, list)
}

func (h *Handler) ListSegments(c echo.Context) error {
	resourceId := c.Param("resource_id")
	cache := download.GetCache()
	resource := cache.FindByID(resourceId)
	if resource == nil {
		return c.JSON(http.StatusNotFound, utils.NotFound())
	}
	return c.JSON(http.StatusOK, resource.SegmentList)
}

func (h *Handler) DownloadResource(c echo.Context) error {
	resourceId := c.Param("resource_id")
	cache := download.GetCache()
	resource := cache.FindByID(resourceId)
	if resource == nil {
		return c.JSON(http.StatusNotFound, utils.NotFound())
	}
	if err := download.RetryTask(resource, c.Logger()); err != nil {
		return c.JSON(http.StatusServiceUnavailable, utils.NewError(err))
	}
	return c.NoContent(http.StatusAccepted)
}

type submitDownloadRequest struct {
	Url  string `json:"url" validate:"required"`
	Name string `json:"name" validate:"required"`
}

func (h *Handler) SubmitDownload(c echo.Context) error {
	req := &submitDownloadRequest{}
	if code, err := validateRequest(c, req); err != nil {
		return c.JSON(code, utils.NewError(err))
	}
	cache := download.GetCache()
	if r := cache.FindByName(req.Name); r != nil {
		return c.JSON(http.StatusConflict, utils.NewError(fmt.Errorf("resource name already exist")))
	}
	if err := download.AddTask(req.Url, req.Name, c.Logger()); err != nil {
		return c.JSON(http.StatusServiceUnavailable, utils.NewError(err))
	}
	return c.NoContent(http.StatusAccepted)
}

func (h *Handler) ListDownloadedFiles(c echo.Context) error {
	workPath := config.GetConfig().GetString("server.work_path")
	files, err := commonUtils.ListFilesInDir(filepath.Join(workPath, "downloads"))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.NewError(err))
	}
	return c.JSON(http.StatusOK, files)
}
