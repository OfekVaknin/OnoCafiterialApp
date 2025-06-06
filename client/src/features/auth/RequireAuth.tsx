import { Navigate } from 'react-router-dom';
import type { ReactElement } from 'react';
import { useAuth } from '../../context/AuthContext';

interface RequireAuthProps {
  children: ReactElement;
}

export function RequireAuth({ children }: RequireAuthProps) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}