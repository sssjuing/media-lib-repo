package handler

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func validateRequest[T any](c echo.Context, req *T) (int, error) {
	if err := c.Bind(req); err != nil {
		return http.StatusBadRequest, err
	}
	if err := c.Validate(req); err != nil {
		return http.StatusUnprocessableEntity, err
	}
	return 0, nil
}
