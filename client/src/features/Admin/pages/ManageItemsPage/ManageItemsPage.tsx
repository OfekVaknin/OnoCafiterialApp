import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useSnackbar } from "notistack";
import type { MenuItem } from "../../../../shared/types/MenuItem";
import { menuItemService } from "../../services/menuItem.service";
import BaseButton from "../../../../shared/BaseButton";
import ItemsTable from "../../components/items/ItemsTable/ItemsTable";

const ManageItemsPage: React.FC = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const loadItems = async () => {
    const itemsData = await menuItemService.getAll();
    setItems(itemsData);
  };

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        ניהול מנות
      </Typography>

      <BaseButton sx={{ mb: 2 }} onClick={() => navigate("/admin/items/add")}>
        הוסף מנה חדשה
      </BaseButton>

      <ItemsTable items={items} loadItems={loadItems} />
    </div>
  );
};

export default ManageItemsPage;
