package repository

import (
	"server/models"

	"github.com/jmoiron/sqlx"
	"github.com/rs/zerolog/log"
)

type UserRepository struct {
	DB *sqlx.DB
}

func NewUserRepository(db *sqlx.DB) *UserRepository {
	return &UserRepository{
		DB: db,
	}
}

func (r *UserRepository) CreateUser(user *models.User) error {
	_, err := r.DB.NamedExec("INSERT INTO users (email,name,bio,username,password) VALUES (:email,:name,:bio,:username,:password)", &models.User{
		Email:    user.Email,
		Name:     user.Name,
		Bio:      user.Bio,
		Username: user.Username,
		Password: user.Password})
	if err != nil {
		log.Error().Err(err).Msg("Failed to create user")
		return err
	}
	return nil
}

func (r *UserRepository) GetUserByUsername(username string) (models.User, error) {
	user := models.User{}
	err := r.DB.Get(&user, "SELECT * FROM users WHERE username=$1 LIMIT 1", username)
	if err != nil {
		log.Error().Err(err).Msg("Failed to get user by username")
		return models.User{}, err
	}
	log.Info().Msgf("User found: %v", user)
	return user, nil
}
func (r *UserRepository) ExistUserByUsername(username string) (bool, error) {
	var count int
	err := r.DB.Get(&count, "SELECT COUNT(*) FROM users WHERE username=$1", username)
	if err != nil {
		log.Error().Err(err).Msg("Failed to check if user exists by username")
		return false, err
	}
	exists := count > 0
	if exists {
		log.Info().Msgf("User with username %s exists", username)
	}
	return exists, nil
}
