import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import CartItemCounter from './CartItemCounter';

export const CartIcon: React.FC = () => (
  <div style={{ position: 'relative', display: 'inline-block' }}>
    <FontAwesomeIcon icon={faShoppingCart} size="lg" color="#fff" />
    <CartItemCounter />
  </div>
);

export default CartIcon;
