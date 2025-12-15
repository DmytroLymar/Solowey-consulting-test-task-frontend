import { useState } from "react";

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState("john@example.com");
  const [password, setPassword] = useState("password");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onLogin(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
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
            onChange={(event) => setEmail(event.target.value)}
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
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>

      <button type="submit" style={{ marginTop: 8 }}>
        Log in
      </button>
    </form>
  );
}
