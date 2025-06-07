import api from "../../../lib/axios";
import type { MenuItem } from "../../../shared/types/MenuItem";

const BASE_URL = "/menu-items";

async function getAll(): Promise<MenuItem[]> {
  const res = await api.get<MenuItem[]>(BASE_URL);
  return res.data;
}

async function getById(id: string): Promise<MenuItem> {
  const res = await api.get<MenuItem>(`${BASE_URL}/${id}`);
  return res.data;
}

async function create(item: Omit<MenuItem, "id">): Promise<MenuItem> {
  const res = await api.post<MenuItem>(BASE_URL, item);
  return res.data;
}

async function update(
  id: string,
  updates: Partial<Omit<MenuItem, "id">>
): Promise<MenuItem> {
  const res = await api.patch<MenuItem>(`${BASE_URL}/${id}`, updates);
  return res.data;
}

async function remove(id: string): Promise<void> {
  await api.delete(`${BASE_URL}/${id}`);
}

export const menuItemService = {
  getAll,
  getById,
  create,
  update,
  delete: remove,
};
