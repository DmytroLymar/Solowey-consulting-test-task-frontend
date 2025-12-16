import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import { useAuth } from "../../auth/useAuth";
import { useCartStore } from "../../store/cartStore";
import { useFavoritesStore } from "../../store/favoritesStore";

export function Header() {
  const { user, logout } = useAuth();

  const cartCount = useCartStore((s) =>
    s.lines.reduce((sum, l) => sum + l.quantity, 0)
  );
  const favoritesCount = useFavoritesStore((s) => s.ids.length);

  if (!user) {
    return null;
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.logo}>
          TestShop
        </NavLink>

        <nav className={styles.nav}>
          <NavLink
            to="/items"
            className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }
          >
            Items
          </NavLink>

          <NavLink
            to="/orders"
            className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }
          >
            Orders
          </NavLink>

          {user.role === "admin" && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive ? styles.active : styles.link
              }
            >
              Admin
            </NavLink>
          )}
        </nav>

        <div className={styles.right}>
          <span className={styles.user}>
            {user.first_name} {user.last_name}
          </span>

          <button type="button" className={styles.btn} onClick={logout}>
            Logout
          </button>

          {/* Favorites */}
          <NavLink to="/favorites" className={styles.iconBtn}>
            <span className={styles.icon}>♡</span>
            {favoritesCount > 0 && (
              <span className={styles.badge}>{favoritesCount}</span>
            )}
          </NavLink>

          {/* Cart */}
          <NavLink to="/cart" className={styles.iconBtn}>
            <span className={styles.icon}>🛒</span>
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </NavLink>
        </div>
      </div>
    </header>
  );
}
