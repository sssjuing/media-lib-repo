package server

import (
	"media-lib/internal/app/server/db"
	"media-lib/internal/app/server/handler"
	"media-lib/internal/app/server/repository"
	"media-lib/internal/app/server/router"
	"media-lib/internal/pkg/config"
	"net/http"

	"github.com/labstack/echo/v4"
)

func Run() {
	r := router.New()
	// r.GET("/swagger/*", echoSwagger.WrapHandler)

	dsn := config.GetPostgresDsn()
	d := db.NewDB(dsn)

	ar := repository.NewActressRepositoryImpl(d)
	vr := repository.NewVideoRepositoryImpl(d)

	h := handler.NewHandler(ar, vr)
	v1 := r.Group("/api")
	h.Register(v1)

	r.GET("/", func(c echo.Context) error {
		return c.Redirect(http.StatusSeeOther, "/h5")
	})

	r.Logger.Fatal(r.Start(":1323"))
}
