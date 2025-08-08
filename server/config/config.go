package config

import (
	"fmt"
	"log"
	"os"
	"path/filepath"
	"strconv"

	"github.com/joho/godotenv"
)

var cfg *Config

type Config struct {
	DbUser        string
	DbHost        string
	DbPassword    string
	DbName        string
	DbSslMode     bool
	DbPort        int
	TokenLifespan int // in seconds
	TokenSecret   string
}

func SetConfig() *Config {
	// Load .env file if it exists
	loadEnvFile()

	var err error
	dbUser := GetEnvOrDefault("DB_USER", "postgres")
	dbHost := GetEnvOrDefault("DB_HOST", "localhost")
	dbPassword := GetEnvOrDefault("DB_PASSWORD", "password")
	dbName := GetEnvOrDefault("DB_NAME", "flixmango1")
	dbSslMode := GetEnvOrDefault("DB_SSL_MODE", "false")
	dbPort := GetEnvOrDefault("DB_PORT", "5432")
	sslMode, err := strconv.ParseBool(dbSslMode)
	if err != nil {
		panic(fmt.Sprintf("incorrect ssl mode.use true or false,current value %s  ", dbSslMode))

	}
	port, err := strconv.Atoi(dbPort)
	if err != nil {
		panic(fmt.Sprintf("incorrect port. %s  ", dbPort))

	}
	tokenLifespan, err := strconv.Atoi(GetEnvOrDefault("TOKEN_LIFESPAN", "3600"))
	if err != nil {
		panic(fmt.Sprintf("incorrect token lifespan. %s  ", GetEnvOrDefault("TOKEN_LIFESPAN", "3600")))
	}
	tokenSecret := GetEnvOrDefault("TOKEN_SECRET", "secret")
	cfg = &Config{
		DbUser:        dbUser,
		DbHost:        dbHost,
		DbPassword:    dbPassword,
		DbSslMode:     sslMode,
		DbName:        dbName,
		DbPort:        port,
		TokenLifespan: tokenLifespan,
		TokenSecret:   tokenSecret,
	}
	return cfg
}

// loadEnvFile loads environment variables from .env file
func loadEnvFile() {
	// Try to find .env file in current directory or project root
	envPaths := []string{".env", "../.env", "../../.env"}

	for _, path := range envPaths {
		if _, err := os.Stat(path); err == nil {
			if err := godotenv.Load(path); err != nil {
				log.Printf("Warning: Could not load .env file from %s: %v", path, err)
			} else {
				log.Printf("Loaded .env file from %s", path)
				return
			}
		}
	}

	// Try to load from absolute path
	wd, err := os.Getwd()
	if err == nil {
		envPath := filepath.Join(wd, ".env")
		if _, err := os.Stat(envPath); err == nil {
			if err := godotenv.Load(envPath); err != nil {
				log.Printf("Warning: Could not load .env file from %s: %v", envPath, err)
			} else {
				log.Printf("Loaded .env file from %s", envPath)
				return
			}
		}
	}

	log.Println("No .env file found, using environment variables only")
}

// GetConfig returns the global config instance
func GetConfig() *Config {
	if cfg == nil {
		SetConfig()
	}
	return cfg
}

// Init initializes the global config (call this once at application startup)
func Init() {
	SetConfig()
}

// MustGetConfig returns the global config instance, panics if not initialized
func MustGetConfig() *Config {
	if cfg == nil {
		panic("config not initialized, call config.Init() first")
	}
	return cfg
}
func GetEnvOrDefault(key, defaultValue string) string {

	value, exists := os.LookupEnv(key)
	if !exists {
		return defaultValue
	}
	return value

}

func GetEnv(key string) string {
	value, exists := os.LookupEnv(key)
	if !exists {
		panic(fmt.Sprintf(" %s env variable cannot be found ", key))
	}
	return value
}
