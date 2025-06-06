import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { menuItemService } from "../../../services/menuItemService";
import type { MenuItem } from "../../../types/MenuItem";
import {
  Button,
  Table,
  type TableColumn,
} from "../../../../../shared/components";

import styles from "./MenuItemsTab.module.scss";

const DEFAULT_IMAGE = "/assets/no-image.png"; // adjust the path as needed

const MenuItemsTab: React.FC = () => {
  const { t } = useTranslation("manageMenu");
  const navigate = useNavigate();
  const [items, setItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    setItems(menuItemService.getAll());
  }, []);

  const handleDelete = (id: string) => {
    const confirm = window.confirm(t("items.confirmDelete"));
    if (confirm) {
      menuItemService.delete(id);
      setItems(menuItemService.getAll());
    }
  };

  const columns: TableColumn<MenuItem>[] = [
    {
      key: "image",
      label: "",
      render: (item) => (
        <img
          src={item.imageUrl || DEFAULT_IMAGE}
          alt={item.name}
          className={styles.thumbnail}
        />
      ),
    },
    { key: "name", label: t("items.columns.name") },
    { key: "description", label: t("items.columns.description") },
    { key: "price", label: t("items.columns.price") },
    { key: "createdAt", label: t("items.columns.createdAt") },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Button onClick={() => navigate("add")}>
          {t("items.actions.add")}
        </Button>
      </div>

      <Table
        columns={columns}
        data={items}
        rowKey={(item) => item.id}
        emptyMessage={t("items.empty")}
        actions={(row) => (
          <div className={styles.actions}>
            <Button
              variant="secondary"
              onClick={() => navigate(`edit/${row.id}`)}
            >
              {t("items.actions.edit")}
            </Button>
            <Button variant="secondary" onClick={() => handleDelete(row.id)}>
              {t("items.actions.delete")}
            </Button>
          </div>
        )}
      />
    </div>
  );
};

export default MenuItemsTab;
