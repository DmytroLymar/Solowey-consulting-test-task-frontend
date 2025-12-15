import { Navigate, Route, Routes } from "react-router-dom";
import { RequireAuth } from "./auth/RequireAuth";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";
import { ItemsPage } from "./pages/ItemsPage/ItemsPage";
import { useAuth } from "./auth/useAuth";

export default function App() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div style={{ padding: 16 }}>Loading...</div>;

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={user ? "/items" : "/login"} replace />}
      />

      <Route
        path="/login"
        element={user ? <Navigate to="/items" replace /> : <LoginPage />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to="/items" replace /> : <RegisterPage />}
      />

      {/* Protected */}
      <Route element={<RequireAuth />}>
        <Route path="/items" element={<ItemsPage />} />
      </Route>

      <Route path="*" element={<div style={{ padding: 16 }}>Not found</div>} />
    </Routes>
  );
}
