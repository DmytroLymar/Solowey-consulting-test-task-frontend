import { useMemo, useState } from "react";
import { useCartStore } from "../../store/cartStore";
import { Link, useNavigate } from "react-router-dom";
import styles from "./CartPage.module.scss";
import { CartItemRow } from "../../components/CartItemRow";
import toast from "react-hot-toast";
import { apiFetch } from "../../api/apiClient";

export function CartPage() {
  const navigate = useNavigate();

  const lines = useCartStore((s) => s.lines);
  const inc = useCartStore((s) => s.inc);
  const dec = useCartStore((s) => s.dec);
  const remove = useCartStore((s) => s.remove);
  const clear = useCartStore((s) => s.clear);

  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity * l.item.price, 0),
    [lines]
  );

  const itemsCount = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines]
  );

  const handleCheckout = async () => {
    if (!lines.length || isCheckingOut) return;

    try {
      setIsCheckingOut(true);

      const payload = {
        items: lines.map((l) => ({
          item_id: l.item.id,
          quantity: l.quantity,
        })),
      };

      const order = await apiFetch<{
        id: string;
        amount: number;
        order_descriptions: { quantity: number }[];
      }>("/orders", {
        method: "POST",
        body: payload,
      });

      clear();
      toast.success("Order created!");

      navigate("/checkout/success", {
        replace: true,
        state: {
          orderId: order.id,
          amount: order.amount,
          itemsCount: order.order_descriptions.reduce(
            (sum, d) => sum + d.quantity,
            0
          ),
        },
      });
    } catch (e) {
      toast.error((e as Error).message || "Checkout failed");
    } finally {
      setIsCheckingOut(false);
    }
  };

  const total = subtotal;

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

            <div className={styles.blockTitle}>Promo code</div>
            <div className={styles.promo}>
              <input className={styles.promoInput} placeholder="Enter code" />
              <button className={styles.promoBtn} type="button" disabled>
                Apply
              </button>
            </div>
            <p className={styles.hint}>Template only (no logic yet)</p>

            <div className={styles.divider} />

            <div className={styles.summaryRowTotal}>
              <span>Total</span>
              <b>${total.toFixed(2)}</b>
            </div>

            <button
              className={styles.checkoutBtn}
              type="button"
              onClick={handleCheckout}
              disabled={isCheckingOut}
            >
              {isCheckingOut ? "Processing..." : "Checkout"}
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
