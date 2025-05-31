import type { OrderItem } from "../features/orders/types/OrderItem";

const STORAGE_KEY = 'orderItems';

function getAll(): OrderItem[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function getById(id: string): OrderItem | undefined {
  return getAll().find(i => i.id === id);
}

function create(item: OrderItem): OrderItem {
  const items = getAll();
  if (items.some(i => i.id === item.id)) throw new Error('Order item already exists');
  items.push(item);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  return item;
}

function update(id: string, updates: Partial<OrderItem>): OrderItem | undefined {
  const items = getAll();
  const idx = items.findIndex(i => i.id === id);
  if (idx === -1) throw new Error('Order item not found');
  items[idx] = { ...items[idx], ...updates };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  return items[idx];
}

function remove(id: string): boolean {
  const items = getAll();
  const filtered = items.filter(i => i.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return items.length !== filtered.length;
}

export const orderItemService = { getAll, getById, create, update, delete: remove };
