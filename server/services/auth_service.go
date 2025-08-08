package services

import (
	"net/http"
	"server/config"
	"server/dtos"
	"server/helpers"
	"server/models"
	"server/repository"
	"server/utils"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

type AuthService struct {
	userRepository *repository.UserRepository
	validate       *validator.Validate
	cfg            *config.Config
}

func NewAuthService(userRepository *repository.UserRepository, validate *validator.Validate, cfg *config.Config) *AuthService {
	return &AuthService{
		userRepository: userRepository,
		validate:       validate,
		cfg:            cfg,
	}
}

func (s *AuthService) ValidateUserCredentials(user *models.User, password string) (bool, error) {

	isValid := user.Password == password
	return isValid, nil
}

func (s *AuthService) LoginUser(c *fiber.Ctx) error {
	body, err := utils.GetBody[dtos.LoginInput](c, s.validate)
	if err != nil {
		return c.Status(fiber.ErrBadRequest.Code).JSON(err)
	}

	exisingUser, err := s.userRepository.ExistUserByUsername(body.Username)
	if err != nil || exisingUser {
		return c.Status(fiber.StatusBadRequest).JSON(helpers.Response{Code: http.StatusBadRequest, Message: "Invalid username or password"})
	}
	user, _ := s.userRepository.GetUserByUsername(body.Username)

	isValid, err := s.ValidateUserCredentials(&user, body.Password)

	if err != nil || !isValid {
		return c.Status(fiber.StatusBadRequest).JSON(helpers.Response{Code: http.StatusBadRequest, Message: "Invalid username or password"})
	}
	token, err := s.GenerateToken(&user)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(helpers.Response{Code: http.StatusInternalServerError, Message: "Failed to generate token"})
	}
	return c.Status(fiber.StatusOK).JSON(helpers.Response{Code: http.StatusOK, Message: "Successfully logged in!", Data: fiber.Map{
		"token": token,
		"user": fiber.Map{
			"ID":       user.ID,
			"Username": user.Username,
			"Email":    user.Email,
		},
	}})

}

func (s *AuthService) GenerateToken(user *models.User) (string, error) {
	claims := jwt.MapClaims{}
	claims["authorized"] = true
	claims["id"] = user.ID
	claims["exp"] = time.Now().Add(time.Hour * time.Duration(s.cfg.TokenLifespan)).Unix()
	claims["username"] = user.Username
	claims["role"] = user.Role

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	return token.SignedString([]byte(s.cfg.TokenSecret))

}
