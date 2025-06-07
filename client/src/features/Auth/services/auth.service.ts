import { USER_ROLE } from "../enums/UserRole.enum";
import type { User } from "../types/User";
import { authManager } from "./authManager";

const STORAGE_KEY = "users";

function getAll(): User[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function getById(id: string): User | undefined {
  return getAll().find((u) => u.id === id);
}

function create(user: User): User {
  const users = getAll();
  if (users.some((u) => u.id === user.id))
    throw new Error("User already exists");
  
  users.push(user);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  return user;
}

function update(id: string, updates: Partial<User>): User | undefined {
  const users = getAll();
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) throw new Error("User not found");
  users[idx] = { ...users[idx], ...updates };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  return users[idx];
}

function remove(id: string): boolean {
  const users = getAll();
  const filtered = users.filter((u) => u.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return users.length !== filtered.length;
}

function ensureAdminUser() {
  const users = getAll();
  const adminExists = users.some((u) => u.role === USER_ROLE.Admin);
  if (!adminExists) {
    const adminUser: User = {
      id: crypto.randomUUID(),
      name: "Admin",
      email: "admin@cafeteria.com",
      password: authManager.hashPassword("admin123"),
      role: USER_ROLE.Admin,
      createdAt: new Date().toISOString(),
    };
    users.push(adminUser);
    saveUsers(users);
  }
}

function saveUsers(users: User[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export const authService = {
  getAll,
  getById,
  create,
  update,
  delete: remove,
  ensureAdminUser,
};
