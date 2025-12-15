import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <h1>404</h1>
      <p>Page not found.</p>
      <Link to="/">Go home</Link>
    </div>
  );
}
