import React from "react";
import { Box, Paper } from "@mui/material";

import { useCartStore } from "../../../store/useCartStore";
import { v4 as uuidv4 } from "uuid";
import { useAuthStore } from "../../../../Auth/store/useAuthStore";
import { OrderStatusEnum } from "../../../../Order/enums/OrderStatusEnum";
import type { Order } from "../../../../Order/types/Order";
import type { OrderItem } from "../../../../Order/types/OrderItem";
import { orderService } from "../../../../Order/services/order.service";
import { orderItemService } from "../../../../Order/services/orderItem.service";
import { alertService } from "../../../../../shared/utils/alert";
import TypographyText from "../../../../../shared/components/TypographyText";
import BaseButton from "../../../../../shared/components/BaseButton";

const CartSummary: React.FC = () => {
  const { items, clearCart } = useCartStore();
  const { user } = useAuthStore();

  const total = items.reduce((sum, i) => sum + i.quantity * i.price, 0);

  const handleConfirm = async () => {
    if (!user) {
      alert("עליך להתחבר לפני ביצוע הזמנה.");
      return;
    }

    if (items.length === 0) {
      alert("העגלה ריקה");
      return;
    }

    const orderId = uuidv4();

    const orderItems: OrderItem[] = items.map((item) => ({
      id: uuidv4(),
      orderId,
      menuItemId: item.id,
      quantity: item.quantity,
      price: item.price,
    }));

    const newOrder: Order = {
      id: orderId,
      userId: user._id ?? "",
      items: orderItems,
      status: OrderStatusEnum.Pending,
      total,
      createdAt: new Date().toISOString(),
    };
    try {
      await orderService.create(newOrder);
      clearCart();
      alertService.success(
        "ניתן לעקוב אחר סטטוס ההזמנה מתוך אזור ההזמנות שלי",
        "ההזמנה נקלטה בהצלחה!"
      );
    } catch (err) {
      console.error(err);
      alertService.error("שגיאה בביצוע ההזמנה.",'אנא נסה שנית מאוחר יותר או פנה לקפיטריה עצמה להזמנה :)');
    }
  };

  return (
    <Paper sx={{ mt: 4, p: 3, borderRadius: 2, maxWidth: 300 }}>
      <TypographyText variant="subtitle">סה"כ לתשלום</TypographyText>
      <TypographyText variant="title" align="right">
        ₪ {total.toFixed(2)}
      </TypographyText>

      <TypographyText variant="caption" align="right" sx={{ my: 1 }}>
        זמן משוער לאיסוף: 15 דקות
      </TypographyText>

      <BaseButton fullWidth onClick={handleConfirm}>
        בצע הזמנה
      </BaseButton>
    </Paper>
  );
};

export default CartSummary;
