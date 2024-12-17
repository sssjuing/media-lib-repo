package server

import (
	"media-lib/internal/app/server/db"
	"media-lib/internal/app/server/handler"
	"media-lib/internal/app/server/router"
	"media-lib/internal/app/server/store"
	"media-lib/internal/pkg/config"
	"net/http"

	"github.com/labstack/echo/v4"
)

func Run() {
	r := router.New()
	// r.GET("/swagger/*", echoSwagger.WrapHandler)
	v1 := r.Group("/api")

	dsn := config.GetMysqlDsn()
	d := db.NewDB(dsn)
	db.AutoMigrate(d)

	as := store.NewActressStore(d)
	vs := store.NewVedioStore(d)

	h := handler.NewHandler(as, vs)
	h.Register(v1)

	r.GET("/", func(c echo.Context) error {
		return c.Redirect(http.StatusSeeOther, "/h5")
	})

	r.Logger.Fatal(r.Start(":1323"))
}
