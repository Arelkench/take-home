import {Dispatch, SetStateAction, useCallback} from "react";
import {useCardStore} from "../store.ts";
import { ListItem } from "../api/getListData.ts";

export const useInitStore = () => {
    const { initializeCards } = useCardStore();

    const initStore = useCallback((data: ListItem[], setAreDeletedCardsVisible: Dispatch<SetStateAction<boolean>>) => {
        const storedVisibleCards = localStorage.getItem("visibleCards");
        const storedDeletedCards = localStorage.getItem("deletedCards");

        const visibleCards = storedVisibleCards ? JSON.parse(storedVisibleCards) : data
        const deletedCards = storedDeletedCards ? JSON.parse(storedDeletedCards) : []

        initializeCards(visibleCards, deletedCards)

        const storedVisibleDeletedCards = localStorage.getItem("deletedCardsVisible");

        if (storedVisibleDeletedCards) {
            setAreDeletedCardsVisible(JSON.parse(storedVisibleDeletedCards));
        }
    },[initializeCards])

    return { initStore }
}
