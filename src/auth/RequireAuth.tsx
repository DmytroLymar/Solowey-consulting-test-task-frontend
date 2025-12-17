import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";
import { ServerStartingPage } from "../components/ServerStartingPage";

export function RequireAuth() {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div style={{ padding: 16 }}>
        <h2>ServerStartingPage should be here</h2>
        <pre>{JSON.stringify({ isLoading, user }, null, 2)}</pre>
        <ServerStartingPage />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
