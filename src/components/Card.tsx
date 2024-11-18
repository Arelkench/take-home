import { ListItem } from "../api/getListData";
import { DeleteButton, ExpandButton } from "./Buttons";
import { ChevronUpIcon } from "./icons";
import { useState } from "react";

type CardProps = {
    title: ListItem["title"];
    description?: ListItem["description"];
    onDelete?: () => void;
};

export const Card = ({ title, description, onDelete }: CardProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-black px-2 py-1.5">
            <div className="flex justify-between mb-0.5">
                <h1 className="font-medium">{title}</h1>
                <div className="flex">
                    {description && (
                        <>
                            <ExpandButton onClick={() => setIsOpen(!isOpen)}>
                                <ChevronUpIcon />
                            </ExpandButton>
                            {onDelete && (
                                <DeleteButton onClick={onDelete}>Delete</DeleteButton>
                            )}
                        </>
                    )}
                </div>
            </div>
            {isOpen && description && <p className="text-sm">{description}</p>}
        </div>
    );
};
