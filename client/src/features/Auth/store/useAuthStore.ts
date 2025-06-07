import { create } from "zustand";
import type { User } from "../types/User";
import { authManager } from "../services/authManager";

interface AuthState {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const useAuthStore = create<AuthState>((set) => {
  const currentUser = authManager.getCurrentUser();

  return {
    user: currentUser,
    isAuthenticated: !!currentUser,
    login: (email, password) => {
      const user = authManager.login(email, password);
      set({ user, isAuthenticated: true });
    },
    logout: () => {
      authManager.logout();
      set({ user: null, isAuthenticated: false });
    },
  };
});
