import {create} from "zustand";
import {DeletedListItem, ListItem} from "../api/getListData.ts";


type StoreState = {
    visibleCards: ListItem[];
    deletedCards: DeletedListItem[];
    initializeCards: (cards: ListItem[]) => void;
    deleteCard: (id: number) => void;
};

export const useCardStore = create<StoreState>((set) => ({
    visibleCards: [],
    deletedCards: [],
    initializeCards: (cards) => set(() => ({ visibleCards: cards })),
    deleteCard: (id) =>
        set((state) => {
            const cardToDelete = state.visibleCards.find((card) => card.id === id);
            if (!cardToDelete) return state;

            const updatedVisibleCards = state.visibleCards.filter((card) => card.id !== id);
            const updatedDeletedCards = [
                ...state.deletedCards,
                { id: cardToDelete.id, title: cardToDelete.title, isVisible: cardToDelete.isVisible},
            ];

            // Save to local storage
            localStorage.setItem("visibleCards", JSON.stringify(updatedVisibleCards));
            localStorage.setItem("deletedCards", JSON.stringify(updatedDeletedCards));

            return {
                visibleCards: updatedVisibleCards,
                deletedCards: updatedDeletedCards,
            };
        }),
}));
