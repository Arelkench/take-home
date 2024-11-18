import { Dispatch, SetStateAction, useCallback } from "react";
import { useCardStore } from "../store.ts";
import { ListItem } from "../api/getListData.ts";
import { LOCAL_STORAGE_KEYS } from "../constant";

export const useInitStore = () => {
  const { initializeCards } = useCardStore();

  const initStore = useCallback((data: ListItem[], setAreDeletedCardsVisible: Dispatch<SetStateAction<boolean>>) => {
    const storedDeletedCards = localStorage.getItem(LOCAL_STORAGE_KEYS.deletedCards);

    const deletedCards: ListItem[] = storedDeletedCards ? JSON.parse(storedDeletedCards) : [];

    const filteredVisibleCards = data.reduce<ListItem[]>((accumulator, card) => {
      const isDeleted = deletedCards.some((deletedCard) => deletedCard.id === card.id)

      if (isDeleted) {
        return accumulator
      }

      return [...accumulator, card]
    }, []);

    initializeCards(filteredVisibleCards, deletedCards)

    const storedVisibleDeletedCards = localStorage.getItem(LOCAL_STORAGE_KEYS.areDeletedCardsShown);

    if (storedVisibleDeletedCards) {
      setAreDeletedCardsVisible(JSON.parse(storedVisibleDeletedCards));
    }
  },[initializeCards])

  return { initStore }
}
