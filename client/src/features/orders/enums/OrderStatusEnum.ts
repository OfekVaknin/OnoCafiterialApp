export const OrderStatusEnum = {
  Pending: 'pending',
  Preparing: 'preparing',
  Ready: 'ready',
  Completed: 'completed',
  Cancelled: 'cancelled',
} as const;

export type OrderStatusEnum = typeof OrderStatusEnum[keyof typeof OrderStatusEnum];
