import React from "react";
import { Card, CardContent, CardMedia, Box } from "@mui/material";
import type { MenuItem } from "../../../../../shared/types/MenuItem";
import TypographyText from "../../../../../shared/TypographyText";
import BaseButton from "../../../../../shared/BaseButton";
import { useCartStore } from "../../../store/useCartStore";
interface Props {
  item: MenuItem;
}

const MenuItemCard: React.FC<Props> = ({ item }) => {
  const { addToCart } = useCartStore();

  return (
    <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="180"
        image={item.imageUrl || "/assets/placeholder.jpg"}
        alt={item.name}
        sx={{ objectFit: "cover" }}
      />
      <CardContent>
        <TypographyText variant="subtitle">{item.name}</TypographyText>
        <TypographyText variant="body" align="right" style={{ marginTop: 8 }}>
          {item.description || "אין תיאור למנה זו."}
        </TypographyText>
        <TypographyText
          variant="body"
          align="right"
          style={{ fontWeight: 700, marginTop: 8 }}
        >
          ₪ {item.price.toFixed(2)}
        </TypographyText>
        <Box display="flex" justifyContent="center" mt={2}>
          <BaseButton
            onClick={() => {
              addToCart(item);
            }}
            size="small"
          >
            הוסף להזמנה
          </BaseButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MenuItemCard;
