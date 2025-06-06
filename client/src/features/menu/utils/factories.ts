import type { MenuCategory } from "../types/MenuCategory";
import type { MenuItem } from "../types/MenuItem";

export function createEmptyMenuCategory(): Partial<MenuCategory> {
  return {
    name: "",
    description: "",
  };
}

export function createEmptyMenuItem(): Partial<MenuItem> {
  return {
    name: "",
    description: "",
    price: 0,
    imageUrl: "",
    categoryId: "",
    available: true
  };
}