import { RegisterRequestType } from "@/types/api/auth";
import axios from "@/utils/axios";

export async function registerUser(data: RegisterRequestType) {
  try {
    const res = await axios.post("auth/login", data);
    return res.data as unknown;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}
