import type { Item } from "./Item";

export type OrderDescription = {
  id: string;
  item_id: string;
  order_id: string;
  quantity: number;
  item: Item;
};

export type Order = {
  id: string;
  user_id: string;
  amount: number;
  created_at: string;
  updated_at: string;
  order_descriptions: OrderDescription[];
};
