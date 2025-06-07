import api from "../../../lib/axios";
import type { Order } from "../types/Order";

const BASE_URL = "/orders";

// GET all orders (admin)
async function getAll(): Promise<Order[]> {
  const res = await api.get<Order[]>(BASE_URL);
  return res.data;
}

// GET all orders for a specific student
async function getAllByStudent(userId: string): Promise<Order[]> {
  const res = await api.get<Order[]>(`${BASE_URL}/user/${userId}`);
  return res.data;
}

// GET order by ID
async function getById(id: string): Promise<Order> {
  const res = await api.get<Order>(`${BASE_URL}/${id}`);
  return res.data;
}

// POST - create new order
async function create(order: Order): Promise<Order> {
  const res = await api.post<Order>(BASE_URL, order);
  return res.data;
}

// PATCH - update order
async function update(id: string, updates: Partial<Order>): Promise<Order> {
  const res = await api.patch<Order>(`${BASE_URL}/${id}`, updates);
  return res.data;
}

// DELETE - remove order
async function remove(id: string): Promise<void> {
  await api.delete(`${BASE_URL}/${id}`);
}

export const orderService = {
  getAll,
  getAllByStudent,
  getById,
  create,
  update,
  delete: remove,
};
