import { useEffect, useState } from "react";
import { useAuth } from "../../auth/useAuth";
import styles from "./ProfilePage.module.scss";

export function ProfilePage() {
  const { user, logout, updateMe } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    setFirstName(user.first_name ?? "");
    setLastName(user.last_name ?? "");
    setEmail(user.email ?? "");
  }, [user]);

  if (!user) return null;

  const onCancel = () => {
    setFirstName(user.first_name ?? "");
    setLastName(user.last_name ?? "");
    setEmail(user.email ?? "");
    setError(null);
    setIsEditing(false);
  };

  const onSave = async () => {
    setIsSaving(true);
    setError(null);

    try {
      await updateMe({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(), // прибери, якщо не редагуєш email
      });
      setIsEditing(false);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Failed to update profile");
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Profile</h1>
        <p className={styles.subtitle}>Your account info</p>
      </header>

      <div className={styles.card}>
        <div className={styles.row}>
          <span className={styles.label}>Name</span>

          {!isEditing ? (
            <b>
              {user.first_name} {user.last_name}
            </b>
          ) : (
            <div className={styles.inlineInputs}>
              <input
                className={styles.input}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
              />
              <input
                className={styles.input}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
              />
            </div>
          )}
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Email</span>

          {!isEditing ? (
            <b>{user.email}</b>
          ) : (
            <input
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          )}
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Role</span>
          <b>{user.role}</b>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.divider} />

        {!isEditing ? (
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.editBtn}
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>

            <button type="button" className={styles.logoutBtn} onClick={logout}>
              Log out
            </button>
          </div>
        ) : (
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.saveBtn}
              onClick={onSave}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save"}
            </button>

            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onCancel}
              disabled={isSaving}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
