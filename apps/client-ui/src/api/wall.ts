import { CommonResponseT } from '@/types/common';
import { WallCreateRequestT } from '@/types/wall';
import axios from '@/utils/axios';

export async function createWall(data: WallCreateRequestT) {
  const res = await axios.post('wall', data);
  return res.data as unknown as CommonResponseT<null>;
}
