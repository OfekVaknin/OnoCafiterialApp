// components/Header/HeaderCartButton.tsx
import React from "react";
import { IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../Auth/store/useAuthStore";
import { USER_ROLE } from "../../Auth/enums/UserRole.enum";
import { useCartStore } from "../../Student/store/useCartStore";

const HeaderCartButton = () => {
  const { user } = useAuthStore();
  const role = user?.role ?? null;
  const navigate = useNavigate();
  const cartItems = useCartStore((state) => state.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  if (role !== USER_ROLE.Student) return null;

  return (
    <IconButton color="inherit" onClick={() => navigate("/cart")}>
      <Badge badgeContent={cartCount} color="error">
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  );
};

export default HeaderCartButton;
