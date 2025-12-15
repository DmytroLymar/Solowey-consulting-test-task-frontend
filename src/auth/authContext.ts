import { createContext } from "react";
import type { User } from "../types/User";

export type AuthContextValue = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (payload: {
    email: string;
    password: string;
    passwordConfirmation: string;
    firstName?: string;
    lastName?: string;
  }) => Promise<User>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
