import { createTheme } from "@mui/material/styles";
import { heIL } from "@mui/material/locale";

const theme = createTheme(
  {
    direction: "rtl",
    palette: {
      primary: {
        main: "#B3D135", // your custom green
        contrastText: "#000000", // adjust for best text visibility
      },
    },
    typography: {
      fontFamily: `"Arial", "Segoe UI", "Helvetica", "sans-serif"`,
    },
  },
  heIL
);

export default theme;
