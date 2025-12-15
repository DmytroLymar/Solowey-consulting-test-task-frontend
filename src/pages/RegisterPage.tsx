import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [email, setEmail] = useState("newuser@example.com");
  const [password, setPassword] = useState("password");
  const [passwordConfirmation, setPasswordConfirmation] = useState("password");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      await register({
        email,
        password,
        passwordConfirmation,
        firstName,
        lastName,
      });
      navigate("/items", { replace: true });
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "40px auto", padding: 16 }}>
      <h1>Register</h1>

      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: 8 }}>
          <label>
            First name
            <input
              style={{
                display: "block",
                width: "100%",
                padding: 8,
                marginTop: 4,
              }}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
        </div>

        <div style={{ marginBottom: 8 }}>
          <label>
            Last name
            <input
              style={{
                display: "block",
                width: "100%",
                padding: 8,
                marginTop: 4,
              }}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
        </div>

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

        <div style={{ marginBottom: 8 }}>
          <label>
            Confirm password
            <input
              style={{
                display: "block",
                width: "100%",
                padding: 8,
                marginTop: 4,
              }}
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </label>
        </div>

        <button type="submit">Create account</button>
      </form>

      {error && <p style={{ color: "red", marginTop: 8 }}>{error}</p>}

      <p style={{ marginTop: 16 }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
