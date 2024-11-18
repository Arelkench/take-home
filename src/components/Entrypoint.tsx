import { useEffect, useState } from "react";
import { useGetListData } from "../api/getListData";
import { Spinner } from "./Spinner";
import { List } from "./List.tsx";
import { useCardStore } from "../store/store.ts";

export const Entrypoint = () => {
    const listQuery = useGetListData();
    const { visibleCards, deletedCards, initializeCards } = useCardStore();
    const [isDeletedCardsVisible, setIsDeletedCardsVisible] = useState(false);

    const handleRevealClick = () => {
        const newVisibility = !isDeletedCardsVisible;
        setIsDeletedCardsVisible(newVisibility);

        localStorage.setItem("deletedCardsVisible", JSON.stringify(newVisibility));
    };

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

        const storedVisibility = localStorage.getItem("deletedCardsVisible");
        if (storedVisibility) {
            setIsDeletedCardsVisible(JSON.parse(storedVisibility));
        }
    }, [listQuery.data, listQuery.isLoading, initializeCards]);

    if (listQuery.isLoading) return <Spinner />;

    return (
        <div className="flex gap-x-16 w-full justify-center align-top">
            <div className="w-full max-w-xl">
                <List items={visibleCards} isVisible={true} title="My Awesome List" />
            </div>
            <button
                onClick={handleRevealClick}
                className="text-white text-sm font-semibold transition-colors hover:bg-gray-800 bg-black rounded px-6 py-2 h-9"
            >
                Reveal
            </button>
            <div className="w-full max-w-xl">
                <div className="flex flex-col gap-y-3">
                    <List
                        items={deletedCards}
                        isVisible={isDeletedCardsVisible}
                        title="Deleted Cards"
                    />
                </div>
            </div>
        </div>
    );
};
