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
import { useSnackbar } from "notistack";
import type { MenuCategory } from "../../../../../shared/types/MenuCategory";

interface Props {
  categories: MenuCategory[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const CategoriesTable: React.FC<Props> = ({ categories, onEdit, onDelete }) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = (id: string) => {
    try {
      onDelete(id);
      enqueueSnackbar("הקטגוריה נמחקה בהצלחה", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("שגיאה בעת מחיקת הקטגוריה", { variant: "error" });
    }
  };

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>שם</TableCell>
            <TableCell>תיאור</TableCell>
            <TableCell>נוצר בתאריך</TableCell>
            <TableCell align="right">פעולות</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((cat) => (
            <TableRow key={cat.id}>
              <TableCell>{cat.name}</TableCell>
              <TableCell>{cat.description || "-"}</TableCell>
              <TableCell>
                {new Date(cat.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell align="right">
                <IconButton onClick={() => onEdit(cat.id)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(cat.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CategoriesTable;
