import { DeletedListItem, ListItem } from "../api/getListData.ts";
import { Card } from "./Card.tsx";
import {useCardStore} from "../store/store.ts";
import {useCallback} from "react";

type Props = {
    items: (ListItem | DeletedListItem)[];
    isVisible: boolean;
    title: string;
};

export const List = ({ items, isVisible, title }: Props) => {
    const { deleteCard } = useCardStore();

    const handleDeleteCard = useCallback((cardId: number) => () => {
        deleteCard(cardId)
    }, [deleteCard])

    return (
        <>
            <h1 className="mb-1 font-medium text-lg">
                {title} ({items.length})
            </h1>
            {isVisible &&
                items.map((card) => (
                    <Card
                        key={card.id}
                        title={card.title}
                        description={"description" in card ? card.description : undefined}
                        onDelete={"description" in card ? handleDeleteCard(card.id) : undefined}
                    />
                ))}
        </>
    );
};
