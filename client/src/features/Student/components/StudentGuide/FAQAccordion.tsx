import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TypographyText from "../../../../shared/components/TypographyText";

const questions = [
  {
    question: "איך מבצעים הזמנה?",
    answer:
      "נכנסים לעמוד התפריט, בוחרים פריטים, מוסיפים לעגלה ובלחיצה על כפתור 'בצע הזמנה' ההזמנה תישלח למערכת.",
  },
  {
    question: "איך יודעים מתי ההזמנה מוכנה?",
    answer:
      "במעקב ההזמנות, תוכלו לראות סטטוס של כל הזמנה. כשהסטטוס משתנה ל'מוכן' – אפשר להגיע לאסוף.",
  },
  {
    question: "אפשר לבטל הזמנה?",
    answer:
      "אם ההזמנה עדיין בסטטוס 'ממתין' ניתן לבקש ביטול דרך מנהל או בדלפק.",
  },
  {
    question: "האם המחירים כוללים מע״מ?",
    answer: "כן, כל המחירים כוללים מע״מ ואין עלויות נוספות.",
  },
];

const FAQAccordion: React.FC = () => {
  return (
    <>
      <TypographyText variant="subtitle" sx={{ mb: 2 }}>
        שאלות נפוצות ❓
      </TypographyText>

      {questions.map((q, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{q.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{q.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default FAQAccordion;
