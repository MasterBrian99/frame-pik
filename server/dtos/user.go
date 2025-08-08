package dtos

type AuthenticationInput struct {
	Email    string `json:"email"`
	Username string `json:"username"  validate:"required,min=5,max=20"`
	Password string `json:"password" validate:"required"`
	Bio      string `json:"bio" validate:"max=500"`
	Name     string `json:"name" validate:"max=254"`
}

type LoginInput struct {
	Username string `json:"username" validate:"required"`
	Password string `json:"password" validate:"required"`
}
