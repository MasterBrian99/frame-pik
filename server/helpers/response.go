package helpers

type Response struct {
	Code    int         `json:"code"`
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
}
type ErrorResponse struct {
	Error       bool
	FailedField string
	Tag         string
	Value       interface{}
}
