// src/pages/AdminItemsPage/ItemRow.tsx
import styles from "./AdminItemsPage.module.scss";
import type { Item } from "./types";

type Props = {
  item: Item;
  isSaving: boolean;
  onEdit: (item: Item) => void;
  onDelete: () => void;
};

export function ItemRow({ item, isSaving, onEdit, onDelete }: Props) {
  const priceNum = Number(item.price);
  const shortId = String(item.id).slice(0, 8);
  return (
    <div className={styles.tr}>
      <span className={styles.id} title={item.id}>
        {shortId}…
      </span>

      <span className={styles.text}>{item.name}</span>

      <span className={styles.textMuted}>{item.description || "—"}</span>

      <span className={styles.price}>
        {Number.isFinite(priceNum) ? priceNum.toFixed(2) : "—"}
      </span>

      <div className={styles.rowBtns}>
        <button
          className={styles.btn}
          onClick={() => onEdit(item)}
          disabled={isSaving}
          type="button"
        >
          Edit
        </button>

        <button
          className={styles.dangerBtn}
          onClick={onDelete}
          disabled={isSaving}
          type="button"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
