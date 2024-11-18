import { useEffect, useState } from "react";
import { useGetListData } from "../api/getListData";
import { Spinner } from "./Spinner";
import { List } from "./List.tsx";
import {useCardStore} from "../store/store.ts";

export const Entrypoint = () => {
    const listQuery = useGetListData();
    const { visibleCards, deletedCards, initializeCards } = useCardStore();
    const [isDeletedCardsVisible, setIsDeletedCardsVisible] = useState(false);

    const handleRevealClick = () => setIsDeletedCardsVisible(!isDeletedCardsVisible);

    useEffect(() => {
        if (listQuery.isLoading) {
            return;
        }

        const storedVisibleCards = localStorage.getItem("visibleCards");
        const storedDeletedCards = localStorage.getItem("deletedCards");

        if (storedVisibleCards && storedDeletedCards) {
            initializeCards(JSON.parse(storedVisibleCards));
            useCardStore.setState({
                deletedCards: JSON.parse(storedDeletedCards),
            });
        } else {
            initializeCards(listQuery.data?.filter((item) => item.isVisible) ?? []);
        }
    }, [listQuery.data, listQuery.isLoading, initializeCards]);

    if (listQuery.isLoading) return <Spinner />;

    return (
        <div className="flex gap-x-16 w-full justify-center align-top">
            <div className="w-full max-w-xl">
                <List items={visibleCards} isVisible={true} title="My Awesome List" />
            </div>
            <div className="w-full max-w-xl">
                <div className="flex flex-col gap-y-3">
                    <List
                        items={deletedCards}
                        isVisible={isDeletedCardsVisible}
                        title="Deleted Cards"
                    />
                </div>
            </div>
            <button
                onClick={handleRevealClick}
                className="text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1"
            >
                Reveal
            </button>
        </div>
    );
};
