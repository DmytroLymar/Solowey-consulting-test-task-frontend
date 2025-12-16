import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { apiFetch } from "../../api/apiClient";
import type { Item } from "../../types/Item";
import { useCartStore } from "../../store/cartStore";
import { useFavoritesStore } from "../../store/favoritesStore";
import styles from "./ItemDetailsPage.module.scss";

export function ItemDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const addToCart = useCartStore((s) => s.add);
  const cartLines = useCartStore((s) => s.lines);
  const favIds = useFavoritesStore((s) => s.ids);
  const toggleFav = useFavoritesStore((s) => s.toggle);

  const isInCart = useMemo(() => {
    if (!id) return false;
    return cartLines.some((l) => l.itemId === id);
  }, [cartLines, id]);

  const isFavorite = useMemo(() => {
    if (!id) return false;
    return favIds.includes(id);
  }, [favIds, id]);

  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      if (!id) {
        setError("Missing item id");
        setLoading(false);
        return;
      }

      try {
        setError(null);
        setLoading(true);

        const data = await apiFetch<Item>(`/items/${id}`);

        if (isMounted) setItem(data);
      } catch (err) {
        if (isMounted) setError((err as Error).message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleCartClick = () => {
    if (!item) return;

    if (isInCart) {
      navigate("/cart");
      toast("Already in cart → opening cart");
      return;
    }

    addToCart(item);
    toast.success("Added to cart");
  };

  const handleFavClick = () => {
    if (!id) return;

    toggleFav(id);
    if (isFavorite) toast("Removed from favorites");
    else toast.success("Added to favorites");
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <p className={styles.info}>Loading...</p>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className={styles.page}>
        <header className={styles.header}>
          <h1>Item not found</h1>
          <p className={styles.subtitle}>{error ?? "No data"}</p>
        </header>

        <Link className={styles.backLink} to="/items">
          ← Back to items
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>{item.name}</h1>
          <p className={styles.subtitle}>ID: {item.id}</p>
        </div>

        <Link className={styles.backLink} to="/items">
          ← Back to items
        </Link>
      </header>

      <div className={styles.layout}>
        <section className={styles.media}>
          {item.image_url ? (
            <img
              className={styles.image}
              src={item.image_url}
              alt={item.name}
            />
          ) : (
            <div className={styles.imageFallback}>No image</div>
          )}
        </section>

        <section className={styles.details}>
          <div className={styles.priceRow}>
            <span className={styles.price}>${item.price}</span>
          </div>

          {item.description && (
            <div className={styles.block}>
              <h2 className={styles.blockTitle}>Description</h2>
              <p className={styles.desc}>{item.description}</p>
            </div>
          )}

          <div className={styles.actions}>
            <button
              className={styles.cartBtn}
              type="button"
              onClick={handleCartClick}
            >
              {isInCart ? "In cart" : "Add to cart"}
            </button>

            <button
              className={styles.favBtn}
              type="button"
              onClick={handleFavClick}
              aria-pressed={isFavorite}
            >
              {isFavorite ? "♥ In favorites" : "♡ Add to favorites"}
            </button>
          </div>

          <p className={styles.note}>Tip: Click “In cart” to open your cart.</p>
        </section>
      </div>
    </div>
  );
}
