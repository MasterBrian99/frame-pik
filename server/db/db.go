package db

import (
	"embed"
	"fmt"
	"server/config"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
	"github.com/rs/zerolog/log"
	migrate "github.com/rubenv/sql-migrate"
)

//go:embed migrations/*
var dbMigrations embed.FS

// DB is the global database connection pool
var DB *sqlx.DB

// InitDB initializes the database connection and handles migrations
func InitDB(cfg *config.Config) (*sqlx.DB, error) {
	log.Info().Msg("Initializing database connection...")

	// Establish database connection
	DB, err := connectToDatabase(cfg)
	if err != nil {
		return nil, fmt.Errorf("failed to connect to database: %w", err)
	}

	// Handle database migrations
	if err := handleMigrations(DB); err != nil {
		return nil, fmt.Errorf("migration handling failed: %w", err)
	}

	log.Info().Msg("Database initialization completed successfully")
	return DB, nil
}

func GetDB() *sqlx.DB {
	if DB == nil {
		log.Fatal().Msg("Database connection is not initialized")
	}
	return DB
}

// connectToDatabase establishes a connection to the PostgreSQL database
func connectToDatabase(cfg *config.Config) (*sqlx.DB, error) {
	// Build PostgreSQL connection string
	connStr := fmt.Sprintf("postgres://%s:%s@%s:%d/%s?sslmode=disable",
		cfg.DbUser, cfg.DbPassword, cfg.DbHost, cfg.DbPort, cfg.DbName)

	// Connect to database
	db, err := sqlx.Connect("postgres", connStr)
	if err != nil {
		log.Error().Err(err).Msg("Failed to connect to database")
		return nil, err
	}

	// Test the connection
	if err := db.Ping(); err != nil {
		log.Error().Err(err).Msg("Failed to ping database")
		return nil, err
	}

	log.Debug().Msg("Database connected successfully")
	return db, nil
}

// handleMigrations checks and runs database migrations if needed
func handleMigrations(db *sqlx.DB) error {
	// Check if migrations are up to date
	if err := checkMigrations(db); err != nil {
		log.Info().Msg("Migrations needed, running migrations...")

		// Run missing migrations
		if migrationErr := runMigrations(db); migrationErr != nil {
			log.Error().Err(migrationErr).Msg("Failed to run migrations")
			return migrationErr
		}

		log.Info().Msg("Migrations completed successfully")
	}

	return nil
}

// runMigrations executes all pending database migrations
func runMigrations(db *sqlx.DB) error {
	migrationSource := migrate.EmbedFileSystemMigrationSource{
		FileSystem: dbMigrations,
		Root:       "migrations",
	}

	// Execute migrations in the "up" direction
	appliedCount, err := migrate.Exec(db.DB, "postgres", migrationSource, migrate.Up)
	if err != nil {
		return fmt.Errorf("failed to execute migrations: %w", err)
	}

	log.Info().Msgf("Successfully applied %d migrations", appliedCount)
	return nil
}

// checkMigrations verifies if all migrations have been applied to the database
func checkMigrations(db *sqlx.DB) error {
	// Get expected number of migrations from embedded files
	expectedCount, err := getExpectedMigrationCount()
	if err != nil {
		return fmt.Errorf("failed to count expected migrations: %w", err)
	}

	// Get actual number of applied migrations from database
	actualCount, err := getAppliedMigrationCount(db)
	if err != nil {
		return fmt.Errorf("failed to count applied migrations: %w", err)
	}

	// Compare expected vs actual migration counts
	if expectedCount == actualCount {
		log.Info().Msgf("All migrations are up to date (%d migrations)", expectedCount)
		return nil
	}

	return fmt.Errorf("migration mismatch: need %d migrations, but database has %d",
		expectedCount, actualCount)
}

// getExpectedMigrationCount counts the number of migration files with "up" scripts
func getExpectedMigrationCount() (int, error) {
	migrationSource := migrate.EmbedFileSystemMigrationSource{
		FileSystem: dbMigrations,
		Root:       "migrations",
	}

	migrations, err := migrationSource.FindMigrations()
	if err != nil {
		return 0, fmt.Errorf("failed to find migrations: %w", err)
	}

	// Count migrations that have "up" scripts
	var count int
	for _, migration := range migrations {
		if len(migration.Up) > 0 {
			count++
		}
	}

	return count, nil
}

// getAppliedMigrationCount queries the database to get the count of applied migrations
func getAppliedMigrationCount(db *sqlx.DB) (int, error) {
	var count int
	query := `SELECT COUNT(1) FROM gorp_migrations`

	err := db.QueryRow(query).Scan(&count)
	if err != nil {
		return 0, fmt.Errorf("failed to query migrations table: %w", err)
	}
	return count, nil
}
