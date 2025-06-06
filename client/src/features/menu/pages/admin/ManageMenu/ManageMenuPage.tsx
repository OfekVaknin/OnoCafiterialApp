// pages/admin/ManageMenuPage.tsx
import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import styles from "./ManageMenuPage.module.scss";
import { useTranslation } from "react-i18next";

const ManageMenuPage: React.FC = () => {
  const { t } = useTranslation("manageMenu"); // namespace
  const location = useLocation();

  const isActiveTab = (path: string) => location.pathname.endsWith(path);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t("title")}</h1>

      <div className={styles.tabs}>
        <NavLink
          to="items"
          className={`${styles.tab} ${
            isActiveTab("items") ? styles.active : ""
          }`}
        >
          {t("tabs.items")}
        </NavLink>
        <NavLink
          to="categories"
          className={`${styles.tab} ${
            isActiveTab("categories") ? styles.active : ""
          }`}
        >
          {t("tabs.categories")}
        </NavLink>
      </div>

      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default ManageMenuPage;
