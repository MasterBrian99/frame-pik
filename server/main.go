package main

import (
	"server/config"
	"server/db"
	router "server/router"

	"github.com/gofiber/fiber/v2"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
)

func main() {
	zerolog.TimeFieldFormat = zerolog.TimeFormatUnix
	config.Init()
	cfg := config.GetConfig()

	db, err := db.InitDB(cfg)
	if err != nil {
		log.Fatal().Err(err).Msg("Failed to initialize database")
		return
	}
	app := fiber.New()

	router.Init(db, cfg, app)

	app.Listen(":3001")
}
