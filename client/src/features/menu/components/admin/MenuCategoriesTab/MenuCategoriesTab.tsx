import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { menuCategoryService } from "../../../services/menuCategoryService";
import type { MenuCategory } from "../../../types/MenuCategory";
import { Button, Table, type TableColumn } from "../../../../../shared/components";

import styles from './MenuCategoriesTab.module.scss';

const MenuCategoriesTab: React.FC = () => {
  const { t } = useTranslation("manageMenu");
  const navigate = useNavigate();
  const [categories, setCategories] = useState<MenuCategory[]>([]);

  useEffect(() => {
    setCategories(menuCategoryService.getAll());
  }, []);

  const handleDelete = (id: string) => {
    const confirm = window.confirm(t("categories.confirmDelete"));
    if (confirm) {
      menuCategoryService.delete(id);
      setCategories(menuCategoryService.getAll());
    }
  };

  const columns: TableColumn<MenuCategory>[] = [
    { key: "name", label: t("categories.columns.name") },
    { key: "description", label: t("categories.columns.description") },
    { key: "createdAt", label: t("categories.columns.createdAt") },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Button onClick={() => navigate("add")}>
          {t("categories.actions.add")}
        </Button>
      </div>

      <Table
        columns={columns}
        data={categories}
        rowKey={(cat) => cat.id}
        emptyMessage={t("categories.empty")}
        actions={(row) => (
          <div className={styles.actions}>
            <Button
              variant="secondary"
              onClick={() => navigate(`edit/${row.id}`)}
            >
              {t("categories.actions.edit")}
            </Button>
            <Button variant="secondary" onClick={() => handleDelete(row.id)}>
              {t("categories.actions.delete")}
            </Button>
          </div>
        )}
      />
    </div>
  );
};

export default MenuCategoriesTab;
