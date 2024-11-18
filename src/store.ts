import { create } from "zustand";
import { ListItem } from "./api/getListData.ts";
import { LOCAL_STORAGE_KEYS } from "./constant";

type StoreState = {
  visibleCards: ListItem[];
  deletedCards: ListItem[];
  initializeCards: (visibleCards: ListItem[], deletedCards?: ListItem[]) => void;
  deleteCard: (id: number) => void;
};

export const useCardStore = create<StoreState>((set) => ({
  visibleCards: [],
  deletedCards: [],
  initializeCards: (visibleCards = [], deletedCards = []) => set(() => ({ visibleCards, deletedCards })),
  deleteCard: (id) =>
    set((state) => {
      const cardToDelete = state.visibleCards.find((card) => card.id === id);

      if (!cardToDelete) {
        return state;
      }

      const updatedVisibleCards = state.visibleCards.filter((card) => card.id !== id);
      const updatedDeletedCards = [
        ...state.deletedCards,
        {...cardToDelete, isDeleted: true},
      ];

      localStorage.setItem(LOCAL_STORAGE_KEYS.deletedCards, JSON.stringify(updatedDeletedCards));

      return {
        visibleCards: updatedVisibleCards,
        deletedCards: updatedDeletedCards,
      };
    }),
}));
