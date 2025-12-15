import { useState } from "react";
import { apiFetch } from "../api/apiClient";
import type { Item } from "../types/Item";
import { useAuth } from "../auth/useAuth";

export function ItemsPage() {
  const { user, logout } = useAuth();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadItems = async () => {
    try {
      setError(null);
      setLoading(true);
      const data = await apiFetch<Item[]>("/items");
      setItems(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: 16 }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h1>Items</h1>
          <p>
            Logged in as {user?.email} ({user?.role})
          </p>
        </div>
        <button onClick={() => logout()}>Logout</button>
      </header>

      <button onClick={loadItems} disabled={loading}>
        {loading ? "Loading..." : "Load items"}
      </button>

      {error && <p style={{ color: "red", marginTop: 8 }}>{error}</p>}

      <ul style={{ marginTop: 24, paddingLeft: 0, listStyle: "none" }}>
        {items.map((item) => (
          <li
            key={item.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: 12,
              marginBottom: 12,
            }}
          >
            <h3 style={{ margin: "0 0 4px" }}>{item.name}</h3>
            <p style={{ margin: "0 0 4px" }}>{item.description}</p>
            <p style={{ margin: 0, fontWeight: "bold" }}>
              Price: ${item.price}
            </p>
            {item.image_url && (
              <img
                src={item.image_url}
                alt={item.name}
                style={{
                  marginTop: 8,
                  width: 240,
                  height: 160,
                  objectFit: "cover",
                  borderRadius: 8,
                }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
