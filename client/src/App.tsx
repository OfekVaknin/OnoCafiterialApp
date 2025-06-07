import React, { useEffect } from "react";
import Header from "./features/Header/Header";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./config/routes/AppRoutes";
import { authService } from "./features/Auth/services/auth.service";
import { Box } from "@mui/material";

const App: React.FC = () => {
  useEffect(() => {
    // authService.ensureAdminUser();
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Box sx={{ padding: "10px 20px" }}>
        <AppRoutes />
      </Box>
    </BrowserRouter>
  );
};

export default App;
