import React from "react";
import { Navigate } from "react-router-dom";
import type { UserRoleEnum } from "../../features/Auth/enums/UserRole.enum";
import { useAuthStore } from "../../features/Auth/store/useAuthStore";

interface Props {
  children: React.ReactNode;
  allowedRoles?: UserRoleEnum[]; // optional filter by role
}

const ProtectedRoute: React.FC<Props> = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user!.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
