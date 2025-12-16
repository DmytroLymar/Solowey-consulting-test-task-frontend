// src/pages/AdminItemsPage/EditItemForm.tsx
import { useState } from "react";
import styles from "./AdminItemsPage.module.scss";
import type { Item, ItemPatch } from "./types";

type Props = {
  item: Item;
  isSaving: boolean;
  onCancel: () => void;
  onSave: (patch: ItemPatch) => Promise<void>;
};

export function EditItemForm({ item, isSaving, onCancel, onSave }: Props) {
  const [name, setName] = useState(() => item.name);
  const [desc, setDesc] = useState(() => item.description ?? "");
  const [price, setPrice] = useState(() => String(item.price));
  const [imageUrl, setImageUrl] = useState(() => item.image_url ?? "");

  const priceNum = Number(price);
  const canSave = name.trim() && Number.isFinite(priceNum);

  return (
    <div className={styles.modalForm}>
      <label className={styles.field}>
        <span className={styles.label}>Name</span>
        <input
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Description</span>
        <textarea
          className={styles.textarea}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          rows={5}
          placeholder="Item description..."
        />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Price</span>
        <input
          className={styles.input}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="0.00"
        />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Image URL</span>
        <input
          className={styles.input}
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://..."
        />
      </label>

      {imageUrl.trim() && (
        <div className={styles.preview}>
          <img src={imageUrl.trim()} alt="Preview" />
        </div>
      )}

      <div className={styles.modalActions}>
        <button
          className={styles.btn}
          type="button"
          onClick={onCancel}
          disabled={isSaving}
        >
          Cancel
        </button>

        <button
          className={styles.saveBtn}
          type="button"
          disabled={isSaving || !canSave}
          onClick={() =>
            onSave({
              name: name.trim(),
              description: desc.trim(),
              price: priceNum,
              image_url: imageUrl.trim() || null,
            })
          }
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
