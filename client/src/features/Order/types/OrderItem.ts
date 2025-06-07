export interface OrderItem {
  _id?: string;
  id: string;
  orderId: string;
  menuItemId: string;
  quantity: number;
  price: number;
}
