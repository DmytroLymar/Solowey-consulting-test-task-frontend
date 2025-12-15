import { Navigate, Route, Routes } from "react-router-dom";

import { AppLayout } from "./layout/AppLayout/AppLayout";
import { AuthLayout } from "./layout/AuthLayout";

import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";

import { HomePage } from "./pages/HomePage";
import { ItemsPage } from "./pages/ItemsPage";
import { CartPage } from "./pages/CartPage";
import { OrdersPage } from "./pages/OrdersPage";
import { AdminPage } from "./pages/AdminPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { RequireAuth } from "./auth/RequireAuth";
import { RedirectIfAuth } from "./auth/RedirectIfAuth";

export default function App() {
  return (
    <Routes>
      {/* 🔐 AUTH PAGES (без header/footer) */}
      <Route element={<AuthLayout />}>
        <Route element={<RedirectIfAuth />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Route>

      {/* 🧱 MAIN APP (з header/footer) */}
      <Route element={<RequireAuth />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/items" element={<ItemsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>

      {/* optional redirects */}
      <Route path="/home" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
