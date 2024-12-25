package handler

import (
	"fmt"
	"media-lib/internal/app/server/util"
	"media-lib/internal/pkg/oss"
	"net/http"
	"path/filepath"

	"github.com/labstack/echo/v4"
)

func (h *Handler) ListFiles(c echo.Context) error {
	folderName := c.Param("folder_name")
	if folderName != "" {
		folderName = folderName + "/"
	}
	result, err := oss.GetFiles(folderName)
	if err != nil {
		return c.String(http.StatusBadGateway, "Error")
	}
	return c.JSON(http.StatusOK, result)
}

func (h *Handler) UploadImage(c echo.Context) error {
	file, _ := c.FormFile("file")
	fileObj, err := file.Open()
	contentType := file.Header.Get("content-type")
	fmt.Println("content-type", contentType)
	if err != nil {
		return c.JSON(http.StatusBadRequest, util.NewError(err))
	}
	objectPath := filepath.Join("pictures/covers", file.Filename)
	info, err := oss.UploadFile(&fileObj, objectPath, contentType)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, util.NewError(err))
	}
	return c.JSON(http.StatusOK, info)
}
