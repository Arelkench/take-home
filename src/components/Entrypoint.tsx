import {useCallback, useEffect, useState} from "react";
import { useGetListData } from "../api/getListData";
import { Spinner } from "./Spinner";
import { List } from "./List.tsx";
import { useCardStore } from "../store";
import {useInitStore} from "../hooks";
import {LOCAL_STORAGE_KEYS} from "../constant";

export const Entrypoint = () => {
    const { refetch, data, isLoading, isFetching} = useGetListData();
    const { visibleCards, deletedCards } = useCardStore();

    const [areDeletedCardsVisible, setAreDeletedCardsVisible] = useState(false);
    const { initStore } = useInitStore();

    const handleRevealClick = useCallback(() => {
        setAreDeletedCardsVisible((prevState) => !prevState);
        localStorage.setItem(LOCAL_STORAGE_KEYS.areDeletedCardsShown, JSON.stringify(areDeletedCardsVisible));
    },[areDeletedCardsVisible])

    const handleRefreshClick = useCallback(async () => {
        localStorage.removeItem(LOCAL_STORAGE_KEYS.visibleCards)
        await refetch();
    },[refetch])

    useEffect(() => {
        if (isLoading || isFetching) {
            return;
        }
        const filteredData = data?.filter((item) => item.isVisible) ?? []

        initStore(filteredData, setAreDeletedCardsVisible)
    }, [data, isLoading, isFetching, initStore]);

    if (isLoading || isFetching) {
        return <Spinner />;
    }

    return (
        <div className="flex gap-x-16 w-full justify-center align-top">
            <div className="w-full max-w-xl">
                <List items={visibleCards} isVisible={true} title="My Awesome List" />
            </div>
            <div className="flex flex-col gap-y-2">
                <button
                    onClick={handleRevealClick}
                    className="text-white text-sm font-semibold transition-colors hover:bg-gray-800 bg-black rounded px-6 py-2 h-9"
                >
                    Reveal
                </button>
                <button
                    onClick={handleRefreshClick}
                    className="text-white text-sm font-semibold transition-colors hover:bg-gray-800 bg-red-600 rounded px-6 py-2 h-9"
                >
                    Refresh
                </button>
            </div>
            <div className="w-full max-w-xl">
                <div className="flex flex-col gap-y-3">
                    <List
                        items={deletedCards}
                        isVisible={areDeletedCardsVisible}
                        title="Deleted Cards"
                    />
                </div>
            </div>
        </div>
    );
};
