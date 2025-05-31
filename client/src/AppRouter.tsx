import { Navigate, Routes, Route } from "react-router-dom";
import { Layout } from "./features/layout/Layout";
import { HomeScreen } from "./features/home/HomeScreen";
import MenuScreen from "./features/menu/MenuScreen";
import OrdersScreen from "./features/orders/OrdersScreen";
import FeedbackScreen from "./features/feedback/FeedbackScreen";
import LogoutScreen from "./features/auth/LogoutScreen";
import DashboardScreen from "./features/admin/DashboardScreen";
import ManageMenuScreen from "./features/admin/manageMenu/ManageMenuScreen";
import UsersScreen from "./features/admin/UsersScreen";
import AnalyticsScreen from "./features/admin/AnalyticsScreen";
import { LoginScreen } from "./features/auth/LoginScreen";
import { RegisterScreen } from "./features/auth/RegisterScreen";
import { authService } from "./features/auth/services/authService";
import { RequireAdmin } from "./features/auth/RequireAdmin";
import type { ReactElement } from "react";
import ManageOrdersScreen from "./features/admin/manageOrders/ManageOrdersScreen";
import CartScreen from "./features/menu/CartScreen";

function RequireAuth({ children }: { children: ReactElement }) {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

const AppRouter = () => (
  <Routes>
    <Route path="/login" element={<LoginScreen />} />
    <Route path="/register" element={<RegisterScreen />} />
    <Route
      path="/"
      element={
        <RequireAuth>
          <Layout />
        </RequireAuth>
      }
    >
      {/* Student routes */}
      <Route index element={<HomeScreen />} />
      <Route path="menu" element={<MenuScreen />} />
      <Route path="orders" element={<OrdersScreen />} />
      <Route path="feedback" element={<FeedbackScreen />} />
      <Route path="logout" element={<LogoutScreen />} />
      <Route path="cart" element={<CartScreen />} />
      {/* Admin routes */}
      <Route
        path="dashboard"
        element={
          <RequireAdmin>
            <DashboardScreen />
          </RequireAdmin>
        }
      />
      <Route
        path="manage-menu"
        element={
          <RequireAdmin>
            <ManageMenuScreen />
          </RequireAdmin>
        }
      />
      <Route
        path="manage-orders"
        element={
          <RequireAdmin>
            <ManageOrdersScreen />
          </RequireAdmin>
        }
      />
      <Route
        path="users"
        element={
          <RequireAdmin>
            <UsersScreen />
          </RequireAdmin>
        }
      />
      <Route
        path="analytics"
        element={
          <RequireAdmin>
            <AnalyticsScreen />
          </RequireAdmin>
        }
      />
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  </Routes>
);

export default AppRouter;
