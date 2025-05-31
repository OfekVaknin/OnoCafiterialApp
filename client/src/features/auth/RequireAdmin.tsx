import { Navigate } from 'react-router-dom';
import { authService } from './services/authService';
import { UserRoleEnum } from '../user/enums/UserRoleEnum';
import type { ReactElement } from 'react';

interface RequireAdminProps {
  children: ReactElement;
}

export function RequireAdmin({ children }: RequireAdminProps) {
  const user = authService.getCurrentUser();
  if (!user || user.role !== UserRoleEnum.Admin) {
    return <Navigate to="/" replace />;
  }
  return children;
}
