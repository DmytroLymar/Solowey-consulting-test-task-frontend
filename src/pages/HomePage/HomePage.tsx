import { Link } from "react-router-dom";
import { useCartStore } from "../../store/cartStore";
import { useFavoritesStore } from "../../store/favoritesStore";
import { FeaturedItems } from "../../components/FeaturedItems/FeaturedItems";
import styles from "./HomePage.module.scss";

export function HomePage() {
  const cartCount = useCartStore((s) =>
    s.lines.reduce((sum, l) => sum + l.quantity, 0)
  );
  const favoritesCount = useFavoritesStore((s) => s.ids.length);

  return (
    <div className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.kicker}>Test assignment • e-commerce demo</p>

          <h1 className={styles.title}>
            Welcome to <span className={styles.accent}>TestShop</span>
          </h1>

          <p className={styles.subtitle}>
            Browse items, save favorites, and checkout fast.
          </p>

          <div className={styles.heroActions}>
            <Link className={styles.primaryBtn} to="/items">
              Browse items
            </Link>

            <Link className={styles.secondaryBtn} to="/cart">
              View cart{cartCount ? ` (${cartCount})` : ""}
            </Link>
          </div>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section className={styles.quick}>
        <h2 className={styles.sectionTitle}>Quick actions</h2>

        <div className={styles.tiles}>
          <Link className={styles.tile} to="/items">
            <div className={styles.tileIcon}>🛍️</div>
            <div className={styles.tileBody}>
              <div className={styles.tileTitle}>Items</div>
              <div className={styles.tileHint}>Browse the catalog</div>
            </div>
          </Link>

          <Link className={styles.tile} to="/favorites">
            <div className={styles.tileIcon}>♡</div>
            <div className={styles.tileBody}>
              <div className={styles.tileTitle}>Favorites</div>
              <div className={styles.tileHint}>
                {favoritesCount
                  ? `${favoritesCount} saved`
                  : "No favorites yet"}
              </div>
            </div>
          </Link>

          <Link className={styles.tile} to="/cart">
            <div className={styles.tileIcon}>🛒</div>
            <div className={styles.tileBody}>
              <div className={styles.tileTitle}>Cart</div>
              <div className={styles.tileHint}>
                {cartCount ? `${cartCount} item(s)` : "Empty"}
              </div>
            </div>
          </Link>

          <Link className={styles.tile} to="/orders">
            <div className={styles.tileIcon}>📦</div>
            <div className={styles.tileBody}>
              <div className={styles.tileTitle}>Orders</div>
              <div className={styles.tileHint}>View your history</div>
            </div>
          </Link>
        </div>
      </section>

      {/* FEATURED */}
      <FeaturedItems limit={6} />
    </div>
  );
}
