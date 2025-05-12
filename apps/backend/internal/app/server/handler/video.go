package handler

import (
	"media-lib/internal/app/server/dto"
	"media-lib/internal/app/server/model"
	"media-lib/internal/app/server/utils"
	"net/http"

	"github.com/labstack/echo/v4"
)

func (h *Handler) ListVideos(c echo.Context) error {
	list, err := h.videoSvc.GetList()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.NewError(err))
	}
	return c.JSON(http.StatusOK, list)
}

func (h *Handler) CreateVideo(c echo.Context) error {
	var cvd dto.CreateVideoDTO
	if code, err := validateRequest(c, &cvd); err != nil {
		return c.JSON(code, utils.NewError(err))
	}
	vd, err := h.videoSvc.Create(&cvd)
	if err != nil {
		return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}
	return c.JSON(http.StatusCreated, vd)
}

func (h *Handler) GetVideoById(c echo.Context) error {
	v := c.Get("video").(*model.Video)
	return c.JSON(http.StatusOK, v.DTO())
}

func (h *Handler) UpdateVideo(c echo.Context) error {
	v := c.Get("video").(*model.Video)
	var uvd dto.UpdateVideoDTO
	if code, err := validateRequest(c, &uvd); err != nil {
		return c.JSON(code, utils.NewError(err))
	}
	vd, err := h.videoSvc.Update(v, &uvd)
	if err != nil {
		return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}
	return c.JSON(http.StatusOK, vd)
}

func (h *Handler) RemoveVideo(c echo.Context) error {
	v := c.Get("video").(*model.Video)
	if err := h.videoRepo.Delete(v); err != nil {
		return c.JSON(http.StatusInternalServerError, utils.NewError(err))
	}
	return c.NoContent(http.StatusNoContent)
}
