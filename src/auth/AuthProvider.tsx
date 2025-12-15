import React, { useEffect, useMemo, useState } from "react";
import { apiFetch } from "../api/apiClient";
import type { User } from "../types/User";
import { AuthContext, type AuthContextValue } from "./authContext";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const me = await apiFetch<User>("/me");
        setUser(me);
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const login = async (email: string, password: string) => {
    const u = await apiFetch<User>("/users/sign_in", {
      method: "POST",
      body: { user: { email, password } },
    });
    setUser(u);
    return u;
  };

  const register = async (payload: {
    email: string;
    password: string;
    passwordConfirmation: string;
    firstName?: string;
    lastName?: string;
  }) => {
    const u = await apiFetch<User>("/users", {
      method: "POST",
      body: {
        user: {
          email: payload.email,
          password: payload.password,
          password_confirmation: payload.passwordConfirmation,
          first_name: payload.firstName,
          last_name: payload.lastName,
        },
      },
    });
    setUser(u);
    return u;
  };

  const logout = async () => {
    await apiFetch<null>("/users/sign_out", { method: "DELETE" });
    setUser(null);
  };

  const value = useMemo<AuthContextValue>(
    () => ({ user, isLoading, login, register, logout }),
    [user, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
