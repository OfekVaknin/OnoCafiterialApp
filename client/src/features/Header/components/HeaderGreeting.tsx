// components/Header/HeaderGreeting.tsx
import React from "react";
import { Typography } from "@mui/material";
import { useAuthStore } from "../../Auth/store/useAuthStore";

const HeaderGreeting = () => {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <Typography variant="body1" sx={{ ml: 2 }}>
      שלום {user.name}
    </Typography>
  );
};

export default HeaderGreeting;
