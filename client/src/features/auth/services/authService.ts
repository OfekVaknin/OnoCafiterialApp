import type { User } from '../../user/types/User';
import { UserRoleEnum } from '../../user/enums/UserRoleEnum';
import CryptoJS from 'crypto-js';

const STORAGE_KEY = 'users';
const AUTH_KEY = 'authUser';

function getAllUsers(): User[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveUsers(users: User[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

function hashPassword(password: string): string {
  return CryptoJS.SHA256(password).toString();
}

function register(user: Omit<User, 'id' | 'createdAt' | 'role'> & { role?: UserRoleEnum }): User {
  const users = getAllUsers();
  if (users.some(u => u.email === user.email)) throw new Error('Email already registered');
  const newUser: User = {
    ...user,
    password: hashPassword(user.password),
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    role: user.role || UserRoleEnum.Student,
  };
  users.push(newUser);
  saveUsers(users);
  localStorage.setItem(AUTH_KEY, JSON.stringify(newUser));
  return newUser;
}

function login(email: string, password: string): User {
  const users = getAllUsers();
  const hashed = hashPassword(password);
  const user = users.find(u => u.email === email && u.password === hashed);
  if (!user) throw new Error('Invalid email or password');
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

function ensureAdminUser() {
  const users = getAllUsers();
  const adminExists = users.some(u => u.role === UserRoleEnum.Admin);
  if (!adminExists) {
    const adminUser: User = {
      id: crypto.randomUUID(),
      name: 'Admin',
      email: 'admin@cafeteria.com',
      password: hashPassword('admin123'),
      role: UserRoleEnum.Admin,
      createdAt: new Date().toISOString(),
    };
    users.push(adminUser);
    saveUsers(users);
  }
}

export const authService = {
  register,
  login,
  logout,
  getCurrentUser,
  isAuthenticated,
  ensureAdminUser,
};
