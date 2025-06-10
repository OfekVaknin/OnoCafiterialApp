// components/Header/useHeaderTabs.ts
import { useAuthStore } from "../../Auth/store/useAuthStore";
import { useLocation } from "react-router-dom";
import { USER_ROLE } from "../../Auth/enums/UserRole.enum";

const useHeaderTabs = () => {
  const { user } = useAuthStore();
  const location = useLocation();
  const role = user?.role ?? null;

  const studentTabs = [
    { label: "תפריט", path: "/menu" },
    { label: "הזמנות שלי", path: "/orders" },
    { label: "עזרה", path: "/guide" },
  ];

  const adminTabs = [
    { label: "דשבורד", path: "/admin/dashboard" },
    { label: "קטגוריות", path: "/admin/categories" },
    { label: "פריטים", path: "/admin/items" },
    { label: "הזמנות", path: "/admin/orders" },
    { label: "עזרה", path: "/admin/guide" },
  ];

  const tabs =
    role === USER_ROLE.Admin
      ? [...adminTabs]
      : role === USER_ROLE.Student
      ? [...studentTabs]
      : [];

  if (user) {
    tabs.push({ label: "התנתקות", path: "/logout" });
  }

  const currentTab = tabs.findIndex((tab) =>
    location.pathname.startsWith(tab.path)
  );

  return { tabs, currentTab };
};

export default useHeaderTabs;
