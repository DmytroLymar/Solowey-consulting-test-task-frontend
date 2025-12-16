// src/pages/AdminItemsPage/types.ts
export type Item = {
  id: string;
  name: string;
  description: string | null;
  price: number | string;
  image_url?: string | null;
};

export type ItemPatch = {
  name: string;
  description: string;
  price: number;
  image_url: string | null;
};
