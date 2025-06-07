import type { User } from "../types/User";
import { authService } from "./auth.service";

const AUTH_KEY = "authUser";

function saveUser(user: User) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}

function login(email: string, password: string): Promise<User> {
  return authService.login(email, password).then((user) => {
    saveUser(user);
    return user;
  });
}

function logout(): void {
  localStorage.removeItem(AUTH_KEY);
}

function getCurrentUser(): User | null {
  const data = localStorage.getItem(AUTH_KEY);
  return data ? JSON.parse(data) : null;
}

function isAuthenticated(): boolean {
  return !!getCurrentUser();
}

export const authManager = {
  login,
  logout,
  getCurrentUser,
  isAuthenticated,
};
