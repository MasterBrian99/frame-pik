import {
  AuthCurrentUserResponseT,
  AuthLoginRequestT,
  AuthLoginResponseT,
  AuthRegisterRequestT,
} from '@/types/auth';
import { CommonResponseT } from '@/types/common';
import axios from '@/utils/axios';

export async function loginUser(data: AuthLoginRequestT) {
  const res = await axios.post('auth/login', data);
  return res.data as unknown as CommonResponseT<AuthLoginResponseT>;
}

export async function registerUser(data: AuthRegisterRequestT) {
  const res = await axios.post('auth', data);
  return res.data as unknown as CommonResponseT<null>;
}

export async function getCurrentUser() {
  const res = await axios.get('auth/me');
  return res.data as unknown as CommonResponseT<AuthCurrentUserResponseT>;
}
