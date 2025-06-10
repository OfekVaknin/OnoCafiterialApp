import React from "react";
import { Box } from "@mui/material";
import OrderList from "../../components/order/OrderList/OrderList";
import TypographyText from "../../../../shared/components/TypographyText";

const ManageOrdersPage: React.FC = () => {
  return (
    <Box sx={{ p: 4 }}>
      <TypographyText variant="title">ניהול הזמנות</TypographyText>
      <OrderList />
    </Box>
  );
};

export default ManageOrdersPage;
