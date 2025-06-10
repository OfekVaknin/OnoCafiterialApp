import React, { useEffect, useState } from "react";
import { Paper, Box } from "@mui/material";
import { orderService } from "../../../../Order/services/order.service";
import {
  LineChart,
  Line,
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
  revenue: number;
}

const DashboardWeeklyRevenueChart: React.FC = () => {
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
            pastWeek[date] += order.total;
          }
        });

        const chartData: ChartData[] = Object.entries(pastWeek).map(
          ([date, revenue]) => ({
            date: new Date(date).toLocaleDateString("he-IL", {
              weekday: "short",
              day: "2-digit",
              month: "2-digit",
            }),
            revenue: Number(revenue.toFixed(2)),
          })
        );

        setData(chartData);
      } catch (error) {
        console.error("Failed to fetch weekly revenue data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Paper sx={dashboardCardStyle}>
      <TypographyText variant="subtitle" sx={{ mb: 2 }}>
        הכנסות לפי יום (7 ימים אחרונים)
      </TypographyText>

      <Box height={300}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip formatter={(value: number) => `₪ ${value.toFixed(2)}`} />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#4caf50"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default DashboardWeeklyRevenueChart;
