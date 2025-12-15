import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./useAuth";

export function RedirectIfAuth() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div style={{ padding: 16 }}>Loading...</div>;
  }

  if (user) {
    return <Navigate to="/items" replace />;
  }

  return <Outlet />;
}
