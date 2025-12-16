import { NavLink, Outlet } from "react-router-dom";
import styles from "./AdminLayout.module.scss";

export function AdminLayout() {
  return (
    <div className={styles.page}>
      <aside className={styles.sidebar}>
        <h2 className={styles.brand}>Admin</h2>

        <nav className={styles.nav}>
          <NavLink
            to="/admin/users"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Users
          </NavLink>
          <NavLink
            to="/admin/items"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Items
          </NavLink>
        </nav>
      </aside>

      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}
