import React, { useEffect, useState } from "react";
import { Paper, Box } from "@mui/material";
import { dashboardCardStyle } from "../../../pages/Dashboard/Dashboard";
import { orderService } from "../../../../Order/services/order.service";
import { menuItemService } from "../../../services/menuItem.service";
import type { Order } from "../../../../Order/types/Order";
import TypographyText from "../../../../../shared/components/TypographyText";

const DashboardOrdersSummaryCard: React.FC = () => {
  const [ordersToday, setOrdersToday] = useState<Order[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [mostOrderedItemName, setMostOrderedItemName] = useState("לא זמין");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allOrders = await orderService.getAll();
        const today = new Date().toISOString().split("T")[0];
        const filtered = allOrders.filter((o) =>
          o.createdAt.startsWith(today)
        );

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

        if (mostCommon) {
          const mostOrderedItem = await menuItemService.getById(mostCommon[0]);
          setMostOrderedItemName(mostOrderedItem?.name || "לא זמין");
        } else {
          setMostOrderedItemName("לא זמין");
        }
      } catch (err) {
        console.error("Error loading dashboard data", err);
        setMostOrderedItemName("שגיאה");
      }
    };

    fetchData();
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
        <TypographyText>סה״כ הכנסות: ₪ {totalRevenue.toFixed(2)}</TypographyText>
      </Box>

      <Box>
        <TypographyText>
          הפריט הנפוץ ביותר: {mostOrderedItemName}
        </TypographyText>
      </Box>
    </Paper>
  );
};

export default DashboardOrdersSummaryCard;
