import type { Item } from "../types/Item";

interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
  return (
    <li
      style={{
        border: "1px solid #333",
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        display: "flex",
        gap: 12,
        background: "#111",
      }}
    >
      {item.image_url && (
        <div
          style={{
            width: 120,
            height: 90,
            overflow: "hidden",
            borderRadius: 8,
            flexShrink: 0,
          }}
        >
          <img
            src={item.image_url}
            alt={item.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
      )}

      <div>
        <h3 style={{ margin: "0 0 4px" }}>{item.name}</h3>
        <p style={{ margin: "0 0 4px" }}>{item.description}</p>
        <p style={{ margin: 0, fontWeight: "bold" }}>Price: ${item.price}</p>
      </div>
    </li>
  );
}
