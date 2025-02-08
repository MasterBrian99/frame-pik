import { useMutation } from "@tanstack/react-query";
import { loginUser, registerUser } from "../api/auth";

export function useRegisterUser() {
  return useMutation({
    mutationFn: registerUser,
  });
}

export function useLoginUser() {
  return useMutation({
    mutationFn: loginUser,
  });
}
