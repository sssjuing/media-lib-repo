package handler

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func (h *Handler) Register(g *echo.Group) {
	files := g.Group("/files")
	files.GET("", h.ListFiles)
	files.GET("/:folder_name", h.ListFiles)
	files.POST("/upload_image", h.UploadImage)

	actresses := g.Group("/actresses")
	actresses.GET("", h.ListActresses)
	actresses.POST("", h.CreateActress)
	actresses.GET("/:actress_id", h.GetActressById)
	actresses.PUT("/:actress_id", h.UpdateActress)
	actresses.DELETE("/:actress_id", h.RemoveActress)
	actresses.GET("/:actress_id/videos", h.GetVideosByActressId)

	videos := g.Group("/videos")
	videos.GET("", h.ListVideos)
	videos.POST("", h.CreateVideo)
	videos.GET("/:video_id", h.GetVideoById)
	videos.PUT("/:video_id", h.UpdateVideo)
	videos.DELETE("/:video_id", h.RemoveVideo)

	g.GET("/*", func(c echo.Context) error {
		return c.String(http.StatusNotFound, "not found")
	})
}
