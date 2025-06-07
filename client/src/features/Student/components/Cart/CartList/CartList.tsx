import React from "react";
import { Box, Divider } from "@mui/material";
import CartItemCard from "../CartItemCard/CartItemCard";
import { useCartStore } from "../../../store/useCartStore";

const CartList: React.FC = () => {
  const { items } = useCartStore();

  return (
    <Box sx={{ mt: 3 }}>
      {items.map((item) => (
        <Box key={item.id} sx={{ mb: 2 }}>
          <CartItemCard item={item} />
          <Divider sx={{ mt: 2 }} />
        </Box>
      ))}
    </Box>
  );
};

export default CartList;
