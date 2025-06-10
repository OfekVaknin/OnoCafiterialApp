import React, { useEffect, useState } from "react";
import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import type { OrderItem } from "../../../../Order/types/OrderItem";
import { menuItemService } from "../../../services/menuItem.service";
import type { MenuItem } from "../../../../../shared/types/MenuItem";
import TypographyText from "../../../../../shared/components/TypographyText";

interface Props {
  items: OrderItem[];
}

const OrderItemTable: React.FC<Props> = ({ items }) => {
  const [menuItems, setMenuItems] = useState<Record<string, MenuItem>>({});

  useEffect(() => {
    const loadAllMenuItems = async () => {
      try {
        const uniqueIds = Array.from(new Set(items.map((item) => item.menuItemId)));
        const results = await Promise.all(uniqueIds.map((id) => menuItemService.getById(id)));
        const map = results.reduce((acc, item) => {
          acc[item.id] = item;
          return acc;
        }, {} as Record<string, MenuItem>);
        setMenuItems(map);
      } catch (err) {
        console.error("Failed to load menu items:", err);
      }
    };

    loadAllMenuItems();
  }, [items]);

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell><TypographyText>פריט</TypographyText></TableCell>
          <TableCell><TypographyText>כמות</TypographyText></TableCell>
          <TableCell><TypographyText>מחיר</TypographyText></TableCell>
          <TableCell><TypographyText>סה"כ</TypographyText></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {items.map((item) => {
          const menuItem = menuItems[item.menuItemId];
          const name = menuItem?.name || "לא זמין";
          const imageUrl = menuItem?.imageUrl || "/no-image.png";

          return (
            <TableRow key={item._id}>
              <TableCell sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar src={imageUrl} alt={name} sx={{ width: 40, height: 40, mr: 1 }} />
                <TypographyText>{name}</TypographyText>
              </TableCell>
              <TableCell><TypographyText>{item.quantity}</TypographyText></TableCell>
              <TableCell><TypographyText>₪ {item.price}</TypographyText></TableCell>
              <TableCell><TypographyText>₪ {item.price * item.quantity}</TypographyText></TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default OrderItemTable;
