import { DeletedListItem, ListItem } from "../api/getListData.ts";
import { Card } from "./Card.tsx";
import { useMemo } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type Props = {
    items: (ListItem | DeletedListItem)[];
    isVisible: boolean;
    title: string;
};

const isListItem = (value: unknown): value is ListItem => Boolean(value && typeof value === 'object' && 'description' in value)

export const List = ({ items, isVisible, title }: Props) => {
    const [parent] = useAutoAnimate<HTMLDivElement>();

    const renderedCards = useMemo(() => items.map((card) => (
            <Card
                key={card.id}
                cardId={card.id}
                title={card.title}
                description={isListItem(card) ? card.description : undefined}
            />
        )), [items])

    return (
        <div>
            <h1 className="mb-2 text-xl font-bold text-gray-700">
                {title} ({items.length})
            </h1>
            <div ref={parent} className="space-y-3">
                {isVisible && renderedCards}
            </div>
        </div>
    );
};
