import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';

export function ProtectedRoute() {
  const { isConnected } = useAuth();

  if (!isConnected) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
