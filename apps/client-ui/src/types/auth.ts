export type AuthLoginRequestT = {
  email: string;
  password: string;
};

export type AuthLoginResponseT = {
  expiresIn: string;
  accessToken: string;
};

export type AuthRegisterRequestT = {
  email: string;
  password: string;
  name: string;
};

export type AuthCurrentUserResponseT = {
  id: string;
  email: string;
  name: string;
};
