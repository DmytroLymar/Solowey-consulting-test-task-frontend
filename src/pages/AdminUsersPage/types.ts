export type AdminUser = {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  role: "user" | "admin" | string;
};

export type UserPatch = {
  first_name: string;
  last_name: string;
  role: string;
};
