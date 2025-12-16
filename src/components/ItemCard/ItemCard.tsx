import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import type { Item } from "../../types/Item";
import styles from "./ItemCard.module.scss";

interface ItemCardProps {
  item: Item;

  onAddToCart?: (item: Item) => void;
  onToggleFavorite?: (item: Item) => void;

  isInCart?: boolean;
  isFavorite?: boolean;
}

export function ItemCard({
  item,
  onAddToCart,
  onToggleFavorite,
  isInCart = false,
  isFavorite = false,
}: ItemCardProps) {
  const navigate = useNavigate();
  const productLink = `/items/${item.id}`;

  const handleCartClick = () => {
    if (isInCart) {
      navigate("/cart");
      toast("Already in cart → opening cart");
      return;
    }

    if (!onAddToCart) return;

    onAddToCart(item);
    toast.success("Added to cart");
  };

  const handleFavClick = () => {
    if (!onToggleFavorite) return;

    onToggleFavorite(item);

    if (isFavorite) toast("Removed from favorites");
    else toast.success("Added to favorites");
  };

  return (
    <article className={styles.card}>
      <Link
        to={productLink}
        className={styles.imageLink}
        aria-label={item.name}
      >
        {item.image_url ? (
          <div className={styles.imageWrap}>
            <img
              className={styles.image}
              src={item.image_url}
              alt={item.name}
            />
          </div>
        ) : (
          <div className={styles.imageFallback} aria-hidden="true">
            No image
          </div>
        )}
      </Link>

      <div className={styles.content}>
        <h3 className={styles.title}>
          <Link to={productLink} className={styles.titleLink}>
            {item.name}
          </Link>
        </h3>

        {item.description && <p className={styles.desc}>{item.description}</p>}

        <div className={styles.bottom}>
          <p className={styles.price}>${item.price}</p>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cartBtn}
              onClick={handleCartClick}
              disabled={!onAddToCart && !isInCart}
            >
              {isInCart ? "In cart" : "Add to cart"}
            </button>

            <button
              type="button"
              className={styles.favBtn}
              onClick={handleFavClick}
              disabled={!onToggleFavorite}
              aria-pressed={isFavorite}
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              {isFavorite ? "♥" : "♡"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
