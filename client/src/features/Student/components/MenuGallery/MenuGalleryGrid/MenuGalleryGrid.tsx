import React from "react";
import Box from "@mui/material/Box";
import type { MenuItem } from "../../../../../shared/types/MenuItem";
import MenuItemCard from "../MenuItemCard/MenuItemCard";

interface Props {
  items: MenuItem[];
}

const MenuGalleryGrid: React.FC<Props> = ({ items }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        },
        gap: 3,
      }}
    >
      {items.map((item) => (
        <MenuItemCard key={item.id} item={item} />
      ))}
    </Box>
  );
};

export default MenuGalleryGrid;
