// components/Header/Header.tsx
import React from "react";
import { AppBar, Toolbar, IconButton, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuthStore } from "../Auth/store/useAuthStore";
import HeaderLogo from "./components/HeaderLogo";
import HeaderTabs from "./components/HeaderTabs";
import HeaderCartButton from "./components/HeaderCartButton";
import HeaderGreeting from "./components/HeaderGreeting";

const Header: React.FC = () => {
  const { user } = useAuthStore();
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
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
        <HeaderLogo />
        {user && <HeaderTabs isMobile={isMobile} />}
        <HeaderCartButton />
        <HeaderGreeting />
      </Toolbar>
    </AppBar>
  );
};

export default Header;

// import React from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Box,
//   IconButton,
//   Tabs,
//   Tab,
//   useMediaQuery,
//   Badge,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useAuthStore } from "../Auth/store/useAuthStore";
// import { USER_ROLE, type UserRoleEnum } from "../Auth/enums/UserRole.enum";
// import { useCartStore } from "../Student/store/useCartStore";

// const Header: React.FC = () => {
//   const { user, logout } = useAuthStore();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const isMobile = useMediaQuery("(max-width:600px)");
//   const role: UserRoleEnum | null = user?.role ?? null;

//   const cartItems = useCartStore((state) => state.items);
//   const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

//   // Navigation tabs by role
//   const studentTabs = [
//     { label: "תפריט", path: "/menu" },
//     { label: "הזמנות שלי", path: "/orders" },
//     { label: "עזרה", path: "/guide" },
//   ];

//   const adminTabs = [
//     { label: "דשבורד", path: "/admin/dashboard" },
//     { label: "קטגוריות", path: "/admin/categories" },
//     { label: "פריטים", path: "/admin/items" },
//     { label: "הזמנות", path: "/admin/orders" },
//     { label: "עזרה", path: "/admin/guide" },
//   ];

//   const tabs =
//     role === USER_ROLE.Admin
//       ? adminTabs
//       : role === USER_ROLE.Student
//       ? studentTabs
//       : [];

//   // Add logout tab only if user is logged in
//   if (user) {
//     tabs.push({ label: "התנתקות", path: "/logout" });
//   }

//   // Determine selected tab
//   const currentTab = tabs.findIndex((tab) =>
//     location.pathname.startsWith(tab.path)
//   );

//   const handleTabClick = (path: string) => {
//     if (path === "/logout") {
//       logout();
//       navigate("/login");
//     } else {
//       navigate(path);
//     }
//   };

//   return (
//     <AppBar position="static" color="primary">
//       <Toolbar>
//         {/* Hamburger for mobile only */}
//         {isMobile && user && (
//           <IconButton
//             edge="start"
//             color="inherit"
//             aria-label="menu"
//             sx={{ mr: 2 }}
//           >
//             <MenuIcon />
//           </IconButton>
//         )}

//         {/* Logo */}
//         <Typography variant="h6" sx={{ flexShrink: 0 }}>
//           מערכת ההזמנות
//         </Typography>

//         {/* Tabs (desktop only) */}
//         {user && (
//           <Box sx={{ flexGrow: 1, display: isMobile ? "none" : "flex", mx: 2 }}>
//             <Tabs
//               value={currentTab}
//               textColor="inherit"
//               indicatorColor="secondary"
//             >
//               {tabs.map((tab, index) => (
//                 <Tab
//                   key={index}
//                   label={tab.label}
//                   onClick={() => handleTabClick(tab.path)}
//                 />
//               ))}
//             </Tabs>
//           </Box>
//         )}

//         {/* Cart icon for student */}
//         {role === USER_ROLE.Student && (
//           <IconButton color="inherit" onClick={() => navigate("/cart")}>
//             <Badge badgeContent={cartCount} color="error">
//               <ShoppingCartIcon />
//             </Badge>
//           </IconButton>
//         )}

//         {/* Hello user */}
//         {user && (
//           <Typography variant="body1" sx={{ ml: 2 }}>
//             שלום {user.name}
//           </Typography>
//         )}
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Header;
