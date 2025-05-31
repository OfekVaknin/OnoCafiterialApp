import React from 'react';
import { useTranslation } from 'react-i18next';
import { menuItemService } from './services/menuItemService';
import type { MenuItem } from './types/MenuItem';
import styles from './MenuGallery.module.scss';
import { useCartStore } from './useCartStore';
import type { CartItem } from './useCartStore';
import { Button } from '../../shared/components/Button/Button';

const DEFAULT_IMAGE = 'https://via.placeholder.com/120?text=No+Image';

export const MenuGallery: React.FC = () => {
  const { t } = useTranslation();
  const items = menuItemService.getAll() as import('./types/MenuItem').MenuItem[];
  const cartItems = useCartStore((state: { items: CartItem[] }) => state.items);
  const addToCart = useCartStore((state: { addToCart: (item: MenuItem) => void }) => state.addToCart);
  const removeFromCart = useCartStore((state: { removeFromCart: (id: string) => void }) => state.removeFromCart);

  return (
    <div className={styles.gallery}>
      {items.map((item) => {
        const cartItem = cartItems.find((ci: CartItem) => ci.id === item.id);
        const quantity = cartItem?.quantity || 0;
        return (
          <div
            key={item.id}
            className={
              item.available ? styles.card : `${styles.card} ${styles.unavailable}`
            }
          >
            {!item.available && (
              <span className={styles.unavailableLabel}>{t('unavailable') || 'Unavailable'}</span>
            )}
            <img
              src={item.imageUrl || DEFAULT_IMAGE}
              alt={item.name}
              className={styles.cardImage}
              loading="lazy"
            />
            <div className={styles.cardTitle}>{item.name}</div>
            <div className={styles.cardDesc}>{item.description}</div>
            <div className={styles.cardPrice}>{item.price} ₪</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Button
                className={styles.addBtn}
                onClick={() => removeFromCart(item.id)}
                disabled={!item.available || quantity === 0}
                aria-label={t('removeFromCart') || 'Remove from Cart'}
                style={{ minWidth: 36 }}
              >
                -
              </Button>
              <span style={{ minWidth: 24, textAlign: 'center', fontWeight: 500 }}>{quantity}</span>
              <Button
                className={styles.addBtn}
                onClick={() => addToCart(item)}
                disabled={!item.available}
                aria-label={t('addToCart') || 'Add to Cart'}
                style={{ minWidth: 36 }}
              >
                +
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MenuGallery;
