import React, { useEffect, useState } from "react";
import { Paper, Box } from "@mui/material";
import TypographyText from "../../../../../shared/TypographyText";
import { orderService } from "../../../../Order/services/order.service";
import type { Order } from "../../../../Order/types/Order";
import { menuItemService } from "../../../services/menuItem.service";
import { dashboardCardStyle } from "../../../pages/Dashboard/Dashboard";

interface TopItem {
  menuItemId: string;
  quantity: number;
}

const DashboardWeeklyPopularItemsCard: React.FC = () => {
  const [topItems, setTopItems] = useState<TopItem[]>([]);

  useEffect(() => {
    const now = new Date();
    const weekAgo = new Date();
    weekAgo.setDate(now.getDate() - 7);

    const orders = orderService.getAll();

    const frequencyMap: Record<string, number> = {};

    orders
      .filter((o) => new Date(o.createdAt) >= weekAgo)
      .forEach((order) => {
        order.items.forEach((item) => {
          frequencyMap[item.menuItemId] =
            (frequencyMap[item.menuItemId] || 0) + item.quantity;
        });
      });

    const sorted = Object.entries(frequencyMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([menuItemId, quantity]) => ({ menuItemId, quantity }));

    setTopItems(sorted);
  }, []);

  return (
    <Paper sx={dashboardCardStyle}>
      <TypographyText variant="subtitle" sx={{ mb: 2 }}>
        פריטים פופולריים השבוע
      </TypographyText>

      {topItems.length === 0 ? (
        <TypographyText>אין הזמנות ב-7 ימים האחרונים</TypographyText>
      ) : (
        <Box display="flex" flexDirection="column" gap={1}>
          {topItems.map((item, idx) => (
            <TypographyText key={item.menuItemId}>
              #{idx + 1} – שם פריט:
              {menuItemService.getMenuItemName(item.menuItemId)} (
              {item.quantity} הזמנות)
            </TypographyText>
          ))}
        </Box>
      )}
    </Paper>
  );
};

export default DashboardWeeklyPopularItemsCard;
