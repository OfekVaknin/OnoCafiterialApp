import React, { useEffect, useState } from "react";
import { Paper, Box } from "@mui/material";
import TypographyText from "../../../../../shared/TypographyText";
import { orderService } from "../../../../Order/services/order.service";
import type { Order } from "../../../../Order/types/Order";
import { OrderStatusEnum } from "../../../../Order/enums/OrderStatusEnum";
import { dashboardCardStyle } from "../../../pages/Dashboard/Dashboard";

const DashboardAverageFulfillmentCard: React.FC = () => {
  const [averageTime, setAverageTime] = useState<number | null>(null);

  useEffect(() => {
    const fetchAverageTime = async () => {
      try {
        const orders = await orderService.getAll();

        const today = new Date().toISOString().split("T")[0];
        const todayList: Order[] = orders.filter((o) =>
          o.createdAt.startsWith(today)
        );

        const relevantOrders = todayList.filter(
          (o) =>
            o.status === OrderStatusEnum.Ready ||
            o.status === OrderStatusEnum.Completed
        );

        if (relevantOrders.length === 0) {
          setAverageTime(null);
          return;
        }

        const totalMinutes = relevantOrders.reduce((sum, order) => {
          const created = new Date(order.createdAt).getTime();
          const ready = new Date(order.updatedAt || order.createdAt).getTime();
          const diffMinutes = (ready - created) / 1000 / 60;
          return sum + diffMinutes;
        }, 0);

        const avg = totalMinutes / relevantOrders.length;
        setAverageTime(avg);
      } catch (err) {
        console.error("Failed to calculate average fulfillment time", err);
      }
    };

    fetchAverageTime();
  }, []);

  return (
    <Paper sx={dashboardCardStyle}>
      <TypographyText variant="subtitle" sx={{ mb: 2 }}>
        זמן הכנה ממוצע להזמנה
      </TypographyText>

      {averageTime === null ? (
        <TypographyText>אין נתונים זמינים</TypographyText>
      ) : (
        <TypographyText>{averageTime.toFixed(1)} דקות בממוצע</TypographyText>
      )}
    </Paper>
  );
};

export default DashboardAverageFulfillmentCard;
