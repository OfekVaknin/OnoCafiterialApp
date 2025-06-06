import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import styles from "./AddOrUpdateCategoryPage.module.scss";
import { v4 as uuid } from "uuid";
import { menuCategoryService } from "../../../../services/menuCategoryService";
import type { MenuCategory } from "../../../../types/MenuCategory";
import { Button, Input } from "../../../../../../shared/components";
import { createEmptyMenuCategory } from "../../../../utils/factories";

const AddOrUpdateCategoryPage: React.FC = () => {
  const { t } = useTranslation("manageMenu");
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();

  const isEdit = !!id;

  const [form, setForm] = useState<Partial<MenuCategory>>(
    createEmptyMenuCategory()
  );

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (isEdit) {
      const category = menuCategoryService.getById(id!);
      if (category) {
        setForm({ name: category.name, description: category.description });
      } else {
        navigate("/manage-menu/categories"); // fallback if ID not found
      }
    }
  }, [id, isEdit, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name?.trim()) newErrors.name = t("categories.addOrUpdate.form.errors.required");
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (isEdit) {
      menuCategoryService.update(id!, { ...form });
    } else {
      const newCategory: MenuCategory = {
        id: uuid(),
        name: form.name!,
        description: form.description,
        createdAt: new Date().toISOString(),
      };
      menuCategoryService.create(newCategory);
    }

    navigate("/manage-menu/categories");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {isEdit ? t("categories.addOrUpdate.form.editTitle") : t("categories.addOrUpdate.form.addTitle")}
      </h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          name="name"
          label={t("categories.addOrUpdate.form.fields.name")}
          value={form.name || ""}
          onChange={handleChange}
          error={errors.name}
        />

        <Input
          name="description"
          label={t("categories.addOrUpdate.form.fields.description")}
          value={form.description || ""}
          onChange={handleChange}
        />

        <div className={styles.actions}>
          <Button type="submit">
            {isEdit ? t("categories.addOrUpdate.form.actions.save") : t("categories.addOrUpdate.form.actions.create")}
          </Button>
          <Button
            variant="secondary"
            type="button"
            onClick={() => navigate(-1)}
          >
            {t("categories.addOrUpdate.form.actions.cancel")}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddOrUpdateCategoryPage;
