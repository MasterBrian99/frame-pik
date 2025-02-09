import { CommonResponseType } from '@/types/api/common';
import axios from '@/utils/axios';

export async function createCollection(data: FormData) {
  const res = await axios.post('collection', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data as unknown as CommonResponseType;
}
