import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../../api/apiClient";
import type { Item } from "../../types/Item";
import { ItemsGrid } from "../ItemsGrid/ItemsGrid";
import styles from "./FeaturedItems.module.scss";

type FeaturedItemsProps = {
  title?: string;
  limit?: number;
};

export function FeaturedItems({
  title = "Featured items",
  limit = 4,
}: FeaturedItemsProps) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        setError(null);
        setLoading(true);

        const data = await apiFetch<Item[]>("/items");

        if (mounted) setItems(data);
      } catch (e) {
        if (mounted) setError((e as Error).message);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, []);

  const featured = useMemo(() => {
    return items.slice(0, limit);
  }, [items, limit]);

  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <h2 className={styles.title}>{title}</h2>

        <Link className={styles.link} to="/items">
          See all →
        </Link>
      </div>

      {loading && <p className={styles.info}>Loading featured items...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!loading &&
        !error &&
        (featured.length ? (
          <ItemsGrid items={featured} />
        ) : (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>No items yet</p>
            <p className={styles.emptyText}>
              Add some items in seeds to see featured products.
            </p>
          </div>
        ))}
    </section>
  );
}
