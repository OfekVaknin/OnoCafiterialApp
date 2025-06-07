import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import {
  Checkbox,
  FormControlLabel,
  MenuItem as MuiMenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
} from "@mui/material";
import { useSnackbar } from "notistack";

import { menuItemService } from "../../../services/menuItem.service";
import { menuCategoryService } from "../../../services/menuCategory.service";
import type { MenuItem } from "../../../../../shared/types/MenuItem";
import type { MenuCategory } from "../../../../../shared/types/MenuCategory";
import BaseInput from "../../../../../shared/BaseInput";
import BaseButton from "../../../../../shared/BaseButton";

const AddOrUpdateItemPage: React.FC = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [available, setAvailable] = useState(true);
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [preparingTime, setPreparingTime] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      await setCategoriesdata();

      if (isEdit && id) {
        try {
          const item = await menuItemService.getById(id);
          setName(item.name);
          setDescription(item.description || "");
          setPrice(item.price.toString());
          setImageUrl(item.imageUrl || "");
          setCategoryId(item.categoryId);
          setAvailable(item.available);
          setPreparingTime(item.preparingTimeInMin || 10);
        } catch {
          enqueueSnackbar("שגיאה בטעינת פרטי המנה", { variant: "error" });
          navigate("/admin/items");
        }
      }
    };

    fetchData();
  }, [id]);

  const setCategoriesdata = async () => {
    const categoriesData = await menuCategoryService.getAll();
    setCategories(categoriesData);
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      enqueueSnackbar("שם מנה הוא שדה חובה", { variant: "error" });
      return;
    }

    if (!price || isNaN(Number(price))) {
      enqueueSnackbar("יש להזין מחיר תקין", { variant: "error" });
      return;
    }

    if (!categoryId) {
      enqueueSnackbar("יש לבחור קטגוריה", { variant: "error" });
      return;
    }

    const newItem: MenuItem = {
      id: id || crypto.randomUUID(),
      name: name.trim(),
      description: description.trim(),
      price: parseFloat(price),
      imageUrl: imageUrl.trim(),
      categoryId,
      available,
      preparingTimeInMin: preparingTime,
    };

    try {
      if (isEdit) {
        await menuItemService.update(newItem.id, newItem);
        enqueueSnackbar("המנה עודכנה בהצלחה", { variant: "success" });
      } else {
        await menuItemService.create(newItem);
        enqueueSnackbar("המנה נוספה בהצלחה", { variant: "success" });
      }

      navigate("/admin/items");
    } catch {
      enqueueSnackbar("אירעה שגיאה בעת השמירה", { variant: "error" });
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
      <Typography variant="h4" gutterBottom>
        {isEdit ? "עריכת מנה" : "הוספת מנה"}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          alignItems: "flex-start",
        }}
      >
        <Box sx={{ flex: "1 1 300px", minWidth: 280 }}>
          <BaseInput
            label="שם מנה"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Box>

        <Box sx={{ flex: "1 1 300px", minWidth: 280 }}>
          <BaseInput
            label="מחיר"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </Box>

        <Box sx={{ flex: "1 1 300px", minWidth: 280 }}>
          <BaseInput
            label="תיאור (לא חובה)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
          />
        </Box>

        <Box sx={{ flex: "1 1 300px", minWidth: 280 }}>
          <BaseInput
            label="זמן הכנה בדקות (אופציונלי)"
            type="number"
            value={preparingTime}
            onChange={(e) => setPreparingTime(Number(e.target.value))}
          />
        </Box>

        <Box sx={{ flex: "1 1 300px", minWidth: 280 }}>
          <BaseInput
            label="קישור לתמונה (לא חובה)"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </Box>

        <Box sx={{ flex: "1 1 300px", minWidth: 280 }}>
          <FormControl fullWidth>
            <InputLabel id="category-label">קטגוריה</InputLabel>
            <Select
              labelId="category-label"
              value={categoryId}
              label="קטגוריה"
              onChange={(e) => setCategoryId(e.target.value)}
              required
            >
              {categories.map((cat) => (
                <MuiMenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MuiMenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ flex: "1 1 300px", minWidth: 280, mt: 1 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={available}
                onChange={(e) => setAvailable(e.target.checked)}
              />
            }
            label="זמין"
          />
        </Box>
      </Box>

      <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
        <BaseButton onClick={handleSubmit}>
          {isEdit ? "שמור שינויים" : "הוסף מנה"}
        </BaseButton>
        <BaseButton variant="outlined" onClick={() => navigate(-1)}>
          ביטול
        </BaseButton>
      </Box>
    </Box>
  );
};

export default AddOrUpdateItemPage;
