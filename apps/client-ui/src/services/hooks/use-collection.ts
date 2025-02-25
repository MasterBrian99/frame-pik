import {
    DefinedUseInfiniteQueryResult,
    useInfiniteQuery,
    useMutation,
    useQuery,
    UseQueryOptions,
  } from '@tanstack/react-query';
  import { CollectionListResponseType } from '@/types/collection';
  import { CommonResponsePaginationType, CommonResponseType } from '@/types/common';
  import {
    createCollection,
    getCollectionThumbnail,
    getCurrentUserCollection,
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
    // params: Parameters<typeof getCurrentUserCollection>[0],
    options?: DefinedUseInfiniteQueryResult<
      CommonResponseType<CommonResponsePaginationType<CollectionListResponseType>>,
      Error
    >
  ) {
    return useInfiniteQuery({
      queryKey: ['collection', 'current-user',searchValue],
      queryFn: ({ pageParam }) => getCurrentUserCollection({ pageParam ,searchValue}),
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
  
  export function useCollectionThumbnail(
    id: string,
    options?: Omit<UseQueryOptions<Blob, Error>, 'queryKey'>
  ) {
    return useQuery({
      queryKey: ['collection', 'thumbnail', id],
      queryFn: () => getCollectionThumbnail(id),
      ...options,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    });
  }
  