import {
  CollectionListResponseType,
  CollectionRequestUpdateType,
  CollectionResponseType,
} from '@/types/collection';
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
  count,
}: {
  pageParam: number;
  searchValue: string;
  count: number;
}): Promise<CommonResponseType<CommonResponsePaginationType<CollectionListResponseType>>> {
  const urlParams = new URLSearchParams();
  if (pageParam) {
    urlParams.append('page', String(pageParam));
  }
  if (searchValue && searchValue.length > 0) {
    urlParams.append('search', searchValue);
  }
  if (count) {
    urlParams.append('count', String(count));
  }

  urlParams.append('order', 'DESC');
  const res = await axios.get(`collection/current-user?${urlParams.toString()}`);
  return res.data as unknown as CommonResponseType<
    CommonResponsePaginationType<CollectionListResponseType>
  >;
}

export async function getCollectionByIdCurrentUser(id: string) {
  const res = await axios.get(`collection/current-user/${id}`);
  return res.data as unknown as CommonResponseType<CollectionResponseType>;
}

export async function updateCollection(data: CollectionRequestUpdateType) {
  const res = await axios.put('collection', data);
  return res.data as unknown as CommonResponseType;
}
