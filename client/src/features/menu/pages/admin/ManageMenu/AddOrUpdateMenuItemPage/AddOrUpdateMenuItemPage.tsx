import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { v4 as uuid } from "uuid";

import styles from "./AddOrUpdateMenuItemPage.module.scss";
import type { MenuItem } from "../../../../types/MenuItem";
import { menuCategoryService } from "../../../../services/menuCategoryService";
import { menuItemService } from "../../../../services/menuItemService";
import { Button, Input, Select } from "../../../../../../shared/components";
import { createEmptyMenuItem } from "../../../../utils/factories";

const AddOrUpdateMenuItemPage: React.FC = () => {
  const { t } = useTranslation("manageMenu");
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const isEdit = !!id;

  const [form, setForm] = useState<Partial<MenuItem>>(createEmptyMenuItem());

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [categories, setCategories] = useState<
    { label: string; value: string }[]
  >([]);

  useEffect(() => {
    const cats = menuCategoryService.getAll();
    setCategories(cats.map((c) => ({ label: c.name, value: c.id })));

    if (isEdit) {
      const item = menuItemService.getById(id!);
      if (item) {
        setForm(item);
      } else {
        navigate("/manage-menu/items");
      }
    }
  }, [id, isEdit, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name?.trim())
      newErrors.name = t("items.addOrUpdate.form.errors.required");
    if (!form.price || isNaN(+form.price))
      newErrors.price = t("items.addOrUpdate.form.errors.required");
    if (!form.categoryId)
      newErrors.categoryId = t("items.addOrUpdate.form.errors.required");
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
      menuItemService.update(id!, form as MenuItem);
    } else {
      const newItem: MenuItem = {
        id: uuid(),
        name: form.name!,
        description: form.description || "",
        price: +form.price!,
        categoryId: form.categoryId!,
        available: form.available ?? true,
        imageUrl: form.imageUrl || "",
      };
      menuItemService.create(newItem);
    }

    navigate("/manage-menu/items");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {isEdit
          ? t("items.addOrUpdate.form.editTitle")
          : t("items.addOrUpdate.form.addTitle")}
      </h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          name="name"
          label={t("items.addOrUpdate.form.fields.name")}
          value={form.name || ""}
          onChange={handleChange}
          error={errors.name}
        />

        <Input
          name="description"
          label={t("items.addOrUpdate.form.fields.description")}
          value={form.description || ""}
          onChange={handleChange}
        />

        <Input
          name="price"
          label={t("items.addOrUpdate.form.fields.price")}
          value={form.price?.toString() || ""}
          type="number"
          onChange={handleChange}
          error={errors.price}
        />

        <Select
          name="categoryId"
          label={t("items.addOrUpdate.form.fields.category")}
          value={form.categoryId || ""}
          onChange={handleChange}
          options={categories}
          error={errors.categoryId}
          placeholder={t("items.addOrUpdate.form.fields.category")}
        />

        <label className={styles.checkbox}>
          <input
            type="checkbox"
            name="available"
            checked={form.available ?? true}
            onChange={handleChange}
          />
          {t("items.addOrUpdate.form.fields.available")}
        </label>

        {form.imageUrl && (
          <img
            src={form.imageUrl}
            alt="preview"
            className={styles.imagePreview}
          />
        )}

        <div className={styles.actions}>
          <Button type="submit">
            {isEdit
              ? t("items.addOrUpdate.form.actions.save")
              : t("items.addOrUpdate.form.actions.create")}
          </Button>
          <Button
            variant="secondary"
            type="button"
            onClick={() => navigate(-1)}
          >
            {t("items.addOrUpdate.form.actions.cancel")}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddOrUpdateMenuItemPage;
