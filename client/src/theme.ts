import { createTheme } from "@mui/material/styles";
import { heIL } from "@mui/material/locale";

const theme = createTheme(
  {
    direction: "rtl",
    shape: {
      borderRadius: 0,
    },
    palette: {
      primary: {
        main: "#B3D135",
        contrastText: "#000000",
      },
    },
    typography: {
      fontFamily: `"Arial", "Segoe UI", "Helvetica", "sans-serif"`,
    },
    components: {
      MuiTextField: {
        defaultProps: {
          inputProps: { 
            dir: "rtl",
            style: { textAlign: "right" }
          },
          InputLabelProps: { 
            style: { 
              right: 14,
              left: "auto",
              transformOrigin: "top right"
            }
          },
        },
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                textAlign: "right",
              },
              "&.Mui-focused fieldset": {
                textAlign: "right",
              },
            },
            "& .MuiInputLabel-outlined": {
              right: 14,
              left: "auto",
              transformOrigin: "top right",
              "&.MuiInputLabel-shrink": {
                transform: "translate(-14px, -9px) scale(0.75)",
              },
            },
          },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            textAlign: "right",
            marginRight: 14,
            marginLeft: 0,
          },
        },
      },
    },
  },
  heIL
);

export default theme;