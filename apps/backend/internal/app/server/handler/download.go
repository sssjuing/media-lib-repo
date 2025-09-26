package handler

import (
	"fmt"
	"net/http"
	"path/filepath"

	"github.com/labstack/echo/v4"
	"github.com/samber/lo"
	"github.com/sssjuing/media-lib-repo/apps/backend/internal/app/server/download"
	"github.com/sssjuing/media-lib-repo/apps/backend/internal/app/server/types"
	"github.com/sssjuing/media-lib-repo/apps/backend/internal/app/server/utils"
	"github.com/sssjuing/media-lib-repo/apps/backend/internal/pkg/config"
	"github.com/sssjuing/media-lib-repo/apps/backend/internal/pkg/downloader"
	commonUtils "github.com/sssjuing/media-lib-repo/apps/backend/internal/pkg/utils"
)

func (h *Handler) ListResources(c echo.Context) error {
	store := download.GetStore()
	resources := store.FindAll()
	hashSet := download.GetHashSet()
	list := lo.Map(resources, func(r *downloader.Resource, _ int) types.ResourceDTO {
		status := "unfinished"
		if r.Downloading {
			status = "downloading"
		} else if r.Success {
			status = "success"
		} else if hashSet.Contains(r.ID) {
			status = "waiting"
		}
		return types.ResourceDTO{
			ID:        r.ID,
			URL:       r.M3u8URL,
			Name:      r.Filename,
			Status:    status,
			CreatedAt: r.CreatedAt,
		}
	})
	return c.JSON(http.StatusOK, list)
}

// DeleteResource 删除不在下载任务队列中的资源
func (h *Handler) DeleteResource(c echo.Context) error {
	resourceId := c.Param("resource_id")
	store := download.GetStore()
	resource := store.FindByID(resourceId)
	if resource == nil {
		return c.JSON(http.StatusNotFound, utils.NotFound())
	}
	if resource.Downloading {
		return c.JSON(http.StatusConflict, utils.NewError(fmt.Errorf("can not delete downloading resource")))
	}
	if err := store.Delete(resourceId); err != nil {
		c.JSON(http.StatusInternalServerError, utils.NewError(err))
	}
	return c.NoContent(http.StatusNoContent)
}

// ListSegments 轮询实时查看下载进度
func (h *Handler) ListSegments(c echo.Context) error {
	resourceId := c.Param("resource_id")
	store := download.GetStore()
	resource := store.FindByID(resourceId)
	if resource == nil {
		return c.JSON(http.StatusNotFound, utils.NotFound())
	}
	return c.JSON(http.StatusOK, resource.SegmentList)
}

// DownloadResource 将资源重新加入到下载队列
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

// SubmitDownload 创建下载任务并下载
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

// ListDownloadedFiles 列出全部下载好的文件路径
func (h *Handler) ListDownloadedFiles(c echo.Context) error {
	workPath := config.GetConfig().GetString("server.work_path")
	files, err := commonUtils.ListFilesInDir(filepath.Join(workPath, "downloads"))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.NewError(err))
	}
	return c.JSON(http.StatusOK, files)
}
