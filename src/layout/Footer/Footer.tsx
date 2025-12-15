import styles from "./Footer.module.scss";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <span>© {new Date().getFullYear()} TestShop</span>
        <span className={styles.muted}>Rails + React test task</span>
      </div>
    </footer>
  );
}
