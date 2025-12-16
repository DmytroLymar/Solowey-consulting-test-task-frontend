import { useMemo } from "react";
import { useCartStore } from "../../store/cartStore";
import { useFavoritesStore } from "../../store/favoritesStore";
import type { Item } from "../../types/Item";
import { ItemCard } from "../ItemCard/ItemCard";
import styles from "./ItemsGrid.module.scss";

type ItemsGridProps = {
  items: Item[];
};

export function ItemsGrid({ items }: ItemsGridProps) {
  const addToCart = useCartStore((s) => s.add);
  const cartLines = useCartStore((s) => s.lines);

  const toggleFav = useFavoritesStore((s) => s.toggle);
  const favoriteIds = useFavoritesStore((s) => s.ids);

  const cartIdsSet = useMemo(
    () => new Set(cartLines.map((l) => l.itemId)),
    [cartLines]
  );

  const favIdsSet = useMemo(() => new Set(favoriteIds), [favoriteIds]);

  if (!items.length) {
    return <p className={styles.empty}>No items yet</p>;
  }

  return (
    <ul className={styles.grid}>
      {items.map((item) => (
        <li key={item.id} className={styles.gridItem}>
          <ItemCard
            item={item}
            onAddToCart={() => addToCart(item)}
            onToggleFavorite={() => toggleFav(item.id)}
            isInCart={cartIdsSet.has(item.id)}
            isFavorite={favIdsSet.has(item.id)}
          />
        </li>
      ))}
    </ul>
  );
}
