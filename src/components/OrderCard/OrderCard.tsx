import { Link } from "react-router-dom";
import styles from "./OrderCard.module.scss";
import type { Order } from "../../types/Order";

type OrderCardProps = {
  order: Order;
  isOpen: boolean;
  onToggle: (id: string) => void;
};

function toNumber(v: string | number): number {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : 0;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString();
}

export function OrderCard({ order, isOpen, onToggle }: OrderCardProps) {
  const itemsCount = order.order_descriptions.reduce(
    (sum, d) => sum + Number(d.quantity || 0),
    0
  );
  const amount = toNumber(order.amount);

  return (
    <li className={styles.card}>
      <button
        type="button"
        className={styles.cardHead}
        onClick={() => onToggle(order.id)}
        aria-expanded={isOpen}
      >
        <div className={styles.headLeft}>
          <div className={styles.orderId}>
            Order <span className={styles.mono}>#{order.id.slice(0, 8)}</span>
          </div>
          <div className={styles.meta}>
            <span>{formatDate(order.created_at)}</span>
            <span className={styles.dot}>•</span>
            <span>{itemsCount} item(s)</span>
          </div>
        </div>

        <div className={styles.headRight}>
          <div className={styles.amount}>${amount.toFixed(2)}</div>
          <div className={styles.chev}>{isOpen ? "▲" : "▼"}</div>
        </div>
      </button>

      {isOpen && (
        <div className={styles.details}>
          <div className={styles.detailsHead}>
            <div className={styles.detailsTitle}>Items</div>
            <div className={styles.detailsHint}>Click item to open product</div>
          </div>

          <ul className={styles.items}>
            {order.order_descriptions.map((d) => {
              if (!d.item) {
                return (
                  <li key={d.id} className={styles.itemRow}>
                    <div className={styles.itemMain}>
                      <span className={styles.deleted}>
                        Deleted item (id: {d.item_id.slice(0, 8)}…)
                      </span>
                      <div className={styles.itemSub}>× {d.quantity}</div>
                    </div>
                    <div className={styles.itemTotal}>—</div>
                  </li>
                );
              }

              const price = toNumber(d.unit_price);
              const lineTotal = price * d.quantity;

              return (
                <li key={d.id} className={styles.itemRow}>
                  <div className={styles.itemMain}>
                    <Link
                      to={`/items/${d.item.id}`}
                      className={styles.itemName}
                    >
                      {d.item.name}
                    </Link>
                    <div className={styles.itemSub}>
                      ${price.toFixed(2)} × {d.quantity}
                    </div>
                  </div>
                  <div className={styles.itemTotal}>
                    ${lineTotal.toFixed(2)}
                  </div>
                </li>
              );
            })}
          </ul>

          <div className={styles.totalRow}>
            <span>Total</span>
            <b>${amount.toFixed(2)}</b>
          </div>
        </div>
      )}
    </li>
  );
}
