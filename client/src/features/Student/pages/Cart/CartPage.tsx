import React from "react";
import { Box } from "@mui/material";
import TypographyText from "../../../../shared/TypographyText";
import { useCartStore } from "../../store/useCartStore";
import CartList from "../../components/Cart/CartList/CartList";
import CartSummary from "../../components/Cart/CartSummary/CartSummary";

const CartPage: React.FC = () => {
  const { items } = useCartStore();

  return (
    <Box sx={{ p: 3 }}>
      <TypographyText variant="title">סל קניות</TypographyText>

      {items.length === 0 ? (
        <TypographyText variant="body" align="center" sx={{ mt: 4 }}>
          הסל שלך ריק
        </TypographyText>
      ) : (
        <>
          <CartList />
          <CartSummary />
        </>
      )}
    </Box>
  );
};

export default CartPage;
