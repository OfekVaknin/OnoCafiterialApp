import { useAuthStore } from "../store/useAuthStore";

export const useLoggedInUser = () => {
  const user = useAuthStore((state) => state.user);
  return user;
};
