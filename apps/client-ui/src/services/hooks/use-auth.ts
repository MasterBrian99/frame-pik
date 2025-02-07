import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api/auth";

export function useRegisterUser() {
  return useMutation({
    mutationFn: registerUser,
  });
}
