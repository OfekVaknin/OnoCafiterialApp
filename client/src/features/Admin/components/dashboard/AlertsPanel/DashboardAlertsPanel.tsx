import React, { useEffect, useState } from "react";
import { Paper, Box } from "@mui/material";
import { orderService } from "../../../../Order/services/order.service";
import { OrderStatusEnum } from "../../../../Order/enums/OrderStatusEnum";
import type { Order } from "../../../../Order/types/Order";
import { dashboardCardStyle } from "../../../pages/Dashboard/Dashboard";
import TypographyText from "../../../../../shared/components/TypographyText";

const DashboardAlertsPanel: React.FC = () => {
  const [alerts, setAlerts] = useState<string[]>([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const orders = await orderService.getAll();
        const now = Date.now();

        const alerts: string[] = [];

        alerts.push(...getPendingOrderAlerts(orders, now));
        alerts.push(...getRecentCancelledAlerts(orders, now));

        setAlerts(alerts);
      } catch (err) {
        console.error("Failed to load alerts", err);
      }
    };

    fetchAlerts();
  }, []);

  // 🔹 Helper: detect pending orders over 10 min
  const getPendingOrderAlerts = (orders: Order[], now: number): string[] => {
    const pendingTooLong = orders.filter((o) => {
      if (o.status !== OrderStatusEnum.Pending) return false;
      const createdTime = new Date(o.createdAt).getTime();
      const diffMinutes = (now - createdTime) / 1000 / 60;
      return diffMinutes > 10;
    });

    return pendingTooLong.length > 0
      ? [`יש ${pendingTooLong.length} הזמנות שממתינות יותר מ־10 דקות`]
      : [];
  };

  // 🔹 Helper: detect recent cancellations
  const getRecentCancelledAlerts = (orders: Order[], now: number): string[] => {
    const recentCancelled = orders.filter((o) => {
      if (o.status !== OrderStatusEnum.Cancelled) return false;
      const updated = new Date(o.updatedAt || o.createdAt).getTime();
      const diffMinutes = (now - updated) / 1000 / 60;
      return diffMinutes <= 10;
    });

    return recentCancelled.length > 0
      ? [`היו ${recentCancelled.length} ביטולים בעשר הדקות האחרונות`]
      : [];
  };

  return (
    <Paper sx={dashboardCardStyle}>
      <TypographyText variant="subtitle" sx={{ mb: 2 }}>
        התראות
      </TypographyText>

      {alerts.length === 0 ? (
        <TypographyText>אין התראות כרגע</TypographyText>
      ) : (
        <Box display="flex" flexDirection="column" gap={1}>
          {alerts.map((alert, idx) => (
            <TypographyText key={idx}>⚠️ {alert}</TypographyText>
          ))}
        </Box>
      )}
    </Paper>
  );
};

export default DashboardAlertsPanel;
