import React from 'react';
import { useCartStore } from './useCartStore';

export const CartItemCounter: React.FC = () => {
  const items = useCartStore(state => state.items);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  if (count === 0) return null;
  return (
    <span
      style={{
        position: 'absolute',
        top: -6,
        right: -6,
        background: '#e74c3c',
        color: '#fff',
        borderRadius: '50%',
        fontSize: '0.85rem',
        fontWeight: 700,
        minWidth: 22,
        height: 22,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 6px',
        zIndex: 10,
        boxShadow: '0 1px 4px rgba(0,0,0,0.12)'
      }}
      aria-label={`Cart items: ${count}`}
    >
      {count}
    </span>
  );
};
export default CartItemCounter;
