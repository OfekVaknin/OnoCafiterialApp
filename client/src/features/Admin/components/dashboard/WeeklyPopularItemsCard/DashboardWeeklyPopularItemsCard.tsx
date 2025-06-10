import React, { useEffect, useState } from "react";
import { Paper, Box } from "@mui/material";
import { orderService } from "../../../../Order/services/order.service";
import type { Order } from "../../../../Order/types/Order";
import { menuItemService } from "../../../services/menuItem.service";
import { dashboardCardStyle } from "../../../pages/Dashboard/Dashboard";
import TypographyText from "../../../../../shared/components/TypographyText";

interface TopItem {
  menuItemId: string;
  quantity: number;
}

const DashboardWeeklyPopularItemsCard: React.FC = () => {
  const [topItems, setTopItems] = useState<TopItem[]>([]);
  const [itemNames, setItemNames] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const now = new Date();
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 7);

        const orders: Order[] = await orderService.getAll();

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

        // Fetch item names in parallel
        const names: Record<string, string> = {};
        await Promise.all(
          sorted.map(async ({ menuItemId }) => {
            try {
              const item = await menuItemService.getById(menuItemId);
              names[menuItemId] = item.name;
            } catch {
              names[menuItemId] = "לא ידוע";
            }
          })
        );
        setItemNames(names);
      } catch (err) {
        console.error("Failed to load top items:", err);
      }
    };

    fetchData();
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
              #{idx + 1} – שם פריט: {itemNames[item.menuItemId] || "טוען..."} (
              {item.quantity} הזמנות)
            </TypographyText>
          ))}
        </Box>
      )}
    </Paper>
  );
};

export default DashboardWeeklyPopularItemsCard;
