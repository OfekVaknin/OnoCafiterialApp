export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  categoryId: string;
  available: boolean;
  preparingTimeInMin?: number; // ⏱️ Default prep time for this item
}
