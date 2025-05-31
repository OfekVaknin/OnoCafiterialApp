import React from 'react';
import { useTranslation } from 'react-i18next';
import { useCartStore } from './useCartStore';
import styles from './MenuGallery.module.scss';
import { orderService } from '../../features/orders/services/orderService';
import { OrderStatusEnum } from '../../features/orders/enums/OrderStatusEnum';
import { useNavigate } from 'react-router-dom';
import { Table } from '../../shared/components/Table/Table';
import { menuItemService } from './services/menuItemService';
import type { MenuItem } from './types/MenuItem';
import { Button } from '../../shared/components/Button/Button';
import { authService } from '../../features/auth/services/authService';

const CartScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const items = useCartStore(state => state.items);
  const addToCart = useCartStore(state => state.addToCart);
  const removeFromCart = useCartStore(state => state.removeFromCart);
  const clearCart = useCartStore(state => state.clearCart);
  const [orderPlaced, setOrderPlaced] = React.useState(false);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCompleteOrder = () => {
    if (items.length === 0) return;
    const userId = authService.getCurrentUser()?.id || 'guest';
    const order = {
      id: crypto.randomUUID(),
      userId,
      items: items.map(item => ({
        id: crypto.randomUUID(),
        orderId: '', // will be set in backend, here for type
        menuItemId: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
      status: OrderStatusEnum.Pending,
      total,
      createdAt: new Date().toISOString(),
      // documentNumber will be set by orderService
    };
    orderService.create(order);
    clearCart();
    setOrderPlaced(true);
    setTimeout(() => navigate('/orders'), 1500);
  };

  if (orderPlaced) {
    return (
      <div className="main-content" style={{ textAlign: 'center', marginTop: 40 }}>
        <h2>{t('orderConfirmed') || 'Order Confirmed!'}</h2>
        <p>{t('orderConfirmationMsg') || 'Thank you for your order.'}</p>
      </div>
    );
  }

  return (
    <div className="main-content" style={{ maxWidth: 600, margin: '0 auto', padding: '2rem 0' }}>
      <h2>{t('cart') || 'Cart'}</h2>
      <Table
        columns={[
          {
            key: 'imageUrl',
            label: t('image'),
            render: item => (
              <img
                src={item.imageUrl || 'https://via.placeholder.com/60?text=No+Image'}
                alt={item.name}
                style={{ width: 48, height: 48, borderRadius: 8, objectFit: 'cover', background: '#f3f3f3', border: '1px solid #e3e8ee' }}
              />
            ),
            className: 'item-image-cell',
          },
          { key: 'name', label: t('name') },
          { key: 'price', label: t('price'), render: item => `${item.price} ₪` },
          {
            key: 'quantity',
            label: t('quantity'),
            render: item => {
              const menuItem: MenuItem | undefined = menuItemService.getById(item.id);
              const menuItemForAdd: MenuItem = menuItem || {
                id: item.id,
                name: item.name,
                price: item.price,
                imageUrl: item.imageUrl,
                categoryId: '',
                available: true,
              };
              return (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Button
                    className={styles.addBtn}
                    onClick={() => removeFromCart(item.id)}
                    aria-label={t('removeFromCart') || 'Remove'}
                    disabled={item.quantity === 0}
                    style={{ minWidth: 32 }}
                  >
                    -
                  </Button>
                  <span style={{ minWidth: 24, textAlign: 'center', fontWeight: 500 }}>{item.quantity}</span>
                  <Button
                    className={styles.addBtn}
                    onClick={() => addToCart(menuItemForAdd)}
                    aria-label={t('addToCart') || 'Add'}
                    style={{ minWidth: 32 }}
                  >
                    +
                  </Button>
                </div>
              );
            },
          },
        ]}
        data={items}
        rowKey={item => item.id}
        emptyMessage={t('cartEmpty') || 'Your cart is empty.'}
      />
      <div style={{ fontWeight: 600, fontSize: 18, margin: '1rem 0' }}>{t('total') || 'Total'}: {total} ₪</div>
      <Button
        className={styles.addBtn}
        style={{ width: '100%', fontSize: 18, padding: '0.75rem 0' }}
        onClick={handleCompleteOrder}
        disabled={items.length === 0}
        aria-label={t('completeOrder') || 'Complete Order'}
      >
        {t('completeOrder') || 'Complete Order'}
      </Button>
    </div>
  );
};

export default CartScreen;
