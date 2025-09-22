package handler

import (
	"fmt"
	"net/http"
	"path/filepath"

	"github.com/labstack/echo/v4"
	"github.com/samber/lo"
	"github.com/sssjuing/media-lib-repo/apps/backend/internal/app/server/download"
	"github.com/sssjuing/media-lib-repo/apps/backend/internal/app/server/utils"
	"github.com/sssjuing/media-lib-repo/apps/backend/internal/pkg/config"
	"github.com/sssjuing/media-lib-repo/apps/backend/internal/pkg/downloader"
	commonUtils "github.com/sssjuing/media-lib-repo/apps/backend/internal/pkg/utils"
)

func (h *Handler) ListResources(c echo.Context) error {
	store := download.GetStore()
	resources := store.FindAll()
	list := lo.Map(resources, func(r *downloader.Resource, _ int) downloader.ResourceDTO {
		return r.DTO()
	})
	return c.JSON(http.StatusOK, list)
}

func (h *Handler) ListSegments(c echo.Context) error {
	resourceId := c.Param("resource_id")
	store := download.GetStore()
	resource := store.FindByID(resourceId)
	if resource == nil {
		return c.JSON(http.StatusNotFound, utils.NotFound())
	}
	return c.JSON(http.StatusOK, resource.SegmentList)
}

func (h *Handler) DownloadResource(c echo.Context) error {
	resourceId := c.Param("resource_id")
	store := download.GetStore()
	resource := store.FindByID(resourceId)
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
	store := download.GetStore()
	if r := store.FindByName(req.Name); r != nil {
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
