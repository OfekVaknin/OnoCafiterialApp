import React from "react";
import { Routes, Route } from "react-router-dom";
import MenuGalleryPage from "../../features/Student/pages/MenuGallery/MenuGalleryPage";
import StudentOrdersPage from "../../features/Student/pages/StudentOrders/StudentOrdersPage";
import CartPage from "../../features/Student/pages/Cart/CartPage";
import DashboardPage from "../../features/Admin/pages/Dashboard/Dashboard";
import ManageCategoriesPage from "../../features/Admin/pages/ManageCategories/ManageCategoriesPage";
import ManageItemsPage from "../../features/Admin/pages/ManageItemsPage/ManageItemsPage";
import ManageOrdersPage from "../../features/Admin/pages/ManageOrders/ManageOrdersPage";
import LoginPage from "../../features/Auth/pages/Register/LoginPage";
import RegisterPage from "../../features/Auth/pages/Register/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import HomeRedirect from "./HomeRedirect";
import AddOrUpdateCategoryPage from "../../features/Admin/pages/ManageCategories/AddOrUpdateCategory/AddOrUpdateCategoryPage";
import AddOrUpdateItemPage from "../../features/Admin/pages/ManageItemsPage/AddOrUpdateItem/AddOrUpdateItemPage";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Redirect to role-based landing */}
      <Route path="/" element={<HomeRedirect />} />

      {/* Student Routes */}
      <Route
        path="/menu"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <MenuGalleryPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <StudentOrdersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <CartPage />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/categories"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <ManageCategoriesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/categories/add"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AddOrUpdateCategoryPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/categories/edit/:id"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AddOrUpdateCategoryPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/items"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <ManageItemsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/items/add"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AddOrUpdateItemPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/items/edit/:id"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AddOrUpdateItemPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/orders"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <ManageOrdersPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
