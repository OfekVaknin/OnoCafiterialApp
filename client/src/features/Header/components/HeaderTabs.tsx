// components/Header/HeaderTabs.tsx
import React from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../Auth/store/useAuthStore";
import useHeaderTabs from "../hooks/useHeaderTabs";

interface Props {
  isMobile: boolean;
}

const HeaderTabs: React.FC<Props> = ({ isMobile }) => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const { tabs, currentTab } = useHeaderTabs();

  const handleTabClick = (path: string) => {
    if (path === "/logout") {
      logout();
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, display: isMobile ? "none" : "flex", mx: 2 }}>
      <Tabs value={currentTab} textColor="inherit" indicatorColor="secondary">
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            onClick={() => handleTabClick(tab.path)}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default HeaderTabs;
