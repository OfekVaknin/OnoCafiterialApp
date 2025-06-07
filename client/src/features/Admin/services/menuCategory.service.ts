import api from "../../../lib/axios";
import type { MenuCategory } from "../../../shared/types/MenuCategory";

const BASE_URL = "/menu-categories";

async function getAll(): Promise<MenuCategory[]> {
  const res = await api.get<MenuCategory[]>(BASE_URL);
  return res.data;
}

async function getById(id: string): Promise<MenuCategory> {
  const res = await api.get<MenuCategory>(`${BASE_URL}/${id}`);
  return res.data;
}

async function create(
  category: Omit<MenuCategory, "id" | "createdAt">
): Promise<MenuCategory> {
  const res = await api.post<MenuCategory>(BASE_URL, category);
  return res.data;
}

async function update(
  id: string,
  updates: Partial<Omit<MenuCategory, "id" | "createdAt">>
): Promise<MenuCategory> {
  const res = await api.patch<MenuCategory>(`${BASE_URL}/${id}`, updates);
  return res.data;
}

async function remove(id: string): Promise<void> {
  await api.delete(`${BASE_URL}/${id}`);
}

export const menuCategoryService = {
  getAll,
  getById,
  create,
  update,
  delete: remove,
};
