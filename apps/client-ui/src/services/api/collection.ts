import { CollectionListResponseType } from '@/types/collection';
import { CommonResponsePaginationType, CommonResponseType } from '@/types/common';
import axios from '@/utils/axios';

export async function createCollection(data: FormData) {
  const res = await axios.post('collection', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data as unknown as CommonResponseType;
}

export async function getCurrentUserCollection({
  pageParam = 1,
  searchValue,
}: {
  pageParam: number;
  searchValue: string;
}): Promise<CommonResponseType<CommonResponsePaginationType<CollectionListResponseType>>> {
  const urlParams = new URLSearchParams();
  if (pageParam) {
    urlParams.append('page', String(pageParam));
  }
  if (searchValue && searchValue.length > 0) {
    urlParams.append('search', searchValue);
  }

  urlParams.append('order', 'DESC');
  const res = await axios.get(`collection/current-user?${urlParams.toString()}`);
  return res.data as unknown as CommonResponseType<
    CommonResponsePaginationType<CollectionListResponseType>
  >;
}

export async function getCollectionThumbnail(id: string) {
  const res = await axios.get(`collection/thumbnail/${id}`, {
    responseType: 'blob',
  });
  return res.data;
}
