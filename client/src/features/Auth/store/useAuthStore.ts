import { create } from "zustand";
import type { User } from "../types/User";
import { authManager } from "../services/authManager";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  const currentUser = authManager.getCurrentUser();

  return {
    user: currentUser,
    isAuthenticated: !!currentUser,

    login: async (email, password) => {
      const user = await authManager.login(email, password);
      set({ user, isAuthenticated: true });
    },

    logout: () => {
      authManager.logout();
      set({ user: null, isAuthenticated: false });
    },
  };
});
