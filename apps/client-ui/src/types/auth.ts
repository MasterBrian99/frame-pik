export type RegisterRequestType = {
  email: string;
  name: string;
  password: string;
  username: string;
};
export type LoginRequestType = {
  email: string;
  password: string;
};

export type LoginResponseType = {
  expiresIn: string;
  accessToken: string;
};
