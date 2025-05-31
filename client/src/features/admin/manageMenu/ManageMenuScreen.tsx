import React from 'react';
import { useTranslation } from 'react-i18next';
import { CategorySection } from './CategorySection';
import { MenuItemSection } from './MenuItemSection';

import '../../layout/layout.scss';

const ManageMenuScreen = () => {
  const { t } = useTranslation();
  return (
    <div className="main-content">
      <h2>{t('manageMenu')}</h2>
      <CategorySection />
      <MenuItemSection />
    </div>
  );
};

export default ManageMenuScreen;
