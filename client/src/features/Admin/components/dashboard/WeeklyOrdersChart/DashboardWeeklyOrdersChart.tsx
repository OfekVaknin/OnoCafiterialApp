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
  date: string;
  count: number;
}

const DashboardWeeklyOrdersChart: React.FC = () => {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orders: Order[] = await orderService.getAll();
        const today = new Date();
        const pastWeek: Record<string, number> = {};

        for (let i = 6; i >= 0; i--) {
          const d = new Date(today);
          d.setDate(today.getDate() - i);
          const key = d.toISOString().split("T")[0];
          pastWeek[key] = 0;
        }

        orders.forEach((order) => {
          const date = order.createdAt.split("T")[0];
          if (pastWeek.hasOwnProperty(date)) {
            pastWeek[date]++;
          }
        });

        const chartData: ChartData[] = Object.entries(pastWeek).map(
          ([date, count]) => ({
            date: new Date(date).toLocaleDateString("he-IL", {
              weekday: "short",
              day: "2-digit",
              month: "2-digit",
            }),
            count,
          })
        );

        setData(chartData);
      } catch (error) {
        console.error("Failed to fetch orders for chart:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Paper sx={dashboardCardStyle}>
      <TypographyText variant="subtitle" sx={{ mb: 2 }}>
        הזמנות בשבוע האחרון
      </TypographyText>

      <Box height={300}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#3f51b5" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default DashboardWeeklyOrdersChart;
