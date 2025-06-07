import type { OrderStatusEnum } from "../enums/OrderStatusEnum";
import type { OrderItem } from "./OrderItem";

export interface Order {
  _id?: string;
  id: string;
  userId: string;
  items: OrderItem[];
  status: OrderStatusEnum;
  total: number;
  createdAt: string;
  documentNumber?: number;
  updatedAt?: string;
  preparingTimeInMin?: number; // set manually
  readyAt?: string; // ISO string (calculated)
}
