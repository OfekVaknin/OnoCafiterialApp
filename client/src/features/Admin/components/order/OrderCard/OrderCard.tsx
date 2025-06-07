import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import type { Order } from "../../../../Order/types/Order";
import TypographyText from "../../../../../shared/TypographyText";
import OrderItemTable from "../OrderItemTable/OrderItemTable";
import OrderStatusSelect, {
  statusLabels,
} from "../OrderStatusSelect/OrderStatusSelect";
import { orderService } from "../../../../Order/services/order.service";
import BaseButton from "../../../../../shared/BaseButton";
import { OrderStatusEnum } from "../../../../Order/enums/OrderStatusEnum";
import { enqueueSnackbar } from "notistack";
import { useLoggedInUser } from "../../../../Auth/hooks/useLoggedInUser";
import { USER_ROLE } from "../../../../Auth/enums/UserRole.enum";

interface Props {
  order: Order;
  refreshOrders: () => void; // Optional prop for refreshing orders
}

const OrderCard: React.FC<Props> = ({ order, refreshOrders }) => {
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState<OrderStatusEnum>(order.status);
  const [countdown, setCountdown] = useState<string>("");
  const user = useLoggedInUser();

  useEffect(() => {
    if (
      user?.role !== USER_ROLE.Admin ||
      order.status !== OrderStatusEnum.Preparing ||
      !order.readyAt
    )
      return;

    const interval = setInterval(() => {
      const now = new Date();
      const readyAt = new Date(order.readyAt ? order.readyAt : new Date());
      const diff = readyAt.getTime() - now.getTime();

      const minutes = Math.floor(Math.abs(diff) / 60000);
      const seconds = Math.floor((Math.abs(diff) % 60000) / 1000);
      const formatted = `${minutes}:${seconds.toString().padStart(2, "0")}`;

      setCountdown(
        diff >= 0 ? `זמן שנותר: ${formatted}` : `באיחור של: ${formatted}`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [order.status, order.readyAt, user?.role]);

 const handleUpdate = async () => {
  try {
    const updated = await orderService.update(order._id, {
      status,
      updatedAt: new Date().toISOString(),
    });

    if (updated) {
      refreshOrders();
      enqueueSnackbar("הסטטוס עודכן בהצלחה", { variant: "success" });
    } else {
      enqueueSnackbar("לא נמצאה הזמנה לעדכון", { variant: "warning" });
    }
  } catch (err) {
    console.error(err);
    enqueueSnackbar("אירעה שגיאה בעת עדכון ההזמנה", { variant: "error" });
  }
};

  const handleStatusChange = (newStatus: OrderStatusEnum) => {
    setStatus(newStatus);
  };

  const getAdminOrderStatusElement = () => {
    if (user?.role === USER_ROLE.Student) return null;
    else
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            alignItems: "center",
          }}
        >
          <OrderStatusSelect order={order} onChange={handleStatusChange} />
          <BaseButton onClick={handleUpdate}>עדכן</BaseButton>
        </Box>
      );
  };

  const getOrderPrearingTime = () => {
    switch (order.status) {
      case OrderStatusEnum.Pending:
        return <TypographyText>ממתין לאישור</TypographyText>;
      case OrderStatusEnum.Preparing:
        return order.readyAt ? (
          <TypographyText>
            מוכן לאיסוף עד השעה:{" "}
            {new Date(order.readyAt).toLocaleTimeString("he-IL", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </TypographyText>
        ) : null;
      case OrderStatusEnum.Ready:
        return <TypographyText>הזמנה מוכנה</TypographyText>;
      case OrderStatusEnum.Completed:
        return <TypographyText>הזמנה הושלמה</TypographyText>;
      case OrderStatusEnum.Cancelled:
        return <TypographyText>הזמנה בוטלה</TypographyText>;
      default:
        return null;
    }
  };

  return (
    <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box display="flex" width="100%" justifyContent="space-between" gap={2}>
          <TypographyText>מספר הזמנה: {order.documentNumber}</TypographyText>
          <TypographyText>
            תאריך: {new Date(order.createdAt).toLocaleString()}
          </TypographyText>
          <TypographyText>סטטוס: {statusLabels[order.status]}</TypographyText>
          <TypographyText>סה"כ: ₪ {order.total.toFixed(2)}</TypographyText>
          {user?.role === USER_ROLE.Admin ? (
            order.status === OrderStatusEnum.Preparing && countdown ? (
              <TypographyText sx={{ color: "error.main", fontWeight: "bold" }}>
                {countdown}
              </TypographyText>
            ) : null
          ) : (
            getOrderPrearingTime()
          )}
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <OrderItemTable items={order.items} />
        <Divider sx={{ my: 2 }} />
        {getAdminOrderStatusElement()}
      </AccordionDetails>
    </Accordion>
  );
};

export default OrderCard;
