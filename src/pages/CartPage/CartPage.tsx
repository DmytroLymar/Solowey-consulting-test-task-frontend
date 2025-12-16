import { useMemo, useState } from "react";
import { useCartStore } from "../../store/cartStore";
import { Link } from "react-router-dom";
import styles from "./CartPage.module.scss";
import { CartItemRow } from "../../components/CartItemRow";

type Shipping = "pickup" | "courier" | "express";

const SHIPPING_PRICE: Record<Shipping, number> = {
  pickup: 0,
  courier: 5,
  express: 12,
};

export function CartPage() {
  const lines = useCartStore((s) => s.lines);
  const inc = useCartStore((s) => s.inc);
  const dec = useCartStore((s) => s.dec);
  const remove = useCartStore((s) => s.remove);
  const clear = useCartStore((s) => s.clear);

  const [shipping, setShipping] = useState<Shipping>("courier");

  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity * l.item.price, 0),
    [lines]
  );

  const itemsCount = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines]
  );

  const shippingCost = SHIPPING_PRICE[shipping];
  const total = subtotal + shippingCost;

  if (!lines.length) {
    return (
      <div className={styles.page}>
        <header className={styles.header}>
          <h1>Cart</h1>
          <p className={styles.subtitle}>Your cart is empty</p>
        </header>

        <div className={styles.empty}>
          <p className={styles.emptyTitle}>No items yet</p>
          <p className={styles.emptyText}>
            Go to <Link to="/items">Items</Link> and add something to your cart.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1>Cart</h1>
          <p className={styles.subtitle}>{itemsCount} item(s)</p>
        </div>

        <button className={styles.clearBtn} type="button" onClick={clear}>
          Clear cart
        </button>
      </header>

      <div className={styles.layout}>
        {/* LEFT: items */}
        <section className={styles.left} aria-label="Cart items">
          <ul className={styles.list}>
            {lines.map((line) => (
              <CartItemRow
                key={line.itemId}
                line={line}
                onInc={inc}
                onDec={dec}
                onRemove={remove}
              />
            ))}
          </ul>
        </section>

        {/* RIGHT: summary */}
        <aside className={styles.right} aria-label="Order summary">
          <div className={styles.summaryCard}>
            <h2 className={styles.summaryTitle}>Order summary</h2>

            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <b>${subtotal.toFixed(2)}</b>
            </div>

            <div className={styles.divider} />

            <div className={styles.blockTitle}>Delivery</div>
            <div className={styles.radios}>
              <label className={styles.radio}>
                <input
                  type="radio"
                  name="shipping"
                  value="pickup"
                  checked={shipping === "pickup"}
                  onChange={() => setShipping("pickup")}
                />
                <span>Pickup (free)</span>
                <span className={styles.muted}>$0</span>
              </label>

              <label className={styles.radio}>
                <input
                  type="radio"
                  name="shipping"
                  value="courier"
                  checked={shipping === "courier"}
                  onChange={() => setShipping("courier")}
                />
                <span>Courier (2–3 days)</span>
                <span className={styles.muted}>$5</span>
              </label>

              <label className={styles.radio}>
                <input
                  type="radio"
                  name="shipping"
                  value="express"
                  checked={shipping === "express"}
                  onChange={() => setShipping("express")}
                />
                <span>Express (next day)</span>
                <span className={styles.muted}>$12</span>
              </label>
            </div>

            <div className={styles.divider} />

            <div className={styles.blockTitle}>Promo code</div>
            <div className={styles.promo}>
              <input className={styles.promoInput} placeholder="Enter code" />
              <button className={styles.promoBtn} type="button" disabled>
                Apply
              </button>
            </div>
            <p className={styles.hint}>Template only (no logic yet)</p>

            <div className={styles.divider} />

            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <b>${shippingCost.toFixed(2)}</b>
            </div>

            <div className={styles.summaryRowTotal}>
              <span>Total</span>
              <b>${total.toFixed(2)}</b>
            </div>

            <button className={styles.checkoutBtn} type="button">
              Checkout
            </button>

            <p className={styles.smallNote}>
              Payment & delivery details will be added later.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
