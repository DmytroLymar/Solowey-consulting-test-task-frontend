export interface User {
  id: number;
  email: string;
  first_name: string | null;
  last_name: string | null;
  role: "admin" | "user";
}
