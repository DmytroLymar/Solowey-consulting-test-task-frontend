import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./useAuth";
import { ServerStartingPage } from "../components/ServerStartingPage";

export function RedirectIfAuth() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <ServerStartingPage />;
  }

  if (user) {
    return <Navigate to="/items" replace />;
  }

  return <Outlet />;
}
