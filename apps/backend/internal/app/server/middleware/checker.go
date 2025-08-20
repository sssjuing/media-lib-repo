package middleware

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/sssjuing/media-lib-repo/apps/backend/internal/app/server/repository"
	"github.com/sssjuing/media-lib-repo/apps/backend/internal/app/server/utils"
	commonUtils "github.com/sssjuing/media-lib-repo/apps/backend/internal/pkg/utils"
)

func ActressChecker(ar repository.ActressRepository) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			actressID, err := commonUtils.ParseUint(c.Param("actress_id"))
			if err != nil {
				return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
			}
			a, err := ar.FindByID(actressID)
			if err != nil {
				return c.JSON(http.StatusInternalServerError, utils.NewError(err))
			}
			if a == nil {
				return c.JSON(http.StatusNotFound, utils.NotFound())
			}
			c.Set("actress", a)
			return next(c)
		}
	}
}

func VideoChecker(vr repository.VideoRepository) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			videoID, err := commonUtils.ParseUint(c.Param("video_id"))
			if err != nil {
				return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
			}
			v, err := vr.FindByID(videoID)
			if err != nil {
				return c.JSON(http.StatusInternalServerError, utils.NewError(err))
			}
			if v == nil {
				return c.JSON(http.StatusNotFound, utils.NotFound())
			}
			c.Set("video", v)
			return next(c)
		}
	}
}
