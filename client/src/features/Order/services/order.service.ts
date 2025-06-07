import { menuItemService } from "../../Admin/services/menuItem.service";
import { OrderStatusEnum } from "../enums/OrderStatusEnum";
import type { Order } from "../types/Order";

const STORAGE_KEY = "orders";

function getAll(): Order[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function getAllStudentOrders(studentId: string): Order[] {
  const orders = getAll();
  return orders.filter((o) => o.userId === studentId);
}

function getById(id: string): Order | undefined {
  return getAll().find((o) => o.id === id);
}

function getNextDocumentNumber(): number {
  const key = "orderDocumentNumber";
  const last = Number(localStorage.getItem(key)) || 1000;
  const next = last + 1;
  localStorage.setItem(key, String(next));
  return next;
}

function create(order: Order): Order {
  const orders = getAll();
  if (orders.some((o) => o.id === order.id))
    throw new Error("Order already exists");

  if (typeof order.documentNumber !== "number") {
    order.documentNumber = getNextDocumentNumber();
  }

  const now = new Date();
  const createdAt = now.toISOString();

  // Calculate max preparing time from items
  const preparingTimes = order.items.map((item) => {
    const menuItem = menuItemService.getById(item.menuItemId);
    return menuItem?.preparingTimeInMin || 0;
  });

  const maxTime = preparingTimes.length > 0 ? Math.max(...preparingTimes) : 0;

  order.createdAt = createdAt;
  order.updatedAt = createdAt;
  order.preparingTimeInMin = maxTime;
  order.readyAt = new Date(now.getTime() + maxTime * 60000).toISOString();

  orders.push(order);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  return order;
}

function update(id: string, updates: Partial<Order>): Order | undefined {
  const orders = getAll();
  const idx = orders.findIndex((o) => o.id === id);
  if (idx === -1) throw new Error("Order not found");

  // ✅ Set readyAt only when entering 'Preparing' state with a time
  if (
    updates.status === OrderStatusEnum.Preparing &&
    updates.preparingTimeInMin != null
  ) {
    const startedAt = new Date().toISOString();
    updates.updatedAt = startedAt;
    updates.readyAt = new Date(
      Date.now() + updates.preparingTimeInMin * 60000
    ).toISOString();
  }

  orders[idx] = { ...orders[idx], ...updates };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  return orders[idx];
}

function remove(id: string): boolean {
  const orders = getAll();
  const filtered = orders.filter((o) => o.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return orders.length !== filtered.length;
}

export const orderService = {
  getAll,
  getById,
  create,
  update,
  delete: remove,
  getAllStudentOrders,
};
