import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getUserProfile, updateUserProfile } from "../api/user";

export function useUserProfile(options?: UseQueryOptions<Blob, Error>) {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
    ...options,
  });
}

export function useUploadProfileImage() {
  return useMutation({
    mutationFn: updateUserProfile,
  });
}
