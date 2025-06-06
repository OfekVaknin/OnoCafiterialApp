import type { OrderItem } from "./OrderItem";
import { OrderStatusEnum } from "../enums/OrderStatusEnum";

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  status: OrderStatusEnum;
  total: number;
  createdAt: string;
  documentNumber?: number;
}
