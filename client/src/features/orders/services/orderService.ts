import type { Order } from "../types/Order";

const STORAGE_KEY = 'orders';

function getAll(): Order[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function getById(id: string): Order | undefined {
  return getAll().find(o => o.id === id);
}

function getNextDocumentNumber(): number {
  const key = 'orderDocumentNumber';
  const last = Number(localStorage.getItem(key)) || 1000;
  const next = last + 1;
  localStorage.setItem(key, String(next));
  return next;
}

function create(order: Order): Order {
  const orders = getAll();
  if (orders.some(o => o.id === order.id)) throw new Error('Order already exists');
  // Assign documentNumber if not set
  if (typeof order.documentNumber !== 'number') {
    order.documentNumber = getNextDocumentNumber();
  }
  orders.push(order);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  return order;
}

function update(id: string, updates: Partial<Order>): Order | undefined {
  const orders = getAll();
  const idx = orders.findIndex(o => o.id === id);
  if (idx === -1) throw new Error('Order not found');
  orders[idx] = { ...orders[idx], ...updates };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  return orders[idx];
}

function remove(id: string): boolean {
  const orders = getAll();
  const filtered = orders.filter(o => o.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return orders.length !== filtered.length;
}

export const orderService = { getAll, getById, create, update, delete: remove };
