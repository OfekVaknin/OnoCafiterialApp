import { create } from 'zustand';
import type { MenuItem } from './types/MenuItem';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const STORAGE_KEY = 'cart';

function getInitialCart(): CartItem[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export const useCartStore = create<CartState>((set, get) => ({
  items: getInitialCart(),
  addToCart: (item) => {
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id);
      let updated;
      if (existing) {
        updated = state.items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        updated = [
          ...state.items,
          {
            id: item.id,
            name: item.name,
            price: item.price,
            imageUrl: item.imageUrl,
            quantity: 1,
          },
        ];
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return { items: updated };
    });
  },
  removeFromCart: (id) => {
    set((state) => {
      const existing = state.items.find((i) => i.id === id);
      let updated;
      if (existing && existing.quantity > 1) {
        updated = state.items.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i
        );
      } else {
        updated = state.items.filter((i) => i.id !== id);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return { items: updated };
    });
  },
  clearCart: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ items: [] });
  },
}));
