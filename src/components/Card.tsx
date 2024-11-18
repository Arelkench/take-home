import { ListItem } from "../api/getListData";
import { DeleteButton, ExpandButton } from "./Buttons";
import { ChevronUpIcon } from "./icons";
import { useState, useEffect } from "react";

type CardProps = {
    title: ListItem["title"];
    description?: ListItem["description"];
    onDelete?: () => void;
    cardId: number;
};

export const Card = ({ title, description, onDelete, cardId }: CardProps) => {
    const [isOpen, setIsOpen] = useState(() => {
        const savedState = localStorage.getItem(`expanded-${cardId}`);
        return savedState === "true";
    });

    useEffect(() => {
        localStorage.setItem(`expanded-${cardId}`, JSON.stringify(isOpen));
    }, [isOpen, cardId]);

    return (
        <div className="bg-white shadow-md rounded-md p-4 border border-gray-200">
            <div className="flex justify-between items-center">
                <h1 className="font-semibold text-gray-800">{title}</h1>
                <div className="flex space-x-2">
                    {description && (
                        <>
                            <ExpandButton onClick={() => setIsOpen(!isOpen)}>
                                <ChevronUpIcon />
                            </ExpandButton>
                            {onDelete && (
                                <DeleteButton
                                    className="text-red-500 hover:text-red-700"
                                    onClick={onDelete}
                                >
                                    Delete
                                </DeleteButton>
                            )}
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
