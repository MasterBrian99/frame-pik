import {
  LoginRequestType,
  LoginResponseType,
  RegisterRequestType,
} from "@/types/api/auth";
import { CommonResponseType } from "@/types/api/common";
import axios from "@/utils/axios";

export async function registerUser(data: RegisterRequestType) {
  const res = await axios.post("auth", data);
  return res.data as unknown as CommonResponseType;
}

export async function loginUser(data: LoginRequestType) {
  const res = await axios.post("auth/login", data);
  return res.data as unknown as CommonResponseType<LoginResponseType>;
}
