import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "../../api/apiClient";
import type { Item } from "../../types/Item";
import { ItemsGrid } from "../../components/ItemsGrid";
import styles from "./ItemsPage.module.scss";
import { useSearchParams } from "react-router-dom";
import { ItemsFilters } from "../../components/ItemsFilters/ItemsFilters";

type SortValue = "name_asc" | "name_desc" | "price_asc" | "price_desc";

function normalize(s: string) {
  return s.trim().toLowerCase();
}

export function ItemsPage() {
  const [searchParams] = useSearchParams();

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

        if (isMounted) {
          setItems(data);
        }
      } catch (err) {
        if (isMounted) {
          setError((err as Error).message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadItems();

    return () => {
      isMounted = false;
    };
  }, []);

  const visibleItems = useMemo(() => {
    const q = normalize(searchParams.get("q") ?? "");
    const sort = (searchParams.get("sort") as SortValue) ?? "name_asc";

    // filter
    let result = items;
    if (q) {
      result = result.filter((it) => {
        const hay = `${it.name ?? ""} ${it.description ?? ""}`;
        return normalize(hay).includes(q);
      });
    }

    const sorted = [...result];
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
  }, [items, searchParams]);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Items</h1>
      </header>

      {loading && <p className={styles.subtitle}>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!loading && !error && (
        <>
          <ItemsFilters total={visibleItems.length} />
          <ItemsGrid items={visibleItems} />
        </>
      )}
    </div>
  );
}
