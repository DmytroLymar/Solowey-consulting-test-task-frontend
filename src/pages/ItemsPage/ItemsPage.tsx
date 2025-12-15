import { useState } from "react";
import { apiFetch } from "../../api/apiClient";
import type { Item } from "../../types/Item";
import { useAuth } from "../../auth/useAuth";
import styles from "./ItemsPage.module.scss";

export function ItemsPage() {
  const { user, logout } = useAuth();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadItems = async () => {
    try {
      setError(null);
      setLoading(true);
      const data = await apiFetch<Item[]>("/items");
      setItems(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1>Items</h1>
          <p className={styles.subtitle}>
            Logged in as {user?.email} ({user?.role})
          </p>
        </div>

        <button onClick={() => logout()}>Logout</button>
      </header>

      <div className={styles.actions}>
        <button onClick={loadItems} disabled={loading}>
          {loading ? "Loading..." : "Load items"}
        </button>

        {error && <p className={styles.error}>{error}</p>}
      </div>

      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.id} className={styles.card}>
            <h3 className={styles.itemTitle}>{item.name}</h3>
            <p className={styles.itemDesc}>{item.description}</p>
            <p className={styles.itemPrice}>Price: ${item.price}</p>

            {item.image_url && (
              <img
                src={item.image_url}
                alt={item.name}
                className={styles.image}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
