import { Link, useLocation, Navigate } from "react-router-dom";
import styles from "./CheckoutSuccessPage.module.scss";

type SuccessState = {
  orderId: string;
  amount: number | string;
  itemsCount: number;
};

export function CheckoutSuccessPage() {
  const location = useLocation();
  const state = location.state as SuccessState | null;

  if (!state) {
    return <Navigate to="/orders" replace />;
  }

  const amount = Number(state.amount);

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.icon}>✅</div>

        <h1 className={styles.title}>Thank you for your order!</h1>

        <p className={styles.subtitle}>
          Your order has been successfully placed.
        </p>

        <div className={styles.info}>
          <div className={styles.row}>
            <span>Order ID</span>
            <b>{state.orderId}</b>
          </div>

          <div className={styles.row}>
            <span>Items</span>
            <b>{state.itemsCount}</b>
          </div>

          <div className={styles.row}>
            <span>Total amount</span>
            <b>${(Number.isFinite(amount) ? amount : 0).toFixed(2)}</b>
          </div>
        </div>

        <div className={styles.actions}>
          <Link to="/orders" className={styles.primaryBtn}>
            View orders
          </Link>

          <Link to="/items" className={styles.secondaryBtn}>
            Continue shopping
          </Link>
        </div>

        <p className={styles.note}>
          You can always check your order status on the Orders page.
        </p>
      </div>
    </div>
  );
}
