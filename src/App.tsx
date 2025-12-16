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
import { FavoritesPage } from "./pages/FavoritesPage";
import { ItemDetailsPage } from "./pages/ItemDetailsPage";
import { ProfilePage } from "./pages/ProfilePage";
import { CheckoutSuccessPage } from "./pages/CheckoutSuccessPage";
import { AdminLayout } from "./layout/AdminLayout";
import { AdminUsersPage } from "./pages/AdminUsersPage";
import { AdminItemsPage } from "./pages/AdminItemsPage";
import { AdminGuard } from "./layout/AdminGuard";

export default function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route element={<RedirectIfAuth />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Route>

      <Route element={<RequireAuth />}>
        <Route element={<AppLayout />}>
          <Route path="" element={<HomePage />} />
          <Route path="items">
            <Route index element={<ItemsPage />} />
            <Route path=":id" element={<ItemDetailsPage />} />
          </Route>
          <Route path="cart" element={<CartPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="checkout/success" element={<CheckoutSuccessPage />} />
          <Route path="/admin" element={<AdminGuard />}>
            <Route index element={<AdminPage />} />

            <Route element={<AdminLayout />}>
              <Route path="users" element={<AdminUsersPage />} />
              <Route path="items" element={<AdminItemsPage />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>

      <Route path="home" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
