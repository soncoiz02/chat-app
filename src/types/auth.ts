import { UserType } from "./user";

export type LoginFormType = {
  email: string;
  password: string;
};

export type RegisterFormType = {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  confirmPassword: string;
};

export type AuthResponseType = {
  accessToken: string;
  userInfo: UserType;
};

export type RegisterDataType = {
  email: string;
  password: string;
  displayName: string;
};
