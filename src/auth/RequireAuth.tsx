import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";

export function RequireAuth() {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div style={{ padding: 16 }}>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
