import { create } from "zustand";
import { persist } from "zustand/middleware";

type FavoritesState = {
  ids: string[];

  toggle: (itemId: string) => void;
  remove: (itemId: string) => void;
  clear: () => void;

  has: (itemId: string) => boolean;
};

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      ids: [],

      toggle: (itemId) => {
        const { ids } = get();
        set({
          ids: ids.includes(itemId)
            ? ids.filter((id) => id !== itemId)
            : [...ids, itemId],
        });
      },

      remove: (itemId) => set({ ids: get().ids.filter((id) => id !== itemId) }),
      clear: () => set({ ids: [] }),

      has: (itemId) => get().ids.includes(itemId),
    }),
    {
      name: "testshop_favorites_v1",
      version: 1,
    }
  )
);
