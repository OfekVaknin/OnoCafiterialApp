import { authService } from "./auth.service";
import type { User } from "../types/User";
import CryptoJS from "crypto-js";

const AUTH_KEY = "authUser";

function hashPassword(password: string): string {
  return CryptoJS.SHA256(password.trim()).toString();
}

function login(email: string, password: string): User {
  const users = authService.getAll();
  const hashed = hashPassword(password);
  console.log("🚀 ~ login ~ users:", users)
  console.log("🚀 ~ login ~ hashed:", hashed)
  console.log("🚀 ~ login ~ password:", password)
  console.log("🚀 ~ login ~ email:", email)
  const user = users.find(
    (u: User) => u.email === email && u.password === hashed
  );
  if (!user) throw new Error("Invalid email or password");
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  return user;
}

function logout() {
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
  hashPassword,
};
