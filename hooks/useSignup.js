import { useMutation } from "@tanstack/react-query";

export function useSignup() {
  return useMutation({
    mutationFn: (data) => signup(data.email, data.password, data.name),
  });
}
