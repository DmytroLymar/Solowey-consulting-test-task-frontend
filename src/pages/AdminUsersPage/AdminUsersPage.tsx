// src/pages/AdminUsersPage/AdminUsersPage.tsx
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { apiFetch } from "../../api/apiClient";
import styles from "./AdminUsersPage.module.scss";
import { UserRow } from "./UserRow";
import type { AdminUser, UserPatch } from "./types";

export function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [savingId, setSavingId] = useState<AdminUser["id"] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setError(null);
    try {
      const data = await apiFetch<AdminUser[]>("/admin/users");
      setUsers(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to load users");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const updateUser = async (id: AdminUser["id"], patch: UserPatch) => {
    setSavingId(id);
    setError(null);

    try {
      const updated = await apiFetch<AdminUser>(`/admin/users/${id}`, {
        method: "PATCH",
        body: { user: patch },
      });

      setUsers((prev) => prev.map((u) => (u.id === id ? updated : u)));
      toast.success("User updated");
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Failed to update user");
    } finally {
      setSavingId(null);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className={styles.page}>
      <h1>Users</h1>
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.table}>
        <div className={styles.thead}>
          <span>ID</span>
          <span>Email</span>
          <span>First</span>
          <span>Last</span>
          <span>Role</span>
          <span />
        </div>

        {users.map((u) => (
          <UserRow
            key={u.id}
            user={u}
            isSaving={savingId === u.id}
            onSave={updateUser}
          />
        ))}
      </div>
    </div>
  );
}
