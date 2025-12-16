import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import styles from "./Header.module.scss";
import { useAuth } from "../../auth/useAuth";
import { useCartStore } from "../../store/cartStore";
import { useFavoritesStore } from "../../store/favoritesStore";

export function Header() {
  const { user } = useAuth();

  const cartCount = useCartStore((s) =>
    s.lines.reduce((sum, l) => sum + l.quantity, 0)
  );
  const favoritesCount = useFavoritesStore((s) => s.ids.length);

  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  if (!user) return null;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.left}>
          <button
            type="button"
            className={styles.burger}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
          </button>

          <NavLink to="/" className={styles.logo}>
            TestShop
          </NavLink>
        </div>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}>
          <NavLink
            to="/items"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }
          >
            Items
          </NavLink>

          <NavLink
            to="/orders"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }
          >
            Orders
          </NavLink>

          {user.role === "admin" && (
            <NavLink
              to="/admin"
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive ? styles.active : styles.link
              }
            >
              Admin
            </NavLink>
          )}
        </nav>

        <div className={styles.right}>
          {/* username -> profile */}
          <Link
            to="/profile"
            onClick={closeMenu}
            className={styles.userLink}
            title="Profile"
          >
            {user.first_name} {user.last_name}
          </Link>

          <NavLink
            to="/favorites"
            onClick={closeMenu}
            className={styles.iconBtn}
            aria-label="Favorites"
          >
            <span className={styles.icon}>♡</span>
            {favoritesCount > 0 && (
              <span className={styles.badge}>{favoritesCount}</span>
            )}
          </NavLink>

          <NavLink
            to="/cart"
            onClick={closeMenu}
            className={styles.iconBtn}
            aria-label="Cart"
          >
            <span className={styles.icon}>🛒</span>
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </NavLink>
        </div>
      </div>

      {/* mobile overlay click-to-close */}
      {menuOpen && (
        <button
          className={styles.backdrop}
          onClick={() => setMenuOpen(false)}
        />
      )}
    </header>
  );
}
