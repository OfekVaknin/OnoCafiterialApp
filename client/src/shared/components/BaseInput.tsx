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
      variant="filled"
      sx={{
        mb: 2,
        "& .MuiInputBase-input": {
          textAlign: "right",
          paddingRight: "14px",
          direction: "rtl",
        },
        "& .MuiInputBase-input::placeholder": {
          textAlign: "right",
          opacity: 1,
          paddingRight: "0px",
        },
        "& .MuiOutlinedInput-root": {
          "& input": {
            textAlign: "right",
            direction: "rtl",
          },
        },
        ...props.sx,
      }}
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
