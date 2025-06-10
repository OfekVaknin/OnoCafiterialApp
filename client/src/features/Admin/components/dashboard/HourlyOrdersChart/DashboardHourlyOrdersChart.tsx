import React, { useEffect, useState } from "react";
import { Paper, Box } from "@mui/material";
import { orderService } from "../../../../Order/services/order.service";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { Order } from "../../../../Order/types/Order";
import { dashboardCardStyle } from "../../../pages/Dashboard/Dashboard";
import TypographyText from "../../../../../shared/components/TypographyText";

interface ChartData {
  hour: string;
  count: number;
}

const DashboardHourlyOrdersChart: React.FC = () => {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orders: Order[] = await orderService.getAll();
        const today = new Date().toISOString().split("T")[0];

        const hourlyMap: Record<string, number> = {};
        for (let h = 0; h < 24; h++) {
          const label = `${h.toString().padStart(2, "0")}:00`;
          hourlyMap[label] = 0;
        }

        orders
          .filter((o) => o.createdAt.startsWith(today))
          .forEach((order) => {
            const hour = new Date(order.createdAt).getHours();
            const label = `${hour.toString().padStart(2, "0")}:00`;
            hourlyMap[label]++;
          });

        const chartData = Object.entries(hourlyMap).map(([hour, count]) => ({
          hour,
          count,
        }));

        setData(chartData);
      } catch (err) {
        console.error("Failed to load hourly orders chart:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <Paper sx={dashboardCardStyle}>
      <TypographyText variant="subtitle" sx={{ mb: 2 }}>
        הזמנות לפי שעה (היום)
      </TypographyText>

      <Box height={300}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" interval={1} />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#2196f3" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default DashboardHourlyOrdersChart;
