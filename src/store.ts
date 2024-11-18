import {create} from "zustand";
import { DeletedListItem, ListItem } from "./api/getListData.ts";

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

            localStorage.setItem("visibleCards", JSON.stringify(updatedVisibleCards));
            localStorage.setItem("deletedCards", JSON.stringify(updatedDeletedCards));

            return {
                visibleCards: updatedVisibleCards,
                deletedCards: updatedDeletedCards,
            };
        }),
}));
