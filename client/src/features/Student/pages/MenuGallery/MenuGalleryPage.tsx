import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import type { MenuItem } from "../../../../shared/types/MenuItem";
import MenuGalleryGrid from "../../components/MenuGallery/MenuGalleryGrid/MenuGalleryGrid";
import { menuItemService } from "../../../Admin/services/menuItem.service";
import TypographyText from "../../../../shared/components/TypographyText";

const MenuGalleryPage: React.FC = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const all = await menuItemService.getAll();
        const availableOnly = all.filter((i) => i.available);
        setItems(availableOnly);
      } catch (err) {
        console.error("Failed to fetch menu items", err);
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <TypographyText variant="title">תפריט המנות</TypographyText>
      {loading ? (
        <TypographyText>טוען מנות...</TypographyText>
      ) : (
        <MenuGalleryGrid items={items} />
      )}
    </Box>
  );
};

export default MenuGalleryPage;
