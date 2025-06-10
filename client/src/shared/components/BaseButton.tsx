import React from "react";
import { Button, type ButtonProps } from "@mui/material";

const BaseButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      sx={{
        borderRadius: 0,
        fontWeight: 600,
        textTransform: "none",
        px: 3,
        py: 1,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default BaseButton;
