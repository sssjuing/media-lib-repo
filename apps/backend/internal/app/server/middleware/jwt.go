package middleware

import (
	gojwt "github.com/golang-jwt/jwt/v5"
	echojwt "github.com/labstack/echo-jwt/v4"
	"github.com/labstack/echo/v4"
	"github.com/sssjuing/media-lib-repo/apps/backend/internal/app/server/jwt"
)

func JWT() echo.MiddlewareFunc {
	return echojwt.WithConfig(echojwt.Config{
		TokenLookup: "cookie:token",
		NewClaimsFunc: func(c echo.Context) gojwt.Claims {
			return new(jwt.JwtCustomClaims)
		},
		SigningKey: jwt.JWTSecret,
	})
}
