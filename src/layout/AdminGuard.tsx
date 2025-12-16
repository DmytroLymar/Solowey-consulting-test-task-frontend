import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export function AdminGuard() {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "admin") return <Navigate to="/items" replace />;

  return <Outlet />;
}
