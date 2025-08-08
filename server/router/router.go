package handlers

import (
	"server/config"
	"server/repository"
	"server/services"
	"server/utils"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/jmoiron/sqlx"
)

func Init(db *sqlx.DB, cfg *config.Config, app *fiber.App) {
	validate := utils.InitValidator()

	userRepository := repository.NewUserRepository(db)
	userService := services.NewUserService(userRepository, validate)
	authService := services.NewAuthService(userRepository, validate, cfg)
	api := app.Group("/api", logger.New())
	users := api.Group("/users")
	auth := api.Group("/auth")
	users.Post("/users", func(c *fiber.Ctx) error {
		return userService.CreateUser(c)
	})
	auth.Post("/login", func(c *fiber.Ctx) error {
		return authService.LoginUser(c)
	})
}
