import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import { useAuth } from "../../auth/useAuth";

export function Header() {
  const { user, logout } = useAuth();

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
            to="/cart"
            className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }
          >
            Cart
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
        </div>
      </div>
    </header>
  );
}
