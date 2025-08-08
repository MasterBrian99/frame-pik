-- +migrate Up
CREATE TYPE user_role AS ENUM ('Admin', 'User', 'Guest');

CREATE TABLE users (
    id uuid NOT NULL PRIMARY KEY  DEFAULT gen_random_uuid(),
    email text NULL,
    "name" varchar(255) NULL,
    bio varchar(500) NULL,
    username varchar(255) NOT NULL UNIQUE,
    avatar_url text NULL,
    role user_role NOT NULL DEFAULT 'User',
    password text NULL,
    created_at timestamp DEFAULT now() NOT NULL,
    updated_at timestamp DEFAULT now() NOT NULL
);

-- +migrate Down
DROP TABLE users;
DROP TYPE user_role;
