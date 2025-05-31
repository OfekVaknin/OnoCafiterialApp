import React from 'react';
import { useTranslation } from 'react-i18next';
import MenuGallery from './MenuGallery';

const MenuScreen = () => {
  const { t } = useTranslation();
  return (
    <div className="main-content" style={{ maxWidth: 1400, width: '100%', margin: '0 auto', background: 'none', boxShadow: 'none', padding: 0 }}>
      <h2 style={{ textAlign: 'center', margin: '2rem 0 1rem 0' }}>{t('menu')}</h2>
      <MenuGallery />
    </div>
  );
};

export default MenuScreen;
