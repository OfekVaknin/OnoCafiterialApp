import React, { useState, useEffect } from "react";
import { orderService } from "../../../../Order/services/order.service";
import { Box } from "@mui/material";
import type { Order } from "../../../../Order/types/Order";
import OrderCard from "../OrderCard/OrderCard";
import { useLoggedInUser } from "../../../../Auth/hooks/useLoggedInUser";
import TypographyText from "../../../../../shared/TypographyText";
import { USER_ROLE } from "../../../../Auth/enums/UserRole.enum";

const OrderList: React.FC = () => {
  const [todayOrders, setTodayOrders] = useState<Order[]>([]);
  const [pastOrders, setPastOrders] = useState<Order[]>([]);
  const user = useLoggedInUser();

  useEffect(() => {
    if (user) {
      refreshOrders();
    }
  }, [user]);

  const refreshOrders = async () => {
    if (!user) return;

    let allOrders: Order[] = [];
    if (user.role === USER_ROLE.Admin) {
      allOrders = await orderService.getAll();
    } else {
      allOrders = await orderService.getAllByStudent(user._id);
    }

    const today = new Date().toISOString().split("T")[0];
    const todayList: Order[] = [];
    const pastList: Order[] = [];

    allOrders.forEach((o) => {
      if (o.createdAt.startsWith(today)) {
        todayList.push(o);
      } else {
        pastList.push(o);
      }
    });

    setTodayOrders(todayList);
    setPastOrders(pastList);
  };

  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Box>
        <TypographyText variant="subtitle" sx={{ mb: 1 }}>
          הזמנות מהיום
        </TypographyText>
        {todayOrders.length === 0 ? (
          <TypographyText>אין הזמנות היום</TypographyText>
        ) : (
          todayOrders.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
              refreshOrders={refreshOrders}
            />
          ))
        )}
      </Box>

      <Box>
        <TypographyText variant="subtitle" sx={{ mb: 1 }}>
          היסטוריית הזמנות
        </TypographyText>
        {pastOrders.length === 0 ? (
          <TypographyText>אין הזמנות קודמות</TypographyText>
        ) : (
          pastOrders.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
              refreshOrders={refreshOrders}
            />
          ))
        )}
      </Box>
    </Box>
  );
};

export default OrderList;
