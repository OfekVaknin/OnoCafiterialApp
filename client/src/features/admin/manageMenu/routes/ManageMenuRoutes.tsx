import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ManageMenuScreen from "../ManageMenuScreen";
import { CategorySection } from "../CategorySection";
import { MenuItemSection } from "../MenuItemSection";

const ManageMenuRoutes = () => (
  <Routes>
    <Route path="/" element={<ManageMenuScreen />}>
      <Route index element={<Navigate to="categories" replace />} />
      <Route path="categories" element={<CategorySection />} />
      <Route path="items" element={<MenuItemSection />} />
    </Route>
  </Routes>
);

export default ManageMenuRoutes;
