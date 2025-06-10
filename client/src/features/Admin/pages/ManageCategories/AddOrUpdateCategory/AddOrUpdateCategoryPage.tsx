import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { menuCategoryService } from "../../../services/menuCategory.service";
import type { MenuCategory } from "../../../../../shared/types/MenuCategory";
import { useSnackbar } from "notistack";
import BaseInput from "../../../../../shared/components/BaseInput";
import BaseButton from "../../../../../shared/components/BaseButton";

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
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 4,
        px: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
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
        rows={3}
      />

      <Box display="flex" justifyContent="center" gap={2} mt={2}>
        <BaseButton onClick={handleSubmit}>
          {isEdit ? "שמור שינויים" : "הוסף קטגוריה"}
        </BaseButton>
        <BaseButton variant="outlined" onClick={() => navigate(-1)}>
          ביטול
        </BaseButton>
      </Box>
    </Box>
  );
};

export default AddOrUpdateCategoryPage;
