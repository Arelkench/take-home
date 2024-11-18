import {create} from "zustand";
import { DeletedListItem, ListItem } from "./api/getListData.ts";
import {LOCAL_STORAGE_KEYS} from "./constant";

type StoreState = {
    visibleCards: ListItem[];
    deletedCards: DeletedListItem[];
    initializeCards: (visibleCards: ListItem[], deletedCards?: DeletedListItem[]) => void;
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
                { id: cardToDelete.id, title: cardToDelete.title, isVisible: cardToDelete.isVisible},
            ];

            localStorage.setItem(LOCAL_STORAGE_KEYS.visibleCards, JSON.stringify(updatedVisibleCards));
            localStorage.setItem(LOCAL_STORAGE_KEYS.deletedCards, JSON.stringify(updatedDeletedCards));

            return {
                visibleCards: updatedVisibleCards,
                deletedCards: updatedDeletedCards,
            };
        }),
}));
