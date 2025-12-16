import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "../../api/apiClient";
import type { Item } from "../../types/Item";
import { useFavoritesStore } from "../../store/favoritesStore";
import { ItemsGrid } from "../../components/ItemsGrid/ItemsGrid";
import styles from "./FavoritesPage.module.scss";

export function FavoritesPage() {
  const favoriteIds = useFavoritesStore((s) => s.ids);

  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadItems = async () => {
      try {
        setError(null);
        setLoading(true);

        const data = await apiFetch<Item[]>("/items");

        if (isMounted) setItems(data);
      } catch (err) {
        if (isMounted) setError((err as Error).message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadItems();

    return () => {
      isMounted = false;
    };
  }, []);

  const favorites = useMemo(() => {
    if (!favoriteIds.length) return [];
    const set = new Set(favoriteIds);
    return items.filter((it) => set.has(it.id));
  }, [items, favoriteIds]);

  return (
    <div>
      <header className={styles.header}>
        <h1>Favorites</h1>
        <p className={styles.subtitle}>
          {favoriteIds.length
            ? `${favoriteIds.length} item(s)`
            : "No favorites yet"}
        </p>
      </header>

      {loading && <p className={styles.info}>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!loading &&
        !error &&
        (favorites.length ? (
          <ItemsGrid items={favorites} />
        ) : (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>No favorites yet</p>
            <p className={styles.emptyText}>
              Add items to favorites by clicking ♡ on the catalog.
            </p>
          </div>
        ))}
    </div>
  );
}
