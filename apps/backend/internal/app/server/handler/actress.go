package handler

import (
	"media-lib/internal/app/server/model"
	"media-lib/internal/app/server/types"
	"media-lib/internal/app/server/utils"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/samber/lo"
)

func (h *Handler) ListActresses(c echo.Context) error {
	list, err := h.actressSvc.GetList()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.NewError(err))
	}
	return c.JSON(http.StatusOK, list)
}

func (h *Handler) CreateActress(c echo.Context) error {
	var a model.Actress
	if err := c.Bind(&a); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}
	if err := h.actressRepo.Create(&a); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}
	return c.JSON(http.StatusCreated, a)
}

func (h *Handler) GetActressById(c echo.Context) error {
	a := c.Get("actress").(*model.Actress)
	return c.JSON(http.StatusOK, a)
}

func (h *Handler) UpdateActress(c echo.Context) error {
	a := c.Get("actress").(*model.Actress)
	if err := c.Bind(&a); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}
	if err := h.actressRepo.Update(a); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}
	return c.JSON(http.StatusOK, a)
}

func (h *Handler) RemoveActress(c echo.Context) error {
	a := c.Get("actress").(*model.Actress)
	if err := h.actressRepo.Delete(a); err != nil {
		return c.JSON(http.StatusInternalServerError, utils.NewError(err))
	}
	return c.NoContent(http.StatusNoContent)
}

func (h *Handler) GetVideosByActressId(c echo.Context) error {
	a := c.Get("actress").(*model.Actress)
	videos, err := h.actressRepo.FindVideos(a.ID)
	if err != nil {
		return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}
	list := lo.Map(videos, func(v *model.Video, _ int) types.VideoDTO {
		return *v.DTO()
	})
	return c.JSON(http.StatusOK, list)
}
