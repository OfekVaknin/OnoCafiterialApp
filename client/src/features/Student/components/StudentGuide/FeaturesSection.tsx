import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import TypographyText from "../../../../shared/components/TypographyText";

const FeaturesSection: React.FC = () => {
  return (
    <>
      <TypographyText variant="subtitle" sx={{ mb: 2 }}>
        מה אפשר לעשות באפליקציה?
      </TypographyText>

      <List sx={{ direction: "rtl" }}>
        <TypographyText>
          <ListItemText primary="📋 צפייה בתפריט המנות הזמינות." />
        </TypographyText>
        <TypographyText>
          <ListItemText primary="🛒 הוספה של פריטים לעגלה לפי הכמות הרצויה." />
        </TypographyText>
        <TypographyText>
          <ListItemText primary="📦 ביצוע הזמנה בלחיצה אחת." />
        </TypographyText>
        <TypographyText>
          <ListItemText primary="⏱️ מעקב אחרי מצב ההזמנה – ממתין, בהכנה, מוכן, בוצע." />
        </TypographyText>
        <TypographyText>
          <ListItemText primary="🕒 היסטוריית הזמנות מכל הזמנים." />
        </TypographyText>
      </List>
    </>
  );
};

export default FeaturesSection;
