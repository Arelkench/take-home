import {Dispatch, SetStateAction, useCallback} from "react";
import {useCardStore} from "../store.ts";
import {DeletedListItem, ListItem} from "../api/getListData.ts";

export const useInitStore = () => {
    const { initializeCards } = useCardStore();

    const initStore = useCallback((data: ListItem[], setAreDeletedCardsVisible: Dispatch<SetStateAction<boolean>>) => {
        const storedVisibleCards = localStorage.getItem("visibleCards");
        const storedDeletedCards = localStorage.getItem("deletedCards");

        const deletedCards: DeletedListItem[] = storedDeletedCards ? JSON.parse(storedDeletedCards) : [];
        const visibleCards: ListItem[] = (storedVisibleCards ? JSON.parse(storedVisibleCards) : data);

        const filteredVisibleCards = visibleCards.reduce<ListItem[]>((accumulator, card) => {
            const isDeleted = deletedCards.some((deletedCard) => deletedCard.id === card.id)

            if (isDeleted) {
                return accumulator
            }

            return [...accumulator, card]
        }, []);

        initializeCards(filteredVisibleCards, deletedCards)

        const storedVisibleDeletedCards = localStorage.getItem("deletedCardsVisible");

        if (storedVisibleDeletedCards) {
            setAreDeletedCardsVisible(JSON.parse(storedVisibleDeletedCards));
        }
    },[initializeCards])

    return { initStore }
}
