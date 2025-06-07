import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { MenuItem } from "../../../../../shared/types/MenuItem";
import { menuItemService } from "../../../services/menuItem.service";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

interface Props {
  items: MenuItem[];
  loadItems: () => void;
}

const ItemsTable: React.FC<Props> = ({ items, loadItems }) => {
  const navigate = useNavigate();

  const handleDelete = (id: string) => {
    try {
      const success = menuItemService.delete(id);
      if (success) {
        enqueueSnackbar("המנה נמחקה בהצלחה", { variant: "success" });
        loadItems();
      } else {
        enqueueSnackbar("המחיקה נכשלה", { variant: "error" });
      }
    } catch {
      enqueueSnackbar("שגיאה במחיקת מנה", { variant: "error" });
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/admin/items/edit/${id}`);
  };

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>שם</TableCell>
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
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.description || "-"}</TableCell>
              <TableCell>{item.price.toFixed(2)} ₪</TableCell>
              <TableCell>{item.categoryId}</TableCell>
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
