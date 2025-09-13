package server

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/sssjuing/media-lib-repo/apps/backend/internal/app/server/db"
	"github.com/sssjuing/media-lib-repo/apps/backend/internal/app/server/download"
	"github.com/sssjuing/media-lib-repo/apps/backend/internal/app/server/handler"
	"github.com/sssjuing/media-lib-repo/apps/backend/internal/app/server/repository"
	"github.com/sssjuing/media-lib-repo/apps/backend/internal/app/server/router"
	"github.com/sssjuing/media-lib-repo/apps/backend/internal/pkg/config"
)

func Run() {
	r := router.New()
	// r.GET("/swagger/*", echoSwagger.WrapHandler)

	download.Init(r.Logger)

	dsn := config.GetPostgresDsn()
	replicas := config.GetPostgresReplicas()
	d := db.NewDB(dsn, replicas)

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
