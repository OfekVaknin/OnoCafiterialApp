import React from "react";
import { Box, IconButton, Card, CardMedia } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import type { CartItem } from "../../../types/CartItem";
import { useCartStore } from "../../../store/useCartStore";
import TypographyText from "../../../../../shared/TypographyText";

interface Props {
  item: CartItem;
}

const CartItemCard: React.FC<Props> = ({ item }) => {
  const { addToCart, removeFromCart } = useCartStore();

  return (
    <Card sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}>
      <CardMedia
        component="img"
        height="80"
        sx={{ width: 80, objectFit: "cover", borderRadius: 2 }}
        image={item.imageUrl || "/assets/placeholder.jpg"}
        alt={item.name}
      />

      <Box flex={1}>
        <TypographyText variant="subtitle">{item.name}</TypographyText>
        <TypographyText variant="caption">
          ₪ {item.price.toFixed(2)}
        </TypographyText>
      </Box>

      <Box display="flex" alignItems="center" gap={1}>
        <IconButton onClick={() => removeFromCart(item.id)}>
          <RemoveIcon />
        </IconButton>
        <TypographyText variant="body">{item.quantity}</TypographyText>
        <IconButton
          onClick={() =>
            addToCart({
              id: item.id,
              name: item.name,
              price: item.price,
              imageUrl: item.imageUrl,
              categoryId: "", // fallback if not needed
              available: true, // assume it's still available
            })
          }
        >
          <AddIcon />
        </IconButton>
      </Box>

      <TypographyText variant="subtitle">
        ₪ {(item.quantity * item.price).toFixed(2)}
      </TypographyText>
    </Card>
  );
};

export default CartItemCard;
