import { ListItem } from "../api/getListData";
import { DeleteButton, ExpandButton } from "./Buttons";
import { ChevronUpIcon } from "./icons";
import {useState, useCallback} from "react";
import {useCardStore} from "../store";
import {useAutoAnimate} from "@formkit/auto-animate/react";

type CardProps = {
    title: ListItem["title"];
    description?: ListItem["description"];
    cardId: number;
};

export const Card = ({ title, description, cardId }: CardProps) => {
    const [isOpen, setIsOpen] = useState(() => {
        const savedState = localStorage.getItem(`expanded-${cardId}`);
        return savedState === "true";
    });

    const { deleteCard } = useCardStore();
    const [parent] = useAutoAnimate<HTMLDivElement>();

    const handleOpen = useCallback(() => {
        setIsOpen((prevState) => {
            localStorage.setItem(`expanded-${cardId}`, JSON.stringify(!prevState));

            return !prevState;
        })
    }, [cardId])

    const handleDelete = useCallback(() => {
        deleteCard(cardId)
    }, [cardId, deleteCard])


    return (
        <div className="bg-white shadow-md rounded-md p-4 border border-gray-200" ref={parent}>
            <div className="flex justify-between items-center">
                <h1 className="font-semibold text-gray-800">{title}</h1>
                <div className="flex space-x-2">
                    {description && (
                        <>
                            <ExpandButton onClick={handleOpen}>
                                <ChevronUpIcon />
                            </ExpandButton>
                            <DeleteButton
                                className="text-red-500 hover:text-red-700"
                                onClick={handleDelete}>
                                    Delete
                            </DeleteButton>
                        </>
                    )}
                </div>
            </div>

            {isOpen && description && (
                <p className="mt-2 text-gray-600 text-sm">{description}</p>
            )}
        </div>
    );
};
