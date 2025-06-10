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
import OrderItemTable from "../OrderItemTable/OrderItemTable";
import OrderStatusSelect, {
  statusLabels,
} from "../OrderStatusSelect/OrderStatusSelect";
import { orderService } from "../../../../Order/services/order.service";
import { OrderStatusEnum } from "../../../../Order/enums/OrderStatusEnum";
import { enqueueSnackbar } from "notistack";
import { useLoggedInUser } from "../../../../Auth/hooks/useLoggedInUser";
import { USER_ROLE } from "../../../../Auth/enums/UserRole.enum";
import BaseButton from "../../../../../shared/components/BaseButton";
import TypographyText from "../../../../../shared/components/TypographyText";

interface Props {
  order: Order;
  refreshOrders: () => void;
}

const OrderCard: React.FC<Props> = ({ order, refreshOrders }) => {
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState<OrderStatusEnum>(order.status);
  const [countdown, setCountdown] = useState<string>("");
  const [elapsedTime, setElapsedTime] = useState<string>("");
  const [isOverdue, setIsOverdue] = useState(false);
  const user = useLoggedInUser();

  useEffect(() => {
    const interval = setInterval(() => {
      updateCountdown();
      updateElapsedTime();
      checkIfOverdue();
    }, 1000);

    return () => clearInterval(interval);
  }, [order]);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const updateElapsedTime = () => {
    const now = new Date();
    const created = new Date(order.createdAt);
    const diff = now.getTime() - created.getTime();
    setElapsedTime(`${formatTime(diff)}`);
  };

  const updateCountdown = () => {
    if (
      user?.role !== USER_ROLE.Admin ||
      order.status !== OrderStatusEnum.Preparing ||
      !order.readyAt
    ) {
      setCountdown("");
      return;
    }

    const now = new Date();
    const readyAt = new Date(order.readyAt);
    const diff = readyAt.getTime() - now.getTime();
    const formatted = formatTime(Math.abs(diff));

    setCountdown(
      diff >= 0 ? `זמן שנותר: ${formatted}` : `באיחור של: ${formatted}`
    );
  };

  const checkIfOverdue = () => {
    const now = new Date();
    const created = new Date(order.createdAt);
    const diffMinutes = (now.getTime() - created.getTime()) / 1000 / 60;

    const isInWarningStatus =
      order.status === OrderStatusEnum.Pending ||
      order.status === OrderStatusEnum.Preparing;

    setIsOverdue(diffMinutes > 10 && isInWarningStatus);
  };

  const handleUpdate = async () => {
    try {
      const updated = await orderService.update(order._id ?? "", {
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
    return (
      <Box display="flex" gap={2} alignItems="center">
        <OrderStatusSelect order={order} onChange={handleStatusChange} />
        <BaseButton onClick={handleUpdate}>עדכן</BaseButton>
      </Box>
    );
  };

  const getOrderStatusMessage = () => {
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

  const showOrderTime =
    order.status === OrderStatusEnum.Pending ||
    order.status === OrderStatusEnum.Preparing;
  return (
    <Accordion
      expanded={expanded}
      onChange={() => setExpanded(!expanded)}
      sx={isOverdue ? { bgcolor: "error.light" } : {}}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box
          display="flex"
          width="100%"
          justifyContent="space-between"
          flexWrap="wrap"
          gap={2}
        >
          <TypographyText>מספר הזמנה: {order.documentNumber}</TypographyText>
          <TypographyText>
            תאריך: {new Date(order.createdAt).toLocaleString()}
          </TypographyText>
          <TypographyText>סטטוס: {statusLabels[order.status]}</TypographyText>
          <TypographyText>סה"כ: ₪ {order.total.toFixed(2)}</TypographyText>
          {showOrderTime && <TypographyText>{elapsedTime}</TypographyText>}
          {user?.role === USER_ROLE.Admin && countdown ? (
            <TypographyText sx={{ color: "error.main", fontWeight: "bold" }}>
              {countdown}
            </TypographyText>
          ) : (
            getOrderStatusMessage()
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
