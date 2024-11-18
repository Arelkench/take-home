import { ListItem } from "../api/getListData";
import { DeleteButton, ExpandButton } from "./Buttons";
import { ChevronDownIcon, ChevronUpIcon } from "./icons";
import { useState, useCallback } from "react";
import { useCardStore } from "../store";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type CardProps = {
  item: ListItem;
}

export const Card = ({ item }: CardProps) => {
  const [isOpened, setIsOpened] = useState(() => {
    const savedState = localStorage.getItem(`expanded-${item.id}`);
    return savedState === "true";
  });

  const { deleteCard } = useCardStore();
  const [parent] = useAutoAnimate<HTMLDivElement>();

  const handleOpen = useCallback(() => {
    setIsOpened((prevState) => {
      localStorage.setItem(`expanded-${item.id}`, JSON.stringify(!prevState));

      return !prevState;
    })
  }, [item.id])

  const handleDelete = useCallback(() => {
    deleteCard(item.id)
  }, [item.id, deleteCard])

  return (
    <div className="bg-white shadow-md rounded-md p-4 border border-gray-200" ref={parent}>
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-gray-800">{item.title}</h1>
        <div className="flex space-x-2">
          {!item.isDeleted && (
            <>
              <ExpandButton onClick={handleOpen}>
                {isOpened && <ChevronUpIcon />}
                {!isOpened && <ChevronDownIcon />}
              </ExpandButton>

              <DeleteButton
                className="text-red-500 hover:text-red-700"
                onClick={handleDelete}
              >
                                Delete
              </DeleteButton>
            </>
          )}
        </div>
      </div>

      {isOpened && item.description && (
        <p className="mt-2 text-gray-600 text-sm">{item.description}</p>
      )}
    </div>
  );
};
