import {
  DefinedUseInfiniteQueryResult,
  useInfiniteQuery,
  useMutation,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';
import { CollectionListResponseType, CollectionResponseType } from '@/types/collection';
import { CommonResponsePaginationType, CommonResponseType } from '@/types/common';
import {
  createCollection,
  getCollectionByIdCurrentUser,
  getCurrentUserCollection,
  updateCollection,
} from '../api/collection';

export function useCollectionCreate() {
  return useMutation({
    mutationFn: createCollection,
  });
}

// export function useCollectionCurrentUser(
// params: Parameters<typeof getCurrentUserCollection>[0],
// options?: UseQueryOptions<
//   CommonResponseType<CommonResponsePaginationType<CollectionListResponseType>>,
//   Error
// >
// ) {
//   return useQuery({
//     queryKey: ['collection', 'current-user', params],
//     queryFn: () => getCurrentUserCollection(params),
//     ...options,
//   });
// }

export function useCollectionCurrentUser(
  searchValue: string,
  count: number,
  // params: Parameters<typeof getCurrentUserCollection>[0],
  options?: DefinedUseInfiniteQueryResult<
    CommonResponseType<CommonResponsePaginationType<CollectionListResponseType>>,
    Error
  >
) {
  return useInfiniteQuery({
    queryKey: ['collection', 'current-user', searchValue, count],
    queryFn: ({ pageParam }) => getCurrentUserCollection({ pageParam, searchValue, count }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.data && lastPage.data.meta && lastPage.data.meta.page) {
        if (lastPage.data.meta.page === lastPage.data.meta.pageCount) {
          return undefined;
        }
        const nextPage = lastPage.data?.meta.page + 1;
        return nextPage;
      }
      return undefined;
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    ...options,
  });
}

export function useCollectionByIdCurrentUser(
  id: string,
  options?: UseQueryOptions<CommonResponseType<CollectionResponseType>, Error>
) {
  return useQuery({
    queryKey: ['collection', 'current-user', id],
    queryFn: () => getCollectionByIdCurrentUser(id),
    ...options,
  });
}

export function useCollectionUpdate() {
  return useMutation({
    mutationFn: updateCollection,
  });
}
