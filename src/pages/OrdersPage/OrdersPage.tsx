import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { apiFetch } from "../../api/apiClient";
import type { Order } from "../../types/Order";
import styles from "./OrdersPage.module.scss";
import { OrderCard } from "../../components/OrderCard";

type SortKey = "new" | "old" | "amount_desc" | "amount_asc";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "new", label: "Newest first" },
  { value: "old", label: "Oldest first" },
  { value: "amount_desc", label: "Amount: high → low" },
  { value: "amount_asc", label: "Amount: low → high" },
];

function toNumber(v: string | number): number {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : 0;
}

export function OrdersPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = (searchParams.get("sort") as SortKey) || "new";

  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        setError(null);
        setLoading(true);
        const data = await apiFetch<Order[]>("/orders");
        if (mounted) setOrders(data);
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

  const sorted = useMemo(() => {
    const copy = [...orders];

    copy.sort((a, b) => {
      const aTime = new Date(a.created_at).getTime();
      const bTime = new Date(b.created_at).getTime();
      const aAmount = toNumber(a.amount);
      const bAmount = toNumber(b.amount);

      switch (sort) {
        case "old":
          return aTime - bTime;
        case "amount_asc":
          return aAmount - bAmount;
        case "amount_desc":
          return bAmount - aAmount;
        case "new":
        default:
          return bTime - aTime;
      }
    });

    return copy;
  }, [orders, sort]);

  const onSortChange = (value: SortKey) => {
    const next = new URLSearchParams(searchParams);
    next.set("sort", value);
    setSearchParams(next, { replace: true });
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1>Orders</h1>
          <p className={styles.subtitle}>
            {orders.length ? `${orders.length} order(s)` : "No orders yet"}
          </p>
        </div>

        <div className={styles.controls}>
          <label className={styles.selectWrap}>
            <span className={styles.selectLabel}>Sort</span>
            <select
              className={styles.select}
              value={sort}
              onChange={(e) => onSortChange(e.target.value as SortKey)}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </header>

      {loading && <p className={styles.info}>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!loading &&
        !error &&
        (orders.length ? (
          <ul className={styles.list}>
            {sorted.map((order) => {
              return (
                <OrderCard
                  key={order.id}
                  order={order}
                  isOpen={expandedId === order.id}
                  onToggle={(id) =>
                    setExpandedId((cur) => (cur === id ? null : id))
                  }
                />
              );
            })}
          </ul>
        ) : (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>No orders yet</p>
            <p className={styles.emptyText}>
              Make your first order from the <Link to="/cart">cart</Link>.
            </p>
          </div>
        ))}
    </div>
  );
}
