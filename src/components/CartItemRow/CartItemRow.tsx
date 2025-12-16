import { Link } from "react-router-dom";
import styles from "./CartItemRow.module.scss";

export type CartItemRowData = {
  itemId: string;
  quantity: number;
  item: {
    id: string;
    name: string;
    price: number;
    image_url: string | null;
  };
};

type CartItemRowProps = {
  line: CartItemRowData;
  onInc: (itemId: string) => void;
  onDec: (itemId: string) => void;
  onRemove: (itemId: string) => void;
};

export function CartItemRow({
  line,
  onInc,
  onDec,
  onRemove,
}: CartItemRowProps) {
  const productLink = `/items/${line.item.id}`;
  const lineTotal = line.item.price * line.quantity;

  return (
    <li className={styles.row}>
      <Link
        to={productLink}
        className={styles.imageLink}
        aria-label={line.item.name}
      >
        {line.item.image_url ? (
          <img
            className={styles.image}
            src={line.item.image_url}
            alt={line.item.name}
          />
        ) : (
          <div className={styles.imageFallback} aria-hidden="true">
            No image
          </div>
        )}
      </Link>

      <div className={styles.info}>
        <Link to={productLink} className={styles.name}>
          {line.item.name}
        </Link>

        <div className={styles.meta}>
          <span className={styles.price}>${line.item.price.toFixed(2)}</span>
          <span className={styles.dot}>•</span>
          <span className={styles.lineTotal}>${lineTotal.toFixed(2)}</span>
        </div>

        <div className={styles.controls}>
          <div className={styles.qty}>
            <button
              type="button"
              className={styles.qtyBtn}
              onClick={() => onDec(line.itemId)}
              aria-label="Decrease quantity"
            >
              −
            </button>

            <span className={styles.qtyValue}>{line.quantity}</span>

            <button
              type="button"
              className={styles.qtyBtn}
              onClick={() => onInc(line.itemId)}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <button
            type="button"
            className={styles.removeBtn}
            onClick={() => onRemove(line.itemId)}
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}
