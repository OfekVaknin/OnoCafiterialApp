import React from "react";
import Box from "@mui/material/Box";
import TypographyText from "../../../../shared/TypographyText";
import DashboardOrdersSummaryCard from "../../components/dashboard/OrdersSummaryCard/DashboardOrdersSummaryCard";
import DashboardOrderStatusCounters from "../../components/dashboard/OrderStatusCounters/DashboardOrderStatusCounters";
import DashboardWeeklyPopularItemsCard from "../../components/dashboard/WeeklyPopularItemsCard/DashboardWeeklyPopularItemsCard";
import DashboardAverageFulfillmentCard from "../../components/dashboard/AverageFulfillmentCard/DashboardAverageFulfillmentCard";
import DashboardWeeklyOrdersChart from "../../components/dashboard/WeeklyOrdersChart/DashboardWeeklyOrdersChart";
import DashboardWeeklyRevenueChart from "../../components/dashboard/WeeklyRevenueChart/DashboardWeeklyRevenueChart";
import DashboardCancelledOrdersChart from "../../components/dashboard/CancelledOrdersChart/DashboardCancelledOrdersChart";
import DashboardHourlyOrdersChart from "../../components/dashboard/HourlyOrdersChart/DashboardHourlyOrdersChart";
import DashboardQuickActionsPanel from "../../components/dashboard/QuickActionsPanel/DashboardQuickActionsPanel";
import DashboardAlertsPanel from "../../components/dashboard/AlertsPanel/DashboardAlertsPanel";

export const dashboardCardStyle = {
  p: 3,
  borderRadius: 0,
  boxShadow: 3,
  minHeight: 100,
  height: "100%",
};

const DashboardPage: React.FC = () => {
  return (
    <Box sx={{ p: 4, display: "flex", flexDirection: "column", gap: 4 }}>
      <TypographyText variant="title" sx={{ mb: 3 }}>
        לוח בקרה ניהולי
      </TypographyText>

      {/* First row of cards */}
      <Box display="flex" flexWrap="wrap" gap={2} alignItems="stretch">
        <Box flex={1} minWidth={300}>
          <DashboardQuickActionsPanel />
        </Box>
        <Box flex={1} minWidth={300}>
          <DashboardAlertsPanel />
        </Box>
      </Box>
      <Box display="flex" flexWrap="wrap" gap={2} alignItems="stretch">
        <Box flex={1} minWidth={300}>
          <DashboardOrdersSummaryCard />
        </Box>
        <Box flex={1} minWidth={300}>
          <DashboardOrderStatusCounters />
        </Box>
        <Box flex={1} minWidth={300}>
          <DashboardWeeklyPopularItemsCard />
        </Box>
        <Box flex={1} minWidth={300}>
          <DashboardAverageFulfillmentCard />
        </Box>
      </Box>
      <Box display="flex" flexWrap="wrap" gap={2} alignItems="stretch">
        <Box flex={1} minWidth={300}>
          <DashboardWeeklyOrdersChart />
        </Box>
        <Box flex={1} minWidth={300}>
          <DashboardWeeklyRevenueChart />
        </Box>
        <Box flex={1} minWidth={300}>
          <DashboardCancelledOrdersChart />
        </Box>
      </Box>
      <Box flex={1} minWidth={300}>
        <DashboardHourlyOrdersChart />
      </Box>

      {/* Add next rows here as we build more cards */}
    </Box>
  );
};

export default DashboardPage;
