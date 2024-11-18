import { DeletedListItem, ListItem } from "../api/getListData.ts";
import { Card } from "./Card.tsx";
import { useCardStore } from "../store/store.ts";
import { useCallback } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type Props = {
    items: (ListItem | DeletedListItem)[];
    isVisible: boolean;
    title: string;
};

export const List = ({ items, isVisible, title }: Props) => {
    const { deleteCard } = useCardStore();
    const [parent] = useAutoAnimate<HTMLDivElement>();

    const handleDeleteCard = useCallback(
        (cardId: number) => () => {
            deleteCard(cardId);
        },
        [deleteCard]
    );

    return (
        <div>
            <h1 className="mb-2 text-xl font-bold text-gray-700">
                {title} ({items.length})
            </h1>
            <div ref={parent} className="space-y-3">
                {isVisible &&
                    items.map((card) => (
                        <Card
                            key={card.id}
                            cardId={card.id}
                            title={card.title}
                            description={"description" in card ? card.description : undefined}
                            onDelete={"description" in card ? handleDeleteCard(card.id) : undefined}
                        />
                    ))}
            </div>
        </div>
    );
};
