import type { MenuCategory } from "../../../shared/types/MenuCategory";

const STORAGE_KEY = 'menuCategories';

function getAll(): MenuCategory[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function getById(id: string): MenuCategory | undefined {
  return getAll().find(c => c.id === id);
}

function create(category: MenuCategory): MenuCategory {
  const categories = getAll();
  if (categories.some(c => c.id === category.id)) throw new Error('Category already exists');
  categories.push(category);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
  return category;
}

function update(id: string, updates: Partial<MenuCategory>): MenuCategory | undefined {
  const categories = getAll();
  const idx = categories.findIndex(c => c.id === id);
  if (idx === -1) throw new Error('Category not found');
  categories[idx] = { ...categories[idx], ...updates };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
  return categories[idx];
}

function remove(id: string): boolean {
  const categories = getAll();
  const filtered = categories.filter(c => c.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return categories.length !== filtered.length;
}

export const menuCategoryService = { getAll, getById, create, update, delete: remove };
