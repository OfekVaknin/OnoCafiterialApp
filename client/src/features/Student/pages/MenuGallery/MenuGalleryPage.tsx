import React from "react";
import Box from "@mui/material/Box";
import type { MenuItem } from "../../../../shared/types/MenuItem";
import TypographyText from "../../../../shared/TypographyText";
import MenuGalleryGrid from "../../components/MenuGallery/MenuGalleryGrid/MenuGalleryGrid";
import { menuItemService } from "../../../Admin/services/menuItem.service";


const MenuGalleryPage: React.FC = () => {
  const items: MenuItem[] = menuItemService.getAll().filter((i) => i.available);

  return (
    <Box sx={{ p: 3 }}>
      <TypographyText variant="title">תפריט המנות</TypographyText>
      <MenuGalleryGrid items={items} />
    </Box>
  );
};

export default MenuGalleryPage;
