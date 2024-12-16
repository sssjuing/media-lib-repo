package handler

import (
	"media-lib/internal/app/server/model"
	"media-lib/internal/app/server/util"
	"net/http"

	"github.com/labstack/echo/v4"
)

func (h *Handler) ListActresses(c echo.Context) error {
	actresses, err := h.actressStore.GetList()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, util.NewError(err))
	}
	return c.JSON(http.StatusOK, actresses)
}

func (h *Handler) CreateActress(c echo.Context) error {
	var a model.Actress
	if err := c.Bind(&a); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, util.NewError(err))
	}
	if err := h.actressStore.Create(&a); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, util.NewError(err))
	}
	return c.JSON(http.StatusCreated, a)
}

func (h *Handler) GetActressById(c echo.Context) error {
	a, err := h.actressStore.GetById(c.Param("actress_id"))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, util.NewError(err))
	}
	if a == nil {
		return c.JSON(http.StatusNotFound, util.NotFound())
	}
	return c.JSON(http.StatusOK, a)
}

func (h *Handler) UpdateActress(c echo.Context) error {
	a, err := h.actressStore.GetById(c.Param("actress_id"))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, util.NewError(err))
	}
	if a == nil {
		return c.JSON(http.StatusNotFound, util.NotFound())
	}
	if err := c.Bind(&a); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, util.NewError(err))
	}
	if err := h.actressStore.Update(a); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, util.NewError(err))
	}
	return c.JSON(http.StatusOK, a)
}

func (h *Handler) RemoveActress(c echo.Context) error {
	a, err := h.actressStore.GetById(c.Param("actress_id"))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, util.NewError(err))
	}
	if a == nil {
		return c.JSON(http.StatusNotFound, util.NotFound())
	}
	if err := h.actressStore.Delete(a); err != nil {
		return c.JSON(http.StatusInternalServerError, util.NewError(err))
	}
	return c.NoContent(http.StatusNoContent)
}

func (h *Handler) GetVideosByActressId(c echo.Context) error {
	a, err := h.actressStore.GetById(c.Param("actress_id"))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, util.NewError(err))
	}
	if a == nil {
		return c.JSON(http.StatusNotFound, util.NotFound())
	}
	videos, err := h.videoStore.GetListByActressId(a.ID)
	if err != nil {
		return c.JSON(http.StatusUnprocessableEntity, util.NewError(err))
	}
	return c.JSON(http.StatusOK, videos)
}
