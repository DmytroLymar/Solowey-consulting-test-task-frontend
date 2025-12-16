// src/pages/AdminUsersPage/UserRow.tsx
import { useState } from "react";
import styles from "./AdminUsersPage.module.scss";
import type { AdminUser, UserPatch } from "./types";

type Props = {
  user: AdminUser;
  isSaving: boolean;
  onSave: (id: AdminUser["id"], patch: UserPatch) => Promise<void>;
};

export function UserRow({ user, isSaving, onSave }: Props) {
  const [first, setFirst] = useState(() => user.first_name ?? "");
  const [last, setLast] = useState(() => user.last_name ?? "");
  const [role, setRole] = useState(() => user.role);

  const shortId = user.id.slice(0, 8);

  return (
    <div className={styles.tr}>
      <span className={styles.id} title={user.id}>
        {shortId}…
      </span>

      <span className={styles.mono} title={user.email}>
        {user.email}
      </span>

      <input
        className={styles.input}
        value={first}
        onChange={(e) => setFirst(e.target.value)}
        placeholder="First name"
      />

      <input
        className={styles.input}
        value={last}
        onChange={(e) => setLast(e.target.value)}
        placeholder="Last name"
      />

      <select
        className={styles.select}
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="user">user</option>
        <option value="admin">admin</option>
      </select>

      <button
        className={styles.btn}
        disabled={isSaving}
        type="button"
        onClick={() =>
          onSave(user.id, {
            first_name: first.trim(),
            last_name: last.trim(),
            role,
          })
        }
      >
        {isSaving ? "Saving..." : "Save"}
      </button>
    </div>
  );
}
