package router

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/sssjuing/media-lib-repo/apps/backend/internal/app/server/utils"
)

func New() *echo.Echo {
	e := echo.New()

	e.Logger.SetLevel(utils.GetLogLevel())

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.Gzip())

	e.Group("/login").Use(middleware.StaticWithConfig(middleware.StaticConfig{
		Root:   "web/login",
		Index:  "index.html",
		Browse: false,
		HTML5:  true,
	}))

	e.Group("/h5").Use(middleware.StaticWithConfig(middleware.StaticConfig{
		Root:   "web/h5",
		Index:  "index.html",
		Browse: false,
		HTML5:  true,
	}))

	e.Group("/console").Use(middleware.StaticWithConfig(middleware.StaticConfig{
		Root:   "web/console",
		Index:  "index.html",
		Browse: false,
		HTML5:  true,
	}))

	e.Validator = NewValidator()
	return e
}
