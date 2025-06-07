import React, { useEffect, useState } from "react";
import { Paper, Box } from "@mui/material";
import TypographyText from "../../../../../shared/TypographyText";
import { orderService } from "../../../../Order/services/order.service";
import { OrderStatusEnum } from "../../../../Order/enums/OrderStatusEnum";
import type { Order } from "../../../../Order/types/Order";
import { dashboardCardStyle } from "../../../pages/Dashboard/Dashboard";

const DashboardOrderStatusCounters: React.FC = () => {
  const [statusCounts, setStatusCounts] = useState<
    Record<OrderStatusEnum, number>
  >({
    [OrderStatusEnum.Pending]: 0,
    [OrderStatusEnum.Preparing]: 0,
    [OrderStatusEnum.Ready]: 0,
    [OrderStatusEnum.Completed]: 0,
    [OrderStatusEnum.Cancelled]: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orders: Order[] = await orderService.getAll();
        const today = new Date().toISOString().split("T")[0];

        const counts = {
          [OrderStatusEnum.Pending]: 0,
          [OrderStatusEnum.Preparing]: 0,
          [OrderStatusEnum.Ready]: 0,
          [OrderStatusEnum.Completed]: 0,
          [OrderStatusEnum.Cancelled]: 0,
        };

        orders
          .filter((o) => o.createdAt.startsWith(today))
          .forEach((order: Order) => {
            counts[order.status] = (counts[order.status] || 0) + 1;
          });

        setStatusCounts(counts);
      } catch (error) {
        console.error("Failed to fetch order status counters:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Paper sx={dashboardCardStyle}>
      <TypographyText variant="subtitle" sx={{ mb: 2 }}>
        סטטוס הזמנות היום
      </TypographyText>

      <Box display="flex" flexDirection="column" gap={1}>
        <TypographyText>
          🟡 ממתין: {statusCounts[OrderStatusEnum.Pending]}
        </TypographyText>
        <TypographyText>
          🔵 בהכנה: {statusCounts[OrderStatusEnum.Preparing]}
        </TypographyText>
        <TypographyText>
          🟢 מוכן: {statusCounts[OrderStatusEnum.Ready]}
        </TypographyText>
        <TypographyText>
          ✅ הושלם: {statusCounts[OrderStatusEnum.Completed]}
        </TypographyText>
        <TypographyText>
          ❌ בוטל: {statusCounts[OrderStatusEnum.Cancelled]}
        </TypographyText>
      </Box>
    </Paper>
  );
};

export default DashboardOrderStatusCounters;
