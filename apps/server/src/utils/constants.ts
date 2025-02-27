export const STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  DELETED: 'DELETED',
} as const;
export enum RoleType {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum TokenType {
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
}

export enum COLLECTION_ROLE {
  OWNER = 'OWNER',
  USER = 'USER',
}
export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum IMAGE_FORMAT_TYPE {
  THUMBNAIL = 'THUMBNAIL',
  ORIGINAL = 'ORIGINAL',
}
