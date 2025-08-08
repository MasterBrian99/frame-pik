package utils

import (
	"server/helpers"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"github.com/rs/zerolog/log"
)

func GetBody[ValidatorStruct any](ctx *fiber.Ctx, validate *validator.Validate) (ValidatorStruct, interface{}) {
	var body ValidatorStruct

	if err := ctx.BodyParser(&body); err != nil {
		log.Err(err)
		// ctx.Status(fiber.StatusBadRequest).JSON(helpers.Response{Code: http.StatusBadRequest, Message: err.Error()})
		return body, fiber.Map{
			"error": "Failed to create user",
		}
	}
	validationErrors := []helpers.ErrorResponse{}

	errs := validate.Struct(&body)
	if errs != nil {
		for _, err := range errs.(validator.ValidationErrors) {
			// In this case data object is actually holding the User struct
			var elem helpers.ErrorResponse

			elem.FailedField = err.Field() // Export struct field name
			elem.Tag = err.Tag()           // Export struct tag
			elem.Value = err.Value()       // Export field value
			elem.Error = true

			validationErrors = append(validationErrors, elem)
		}
		// ctx.Status(fiber.StatusBadRequest).JSON(helpers.Response{Code: http.StatusBadRequest, Message: "Validation failed", Data: validationErrors})
		return body, fiber.Map{
			"error": validationErrors,
		}
	}

	return body, nil
}
