import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "../../api/apiClient";
import type { Item } from "../../types/Item";
import { ItemsGrid } from "../../components/ItemsGrid";
import styles from "./ItemsPage.module.scss";
import { useSearchParams } from "react-router-dom";
import { ItemsFilters } from "../../components/ItemsFilters/ItemsFilters";

type SortValue = "name_asc" | "name_desc" | "price_asc" | "price_desc";

export function ItemsPage() {
  const [searchParams] = useSearchParams();

  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const q = (searchParams.get("q") ?? "").trim();
  const sort = (searchParams.get("sort") as SortValue) ?? "name_asc";

  useEffect(() => {
    let isMounted = true;

    const loadItems = async () => {
      try {
        setError(null);
        setLoading(true);

        const path = q ? `/items/search?q=${encodeURIComponent(q)}` : "/items";

        const data = await apiFetch<Item[]>(path);

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
  }, [q]);

  const visibleItems = useMemo(() => {
    const sorted = [...items];

    sorted.sort((a, b) => {
      switch (sort) {
        case "name_asc":
          return (a.name ?? "").localeCompare(b.name ?? "");
        case "name_desc":
          return (b.name ?? "").localeCompare(a.name ?? "");
        case "price_asc":
          return Number(a.price) - Number(b.price);
        case "price_desc":
          return Number(b.price) - Number(a.price);
        default:
          return 0;
      }
    });

    return sorted;
  }, [items, sort]);

  return (
    <div>
      <header className={styles.header}>
        <h1>Items</h1>
      </header>

      <ItemsFilters total={visibleItems.length} />

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.gridWrap}>
        <ItemsGrid items={visibleItems} />

        {loading && (
          <div className={styles.overlay} aria-live="polite" aria-busy="true">
            <div className={styles.spinner} />
            <div className={styles.overlayText}>Loading items…</div>
            <div className={styles.overlaySubtext}>
              Server may take a few seconds to respond.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
