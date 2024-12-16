package handler

import (
	"errors"
	"media-lib/internal/app/server/model"
	"media-lib/internal/app/server/util"
	"net/http"

	"github.com/labstack/echo/v4"
)

func (h *Handler) ListVideos(c echo.Context) error {
	videos, err := h.videoStore.GetList()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, util.NewError(err))
	}
	return c.JSON(http.StatusOK, videos)
}

func (h *Handler) CreateVideo(c echo.Context) error {
	var v model.Video
	if err := c.Bind(&v); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, util.NewError(err))
	}
	if v.SerialNumber == "" {
		return c.JSON(http.StatusBadRequest, util.NewError(errors.New("番号不能为空")))
	}
	if v.CoverPath == "" {
		return c.JSON(http.StatusBadRequest, util.NewError(errors.New("封面不能为空")))
	}
	if err := h.videoStore.Create(&v); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, util.NewError(err))
	}
	return c.JSON(http.StatusCreated, v)
}

func (h *Handler) GetVideoById(c echo.Context) error {
	v, err := h.videoStore.GetById(c.Param("video_id"))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, util.NewError(err))
	}
	if v == nil {
		return c.JSON(http.StatusNotFound, util.NotFound())
	}
	return c.JSON(http.StatusOK, v)
}

func (h *Handler) UpdateVideo(c echo.Context) error {
	v, err := h.videoStore.GetById(c.Param("video_id"))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, util.NewError(err))
	}
	if v == nil {
		return c.JSON(http.StatusNotFound, util.NotFound())
	}
	if err := c.Bind(&v); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, util.NewError(err))
	}
	if err := h.videoStore.Update(v); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, util.NewError(err))
	}
	return c.JSON(http.StatusOK, v)
}

func (h *Handler) RemoveVideo(c echo.Context) error {
	v, err := h.videoStore.GetById(c.Param("video_id"))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, util.NewError(err))
	}
	if v == nil {
		return c.JSON(http.StatusNotFound, util.NotFound())
	}
	if err := h.videoStore.Delete(v); err != nil {
		return c.JSON(http.StatusInternalServerError, util.NewError(err))
	}
	return c.NoContent(http.StatusNoContent)
}
