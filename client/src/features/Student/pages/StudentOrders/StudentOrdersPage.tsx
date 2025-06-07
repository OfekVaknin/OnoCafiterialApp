import React from "react";
import { Box } from "@mui/material";
import TypographyText from "../../../../shared/TypographyText";
import OrderList from "../../../Admin/components/order/OrderList/OrderList";

const StudentOrdersPage: React.FC = () => {
  return (
    <Box sx={{ p: 4 }}>
      <TypographyText variant="title" sx={{ mb: 3 }}>
        ההזמנות שלי
      </TypographyText>

      <OrderList />
    </Box>
  );
};

export default StudentOrdersPage;
