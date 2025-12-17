// src/pages/ServerStartingPage/ServerStartingPage.tsx
import styles from "./ServerStartingPage.module.scss";

export function ServerStartingPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.spinner} />

        <h1>Server is starting…</h1>

        <p>The backend server may take a little time to wake up.</p>

        <p className={styles.subtext}>Please wait a few seconds 🙏</p>
      </div>
    </div>
  );
}
