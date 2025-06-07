import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  Avatar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { MenuItem } from "../../../../../shared/types/MenuItem";
import { menuItemService } from "../../../services/menuItem.service";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { menuCategoryService } from "../../../services/menuCategory.service";
import type { MenuCategory } from "../../../../../shared/types/MenuCategory";
import TypographyText from "../../../../../shared/TypographyText";

interface Props {
  items: MenuItem[];
  loadItems: () => void;
}

const ItemsTable: React.FC<Props> = ({ items, loadItems }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<MenuCategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await menuCategoryService.getAll();
        setCategories(res);
      } catch {
        enqueueSnackbar("שגיאה בטעינת הקטגוריות", { variant: "error" });
      }
    };
    fetchCategories();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await menuItemService.delete(id);
      enqueueSnackbar("המנה נמחקה בהצלחה", { variant: "success" });
      loadItems();
    } catch {
      enqueueSnackbar("שגיאה במחיקת מנה", { variant: "error" });
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/admin/items/edit/${id}`);
  };

  const getCategoryName = (categoryId: string): string => {
    return categories.find((c) => c.id === categoryId)?.name || "לא ידוע";
  };

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TypographyText>פריט</TypographyText>
            </TableCell>
            <TableCell>תיאור</TableCell>
            <TableCell>מחיר</TableCell>
            <TableCell>קטגוריה</TableCell>
            <TableCell>זמין?</TableCell>
            <TableCell align="right">פעולות</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar
                  src={item.imageUrl || "/no-image.png"}
                  alt={item.name}
                  sx={{ width: 40, height: 40, mr: 1 }}
                />
                <TypographyText>{item.name}</TypographyText>
              </TableCell>
              <TableCell>{item.description || "-"}</TableCell>
              <TableCell>{item.price.toFixed(2)} ₪</TableCell>
              <TableCell>{getCategoryName(item.categoryId)}</TableCell>
              <TableCell>{item.available ? "כן" : "לא"}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => handleEdit(item.id)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          {items.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} align="center">
                אין מנות להצגה
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ItemsTable;
