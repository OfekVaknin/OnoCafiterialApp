import React from "react";
import { Typography, type TypographyProps } from "@mui/material";

interface Props extends Omit<TypographyProps, "variant"> {
  children: React.ReactNode;
  variant?: "title" | "subtitle" | "body" | "caption";
}

const TypographyText: React.FC<Props> = ({
  children,
  variant = "body",
  align = "right",
  ...rest
}) => {
  let muiVariant: TypographyProps["variant"];
  let fontWeight: number;

  switch (variant) {
    case "title":
      muiVariant = "h4";
      fontWeight = 700;
      break;
    case "subtitle":
      muiVariant = "h6";
      fontWeight = 500;
      break;
    case "caption":
      muiVariant = "caption";
      fontWeight = 400;
      break;
    default:
      muiVariant = "body1";
      fontWeight = 400;
      break;
  }

  return (
    <Typography
      variant={muiVariant}
      fontWeight={fontWeight}
      textAlign={align}
      {...rest}
    >
      {children}
    </Typography>
  );
};

export default TypographyText;
