import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { CommonResponseType } from '@/types/common';
import { getUserProfile, updateUserProfile } from '../api/user';

export function useUserProfile(
  options?: UseQueryOptions<CommonResponseType<string | null>, Error>
) {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: getUserProfile,
    ...options,
  });
}

export function useUploadProfileImage() {
  return useMutation({
    mutationFn: updateUserProfile,
  });
}
