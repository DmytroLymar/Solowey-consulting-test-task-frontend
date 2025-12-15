import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import styles from "./LoginPage.module.scss";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("john@example.com");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      await login(email, password);
      navigate("/items", { replace: true });
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Login</h1>

        <form onSubmit={onSubmit}>
          <div className={styles.formGroup}>
            <input
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit">Log in</button>
        </form>

        {error && <p className={styles.error}>{error}</p>}

        <p style={{ textAlign: "center", marginTop: 12 }}>
          No account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
