import { Link } from "react-router-dom";
import styles from "./AdminPage.module.scss";

export function AdminPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Admin Dashboard</h1>
        <p className={styles.subtitle}>Manage users and items in the system</p>
      </header>

      <div className={styles.cards}>
        <Link to="/admin/users" className={styles.card}>
          <h3>Users</h3>
          <p>View and edit users, change roles</p>
        </Link>

        <Link to="/admin/items" className={styles.card}>
          <h3>Items</h3>
          <p>Create, update and delete products</p>
        </Link>
      </div>
    </div>
  );
}
