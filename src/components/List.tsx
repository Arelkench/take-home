import { ListItem } from "../api/getListData.ts";
import { Card } from "./Card.tsx";
import { useMemo } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type Props = {
  items: ListItem[];
  isVisible: boolean;
  title: string;
};

export const List = ({ items, isVisible, title }: Props) => {
  const [parent] = useAutoAnimate<HTMLDivElement>();

  const renderedCards = useMemo(() => items.map((card) => (
    <Card key={card.id} item={card} />
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
