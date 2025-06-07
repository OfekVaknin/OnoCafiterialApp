import React, { useState } from "react";
import { TextField, type TextFieldProps } from "@mui/material";

const BaseInput: React.FC<TextFieldProps> = ({
  required,
  onBlur,
  ...props
}) => {
  const [touched, setTouched] = useState(false);
  const value = (props.value ?? "").toString();

  const showError = required && touched && value.trim() === "";

  return (
    <TextField
      {...props}
      required={required}
      fullWidth
      variant="outlined"
      sx={{ mb: 2 }}
      error={showError || props.error}
      helperText={showError ? "שדה חובה" : props.helperText}
      onBlur={(e) => {
        setTouched(true);
        onBlur?.(e);
      }}
    />
  );
};

export default BaseInput;
