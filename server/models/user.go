package models

type UserRole string

const (
	ADMIN UserRole = "Admin"
	USER  UserRole = "User"
	GUEST UserRole = "Guest"
)

type User struct {
	ID        string   `db:"id" json:"id"`
	Email     string   `db:"email" json:"email"`
	Name      string   `db:"name" json:"name"`
	Bio       string   `db:"bio" json:"bio"`
	Username  string   `db:"username" json:"username"`
	AvatarURL string   `db:"avatar_url" json:"avatar_url"`
	Role      UserRole `db:"role" json:"role"`  // e.g., "admin
	Password  string   `db:"password" json:"-"` // Password should not be exposed in JSON responses
	CreatedAt string   `db:"created_at" json:"created_at"`
	UpdatedAt string   `db:"updated_at" json:"updated_at"`
}
