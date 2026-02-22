package handler

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/sssjuing/media-lib-repo/apps/backend/internal/app/server/model"
	"github.com/sssjuing/media-lib-repo/apps/backend/internal/app/server/utils"
	commonUtils "github.com/sssjuing/media-lib-repo/apps/backend/internal/pkg/utils"
)

func (h *Handler) ListVideoTags(c echo.Context) error {
	tags, err := h.videoTagRepo.FindAll()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.NewError(err))
	}
	return c.JSON(http.StatusOK, tags)
}

func (h *Handler) CreateVideoTag(c echo.Context) error {
	var tag model.VideoTag
	if code, err := validateRequest(c, &tag); err != nil {
		return c.JSON(code, utils.NewError(err))
	}
	if err := h.videoTagRepo.Create(&tag); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}
	return c.JSON(http.StatusCreated, tag)
}

func (h *Handler) UpdateVideoTag(c echo.Context) error {
	tagID, err := commonUtils.ParseUint(c.Param("tag_id"))
	if err != nil {
		return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}
	tag, err := h.videoTagRepo.FindByID(tagID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.NewError(err))
	}
	if tag == nil {
		return c.JSON(http.StatusNotFound, utils.NotFound())
	}
	if code, err := validateRequest(c, tag); err != nil {
		return c.JSON(code, utils.NewError(err))
	}
	if err := h.videoTagRepo.Update(tag); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}
	return c.JSON(http.StatusOK, tag)
}

func (h *Handler) DeleteVideoTag(c echo.Context) error {
	tagID, err := commonUtils.ParseUint(c.Param("tag_id"))
	if err != nil {
		return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}
	tag, err := h.videoTagRepo.FindByID(tagID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.NewError(err))
	}
	if tag == nil {
		return c.JSON(http.StatusNotFound, utils.NotFound())
	}
	if err := h.videoTagRepo.Delete(tag); err != nil {
		return c.JSON(http.StatusInternalServerError, utils.NewError(err))
	}
	return c.NoContent(http.StatusNoContent)
}
