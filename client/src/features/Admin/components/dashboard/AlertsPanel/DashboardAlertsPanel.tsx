import React, { useEffect, useState } from "react";
import { Paper, Box } from "@mui/material";
import TypographyText from "../../../../../shared/TypographyText";
import { orderService } from "../../../../Order/services/order.service";
import { OrderStatusEnum } from "../../../../Order/enums/OrderStatusEnum";
import type { Order } from "../../../../Order/types/Order";
import { dashboardCardStyle } from "../../../pages/Dashboard/Dashboard";

const DashboardAlertsPanel: React.FC = () => {
  const [alerts, setAlerts] = useState<string[]>([]);

  useEffect(() => {
    const orders = orderService.getAll();
    const now = Date.now();
    const activeAlerts: string[] = [];

    // Orders pending over 10 minutes
    orders
      .filter((o) => o.status === OrderStatusEnum.Pending)
      .forEach((o) => {
        const createdTime = new Date(o.createdAt).getTime();
        const diffMinutes = (now - createdTime) / 1000 / 60;
        if (diffMinutes > 10) {
          activeAlerts.push(`הזמנה #${o.documentNumber} ממתינה מעל 10 דקות`);
        }
      });

    // Recently cancelled (last 10 minutes)
    orders
      .filter((o) => o.status === OrderStatusEnum.Cancelled)
      .forEach((o) => {
        const updated = new Date(o.updatedAt || o.createdAt).getTime();
        const diff = (now - updated) / 1000 / 60;
        if (diff <= 10) {
          activeAlerts.push(`הזמנה #${o.documentNumber} בוטלה לפני כמה רגעים`);
        }
      });

    setAlerts(activeAlerts);
  }, []);

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
