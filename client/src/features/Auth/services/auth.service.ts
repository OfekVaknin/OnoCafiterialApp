import api from "../../../lib/axios";
import type { User } from "../types/User";

const BASE_URL = "/auth";

export const authService = {
  async login(email: string, password: string): Promise<User> {
    const res = await api.post<User>(`${BASE_URL}/login`, { email, password });
    return res.data;
  },

  async register(user: Partial<User>): Promise<User> {
    const res = await api.post<User>(`${BASE_URL}/register`, user);
    return res.data;
  },

  async getAll(): Promise<User[]> {
    const res = await api.get<User[]>(BASE_URL);
    return res.data;
  },

  async getById(id: string): Promise<User> {
    const res = await api.get<User>(`${BASE_URL}/${id}`);
    return res.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`${BASE_URL}/${id}`);
  },
};
