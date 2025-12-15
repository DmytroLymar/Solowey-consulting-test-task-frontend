import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("john@example.com");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState<string | null>(null);

  const from = location.state?.from || "/items";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "40px auto", padding: 16 }}>
      <h1>Login</h1>

      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: 8 }}>
          <label>
            Email
            <input
              style={{
                display: "block",
                width: "100%",
                padding: 8,
                marginTop: 4,
              }}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>

        <div style={{ marginBottom: 8 }}>
          <label>
            Password
            <input
              style={{
                display: "block",
                width: "100%",
                padding: 8,
                marginTop: 4,
              }}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>

        <button type="submit">Log in</button>
      </form>

      {error && <p style={{ color: "red", marginTop: 8 }}>{error}</p>}

      <p style={{ marginTop: 16 }}>
        No account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
