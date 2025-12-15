import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import styles from "./RegisterPage.module.scss";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid = useMemo(() => {
    return (
      firstName.trim().length >= 2 &&
      lastName.trim().length >= 2 &&
      emailRegex.test(email.trim()) &&
      password.length >= 6 &&
      passwordConfirmation === password
    );
  }, [firstName, lastName, email, password, passwordConfirmation]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!isFormValid) {
      setSubmitError("Please fill all fields correctly.");
      return;
    }

    try {
      setIsSubmitting(true);
      await register({
        email: email.trim(),
        password,
        passwordConfirmation,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      });
      navigate("/items", { replace: true });
    } catch (err) {
      setSubmitError((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Register</h1>

        <form onSubmit={onSubmit}>
          <div className={styles.formGroup}>
            <input
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <input
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <input
              type="password"
              placeholder="Password (min 6 chars)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <input
              type="password"
              placeholder="Confirm password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </div>

          <button type="submit" disabled={!isFormValid || isSubmitting}>
            {isSubmitting ? "Creating..." : "Create account"}
          </button>
        </form>

        {submitError && <p className={styles.error}>{submitError}</p>}

        <p className={styles.footer}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
