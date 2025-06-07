import React, { useEffect, useState } from "react";
import { Paper, Box } from "@mui/material";
import type { Order } from "../../../../Order/types/Order";
import { orderService } from "../../../../Order/services/order.service";
import TypographyText from "../../../../../shared/TypographyText";
import { menuItemService } from "../../../services/menuItem.service";
import { dashboardCardStyle } from "../../../pages/Dashboard/Dashboard";

const DashboardOrdersSummaryCard: React.FC = () => {
  const [ordersToday, setOrdersToday] = useState<Order[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [mostOrderedItem, setMostOrderedItem] = useState<string>("");

  useEffect(() => {
    const allOrders = orderService.getAll();
    const today = new Date().toISOString().split("T")[0];

    const filtered = allOrders.filter((o) => o.createdAt.startsWith(today));

    setOrdersToday(filtered);

    const total = filtered.reduce((sum, order) => sum + order.total, 0);
    setTotalRevenue(total);

    const itemFrequency: Record<string, number> = {};

    filtered.forEach((order) => {
      order.items.forEach((item) => {
        const key = item.menuItemId;
        itemFrequency[key] = (itemFrequency[key] || 0) + item.quantity;
      });
    });

    const mostCommon = Object.entries(itemFrequency).sort(
      (a, b) => b[1] - a[1]
    )[0];
    setMostOrderedItem(mostCommon ? mostCommon[0] : "לא זמין");
  }, []);

  return (
    <Paper sx={dashboardCardStyle}>
      <TypographyText variant="subtitle" sx={{ mb: 2 }}>
        סיכום הזמנות להיום
      </TypographyText>

      <Box mb={1}>
        <TypographyText>סה״כ הזמנות: {ordersToday.length}</TypographyText>
      </Box>

      <Box mb={1}>
        <TypographyText>
          סה״כ הכנסות: ₪ {totalRevenue.toFixed(2)}
        </TypographyText>
      </Box>

      <Box>
        <TypographyText>
          הפריט הנפוץ ביותר: {menuItemService.getMenuItemName(mostOrderedItem)}
        </TypographyText>
      </Box>
    </Paper>
  );
};

export default DashboardOrdersSummaryCard;
