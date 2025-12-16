import { useEffect, useState } from "react";
import { apiFetch } from "../../api/apiClient";
import toast from "react-hot-toast";
import styles from "./AdminItemsPage.module.scss";
import { Modal } from "../../components/Modal";
import { ItemRow } from "./ItemRow";
import { EditItemForm } from "./EditItemForm";
import type { Item, ItemPatch } from "./types";

export function AdminItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<Item["id"] | null>(null);
  const [editing, setEditing] = useState<Item | null>(null);

  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");

  const load = async () => {
    setError(null);
    try {
      const data = await apiFetch<Item[]>("/admin/items");
      setItems(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to load items");
    }
  };

  useEffect(() => {
    load().catch((e: unknown) =>
      setError(e instanceof Error ? e.message : "Failed to load items")
    );
  }, []);

  const createItem = async () => {
    setError(null);
    try {
      const price = Number(newPrice);
      if (!Number.isFinite(price)) {
        toast.error("Price must be a number");
        return;
      }
      const created = await apiFetch<Item>("/admin/items", {
        method: "POST",
        body: {
          item: {
            name: newName.trim(),
            description: newDesc.trim(),
            price,
            image_url: newImageUrl.trim() || null,
          },
        },
      });
      setItems((p) => [created, ...p]);
      setNewName("");
      setNewDesc("");
      setNewPrice("");
      setNewImageUrl("");

      toast.success("Item created");
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Failed to create item");
    }
  };

  const updateItem = async (id: Item["id"], patch: ItemPatch) => {
    setSavingId(id);
    setError(null);
    try {
      const updated = await apiFetch<Item>(`/admin/items/${id}`, {
        method: "PATCH",
        body: { item: patch },
      });
      setItems((p) => p.map((it) => (it.id === id ? updated : it)));
      toast.success("Item updated");
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Failed to update item");
    } finally {
      setSavingId(null);
    }
  };

  const deleteItem = async (id: Item["id"]) => {
    setError(null);
    try {
      if (!confirm("Delete this item?")) return;
      await apiFetch<null>(`/admin/items/${id}`, { method: "DELETE" });
      setItems((p) => p.filter((it) => it.id !== id));
      toast.success("Item deleted");
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Failed to delete item");
    }
  };

  return (
    <div className={styles.page}>
      <h1>Items</h1>
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.createCard}>
        <input
          className={styles.input}
          placeholder="Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <input
          className={styles.input}
          placeholder="Description"
          value={newDesc}
          onChange={(e) => setNewDesc(e.target.value)}
        />
        <input
          className={styles.input}
          placeholder="Price"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
        />
        <input
          className={styles.input}
          placeholder="Image URL"
          value={newImageUrl}
          onChange={(e) => setNewImageUrl(e.target.value)}
        />
        <button
          className={styles.btn}
          onClick={createItem}
          disabled={!newName.trim() || !newPrice.trim()}
        >
          Create
        </button>
      </div>

      <div className={styles.table}>
        <div className={styles.thead}>
          <span>ID</span>
          <span>Name</span>
          <span>Description</span>
          <span>Price</span>
          <span />
        </div>

        {items.map((it) => (
          <ItemRow
            key={it.id}
            item={it}
            isSaving={savingId === it.id}
            onEdit={setEditing}
            onDelete={() => deleteItem(it.id)}
          />
        ))}
      </div>
      <Modal
        open={!!editing}
        title={editing ? `Edit item #${editing.id}` : "Edit item"}
        onClose={() => setEditing(null)}
      >
        {editing && (
          <EditItemForm
            item={editing}
            isSaving={savingId === editing.id}
            onCancel={() => setEditing(null)}
            onSave={async (payload) => {
              await updateItem(editing.id, payload);
              setEditing(null);
            }}
          />
        )}
      </Modal>
    </div>
  );
}
