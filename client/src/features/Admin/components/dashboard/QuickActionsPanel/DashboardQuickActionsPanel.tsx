import React from "react";
import { Paper, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { dashboardCardStyle } from "../../../pages/Dashboard/Dashboard";
import TypographyText from "../../../../../shared/components/TypographyText";
import BaseButton from "../../../../../shared/components/BaseButton";

const DashboardQuickActionsPanel: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Paper sx={dashboardCardStyle}>
      <TypographyText variant="subtitle" sx={{ mb: 2 }}>
        פעולות מהירות
      </TypographyText>

      <Box display="flex" flexDirection="row" gap={1}>
        <BaseButton onClick={() => navigate("/admin/items")}>
          ניהול פריטים
        </BaseButton>
        <BaseButton onClick={() => navigate("/admin/categories")}>
          ניהול קטגוריות
        </BaseButton>
        <BaseButton onClick={() => navigate("/admin/orders")}>
          צפייה בכל ההזמנות
        </BaseButton>
      </Box>
    </Paper>
  );
};

export default DashboardQuickActionsPanel;
