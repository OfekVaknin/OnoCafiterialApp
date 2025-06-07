import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import BaseButton from "../../../../shared/BaseButton";
import { useNavigate } from "react-router-dom";
import type { MenuCategory } from "../../../../shared/types/MenuCategory";
import { menuCategoryService } from "../../services/menuCategory.service";
import CategoriesTable from "../../components/categories/CategoriesTable/CategoriesTable";

const ManageCategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const navigate = useNavigate();

  const loadCategories = async () => {
    const categoriesData = await menuCategoryService.getAll();
    setCategories(categoriesData);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleDelete = async (id: string) => {
    await menuCategoryService.delete(id);
    loadCategories();
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        ניהול קטגוריות
      </Typography>

      <BaseButton
        sx={{ mb: 2 }}
        onClick={() => navigate("/admin/categories/add")}
      >
        הוסף קטגוריה
      </BaseButton>

      <CategoriesTable
        categories={categories}
        onEdit={(id) => navigate(`/admin/categories/edit/${id}`)}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ManageCategoriesPage;
