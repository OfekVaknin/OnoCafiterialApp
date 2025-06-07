import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Tabs,
  Tab,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../Auth/store/useAuthStore";
import { USER_ROLE, type UserRoleEnum } from "../Auth/enums/UserRole.enum";

const Header: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width:600px)");
  const role: UserRoleEnum | null = user?.role ?? null;

  // Navigation tabs by role
  const studentTabs = [
    { label: "תפריט", path: "/menu" },
    { label: "הזמנות שלי", path: "/orders" },
  ];

  const adminTabs = [
    { label: "דשבורד", path: "/admin/dashboard" },
    { label: "קטגוריות", path: "/admin/categories" },
    { label: "פריטים", path: "/admin/items" },
    { label: "הזמנות", path: "/admin/orders" },
  ];

  const tabs =
    role === USER_ROLE.Admin
      ? adminTabs
      : role === USER_ROLE.Student
      ? studentTabs
      : [];

  // Add logout tab only if user is logged in
  if (user) {
    tabs.push({ label: "התנתקות", path: "/logout" });
  }

  // Determine selected tab
  const currentTab = tabs.findIndex((tab) =>
    location.pathname.startsWith(tab.path)
  );

  const handleTabClick = (path: string) => {
    if (path === "/logout") {
      logout();
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {/* Hamburger for mobile only */}
        {isMobile && user && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Logo */}
        <Typography variant="h6" sx={{ flexShrink: 0 }}>
          מערכת ההזמנות
        </Typography>

        {/* Tabs (desktop only) */}
        {user && (
          <Box sx={{ flexGrow: 1, display: isMobile ? "none" : "flex", mx: 2 }}>
            <Tabs
              value={currentTab}
              textColor="inherit"
              indicatorColor="secondary"
            >
              {tabs.map((tab, index) => (
                <Tab
                  key={index}
                  label={tab.label}
                  onClick={() => handleTabClick(tab.path)}
                />
              ))}
            </Tabs>
          </Box>
        )}

        {/* Cart icon for student */}
        {role === USER_ROLE.Student && (
          <IconButton color="inherit" onClick={() => navigate("/cart")}>
            <ShoppingCartIcon />
          </IconButton>
        )}

        {/* Hello user */}
        {user && (
          <Typography variant="body1" sx={{ ml: 2 }}>
            שלום {user.name}
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
