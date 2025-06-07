import React from "react";
import { OrderStatusEnum } from "../../../../Order/enums/OrderStatusEnum";
import { orderService } from "../../../../Order/services/order.service";
import type { Order } from "../../../../Order/types/Order";
import type { SelectChangeEvent } from "@mui/material";
import TypographyText from "../../../../../shared/TypographyText";
import BaseSelect from "../../../../../shared/BaseSelect";

interface Props {
  order: Order;
  onChange: (status: OrderStatusEnum) => void;
}

export const statusLabels: Record<OrderStatusEnum, string> = {
  [OrderStatusEnum.Pending]: "ממתין",
  [OrderStatusEnum.Preparing]: "בהכנה",
  [OrderStatusEnum.Ready]: "מוכן",
  [OrderStatusEnum.Completed]: "הושלם",
  [OrderStatusEnum.Cancelled]: "בוטל",
};

const OrderStatusSelect: React.FC<Props> = ({ order, onChange }) => {
  const [status, setStatus] = React.useState(order.status);

  const handleChange = (e: SelectChangeEvent) => {
    const newStatus = e.target.value as OrderStatusEnum;
    setStatus(newStatus);
    // orderService.update(order.id, { status: newStatus });
    onChange(newStatus);
  };

  const options = Object.values(OrderStatusEnum).map((value) => ({
    value,
    label: statusLabels[value],
  }));

  return (
    <>
      <TypographyText variant="subtitle">עדכון סטטוס הזמנה:</TypographyText>
      <BaseSelect
        label="סטטוס"
        value={status}
        onChange={handleChange}
        options={options}
        width={200}
      />
    </>
  );
};

export default OrderStatusSelect;
