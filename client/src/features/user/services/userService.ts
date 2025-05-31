import type { User } from "../../../shared/types/User";

const STORAGE_KEY = 'users';

function getAll(): User[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function getById(id: string): User | undefined {
  return getAll().find(u => u.id === id);
}

function create(user: User): User {
  const users = getAll();
  if (users.some(u => u.id === user.id)) throw new Error('User already exists');
  users.push(user);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  return user;
}

function update(id: string, updates: Partial<User>): User | undefined {
  const users = getAll();
  const idx = users.findIndex(u => u.id === id);
  if (idx === -1) throw new Error('User not found');
  users[idx] = { ...users[idx], ...updates };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  return users[idx];
}

function remove(id: string): boolean {
  const users = getAll();
  const filtered = users.filter(u => u.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return users.length !== filtered.length;
}

export const userService = { getAll, getById, create, update, delete: remove };
