import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";

export function Header() {
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
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }
          >
            Admin
          </NavLink>
        </nav>

        <div className={styles.right}>
          {/* заглушка під auth */}
          <span className={styles.user}>guest</span>
          <button type="button" className={styles.btn}>
            Login
          </button>
        </div>
      </div>
    </header>
  );
}
