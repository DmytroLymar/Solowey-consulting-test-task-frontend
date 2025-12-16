import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Item } from "../types/Item";

type CartItemSnapshot = {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
};

export type CartLine = {
  itemId: string;
  quantity: number;
  item: CartItemSnapshot;
};

type CartState = {
  lines: CartLine[];

  add: (item: Item, qty?: number) => void;
  remove: (itemId: string) => void;
  inc: (itemId: string) => void;
  dec: (itemId: string) => void;
  clear: () => void;

  getCount: () => number;
  getTotal: () => number;
  has: (itemId: string) => boolean;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],

      add: (item, qty = 1) => {
        const { lines } = get();
        const idx = lines.findIndex((l) => l.itemId === item.id);

        if (idx >= 0) {
          const next = [...lines];
          next[idx] = { ...next[idx], quantity: next[idx].quantity + qty };
          set({ lines: next });
          return;
        }

        const snapshot: CartItemSnapshot = {
          id: item.id,
          name: item.name,
          price: Number(item.price),
          image_url: item.image_url ?? null,
        };

        set({
          lines: [...lines, { itemId: item.id, quantity: qty, item: snapshot }],
        });
      },

      remove: (itemId) =>
        set({ lines: get().lines.filter((l) => l.itemId !== itemId) }),

      inc: (itemId) =>
        set({
          lines: get().lines.map((l) =>
            l.itemId === itemId ? { ...l, quantity: l.quantity + 1 } : l
          ),
        }),

      dec: (itemId) => {
        const next = get()
          .lines.map((l) =>
            l.itemId === itemId ? { ...l, quantity: l.quantity - 1 } : l
          )
          .filter((l) => l.quantity > 0);

        set({ lines: next });
      },

      clear: () => set({ lines: [] }),

      getCount: () => get().lines.reduce((sum, l) => sum + l.quantity, 0),
      getTotal: () =>
        get().lines.reduce((sum, l) => sum + l.quantity * l.item.price, 0),
      has: (itemId) => get().lines.some((l) => l.itemId === itemId),
    }),
    { name: "testshop_cart_v1", version: 1 }
  )
);
