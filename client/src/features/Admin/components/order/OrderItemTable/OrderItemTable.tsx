import React from "react";
import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import type { OrderItem } from "../../../../Order/types/OrderItem";
import TypographyText from "../../../../../shared/TypographyText";
import { menuItemService } from "../../../services/menuItem.service";

interface Props {
  items: OrderItem[];
}

const OrderItemTable: React.FC<Props> = ({ items }) => {
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>
            <TypographyText>תמונת פריט</TypographyText>
          </TableCell>
          <TableCell>
            <TypographyText>כמות</TypographyText>
          </TableCell>
          <TableCell>
            <TypographyText>מחיר</TypographyText>
          </TableCell>
          <TableCell>
            <TypographyText>סה"כ</TypographyText>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {items.map((item) => {
          const name = menuItemService.getMenuItemName(item.menuItemId);
          const imageUrl =
            menuItemService.getMenuItemImageUrl(item.menuItemId) ||
            "/no-image.png";

          return (
            <TableRow key={item.id}>
              <TableCell sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar
                  src={imageUrl}
                  alt={name}
                  sx={{ width: 40, height: 40, mr: 1, display: "flex" }}
                />
                <TypographyText sx={{ display: "inline-block", ml: 1 }}>
                  {name}
                </TypographyText>
              </TableCell>
              <TableCell>
                <TypographyText>{item.quantity}</TypographyText>
              </TableCell>
              <TableCell>
                <TypographyText>₪ {item.price}</TypographyText>
              </TableCell>
              <TableCell>
                <TypographyText>₪ {item.price * item.quantity}</TypographyText>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default OrderItemTable;
