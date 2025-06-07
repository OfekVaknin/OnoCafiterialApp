import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { menuCategoryService } from "../../../services/menuCategory.service";
import type { MenuCategory } from "../../../../../shared/types/MenuCategory";
import BaseInput from "../../../../../shared/BaseInput";
import BaseButton from "../../../../../shared/BaseButton";
import { useSnackbar } from "notistack";

const AddOrUpdateCategoryPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        if (isEdit && id) {
          const existing = await menuCategoryService.getById(id);
          setName(existing.name);
          setDescription(existing.description || "");
        }
      } catch (error) {
        enqueueSnackbar("שגיאה בטעינת הקטגוריה", { variant: "error" });
      }
    };

    fetchCategory();
  }, [id, isEdit, enqueueSnackbar]);

  const handleSubmit = async () => {
    if (!name.trim()) {
      enqueueSnackbar("שם קטגוריה הוא שדה חובה", { variant: "error" });
      return;
    }

    try {
      if (isEdit && id) {
        await menuCategoryService.update(id, { name, description });
        enqueueSnackbar("הקטגוריה עודכנה בהצלחה", { variant: "success" });
      } else {
        await menuCategoryService.create({ name, description });
        enqueueSnackbar("הקטגוריה נוספה בהצלחה", { variant: "success" });
      }

      navigate("/admin/categories");
    } catch (err) {
      enqueueSnackbar("אירעה שגיאה בעת השמירה", { variant: "error" });
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        {isEdit ? "עריכת קטגוריה" : "הוספת קטגוריה"}
      </Typography>

      <BaseInput
        label="שם קטגוריה"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <BaseInput
        label="תיאור (לא חובה)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
      />

      <BaseButton sx={{ mt: 2 }} onClick={handleSubmit}>
        {isEdit ? "שמור שינויים" : "הוסף קטגוריה"}
      </BaseButton>
      <BaseButton
        sx={{ mt: 2, ml: 2 }}
        variant="outlined"
        onClick={() => navigate(-1)}
      >
        ביטול
      </BaseButton>
    </div>
  );
};

export default AddOrUpdateCategoryPage;
