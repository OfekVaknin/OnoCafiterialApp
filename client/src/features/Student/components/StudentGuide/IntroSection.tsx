import React from "react";
import TypographyText from "../../../../shared/components/TypographyText";

const IntroSection: React.FC = () => {
  return (
    <>
      <TypographyText variant="subtitle" sx={{ mb: 1 }}>
        ברוכים הבאים לאפליקציית ההזמנות של הקפיטריה!
      </TypographyText>
      <TypographyText>
        דרך האפליקציה תוכלו לצפות בתפריט, להוסיף פריטים לעגלה, לבצע הזמנה ולעקוב
        אחר מצב ההזמנה שלכם בזמן אמת. השימוש פשוט, מהיר ונגיש מכל מכשיר.
      </TypographyText>
    </>
  );
};

export default IntroSection;
