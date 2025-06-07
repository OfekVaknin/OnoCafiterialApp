import React from "react";
import { Box, Paper } from "@mui/material";
import TypographyText from "../../../../shared/TypographyText";
import IntroSection from "../../components/StudentGuide/IntroSection";
import FeaturesSection from "../../components/StudentGuide/FeaturesSection";
import FAQAccordion from "../../components/StudentGuide/FAQAccordion";

const StudentGuidePage: React.FC = () => {
  return (
    <Box sx={{ p: 4 }}>
      <TypographyText variant="title" sx={{ mb: 3 }}>
        מדריך לסטודנט 🧑‍🎓
      </TypographyText>

      <Paper sx={{ p: 3, mb: 4, boxShadow: 0 }}>
        <IntroSection />
      </Paper>

      <Paper sx={{ p: 3, mb: 4, boxShadow: 0 }}>
        <FeaturesSection />
      </Paper>

      <Paper sx={{ p: 3, boxShadow: 0 }}>
        <FAQAccordion />
      </Paper>
    </Box>
  );
};

export default StudentGuidePage;
