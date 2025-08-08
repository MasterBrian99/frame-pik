package services

import (
	"net/http"
	"server/dtos"
	"server/helpers"
	"server/models"
	"server/repository"
	"server/utils"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

type UserService struct {
	userRepository *repository.UserRepository
	validate       *validator.Validate
}

func NewUserService(userRepository *repository.UserRepository, validate *validator.Validate) *UserService {
	return &UserService{
		userRepository: userRepository,
		validate:       validate,
	}
}

func (s *UserService) CreateUser(c *fiber.Ctx) error {
	body, err := utils.GetBody[dtos.AuthenticationInput](c, s.validate)
	if err != nil {
		return c.Status(fiber.ErrBadRequest.Code).JSON(err)
	}

	exisingUser, err := s.userRepository.ExistUserByUsername(body.Username)

	if err != nil || exisingUser {
		return c.Status(fiber.StatusBadRequest).JSON(helpers.Response{Code: http.StatusBadRequest, Message: "User already exists with this username"})
	}
	hashedPassword, err := utils.HashPassword(body.Password)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(helpers.Response{Code: http.StatusInternalServerError, Message: "Failed to hash password"})

	}
	user := models.User{
		Email:    body.Email,
		Name:     body.Name,
		Bio:      body.Bio,
		Username: body.Username,
		Password: hashedPassword,
	}
	err = s.userRepository.CreateUser(&user)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(helpers.Response{Code: http.StatusInternalServerError, Message: "Failed to create user"})

	}
	return c.Status(fiber.StatusCreated).JSON(helpers.Response{Code: http.StatusCreated, Message: "User Created Successfuly !"})
}
