import { CommonResponseType } from '@/types/common';
import axios from '@/utils/axios';

export async function getUserProfile() {
  const res = await axios.get('user/profile-image');
  return res.data as unknown as CommonResponseType<string | null>;
}

export async function updateUserProfile(data: FormData) {
  const res = await axios.post('user/profile-image', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data as unknown as CommonResponseType;
}
