import {useQuery} from "@tanstack/react-query";
import mockJson from "./mock.json";

/**
 * I have decided to add isDeleted property
 * It helps us to remove DeletedListItem, without affecting description property
 * So it makes it possible for us to move deleted item from localStorage back to store
 */
export type ListItem = {
  id: number;
  title: string;
  description: string;
  isVisible: boolean;
  isDeleted: boolean;
};

export const useGetListData = () => {
  return useQuery({
    queryKey: ["list"],
    queryFn: async () => {
      await sleep(1000);

      if (getRandom() > 85) {
        console.error("An unexpected error occurred!");
        throw new Error("👀");
      }

      const mockData = mockJson as Omit<ListItem, "isVisible">[];

      return shuffle(mockData).map((item) => {
        return {...item, isVisible: getRandom() > 50};
      });
    },
  });
};

const getRandom = () => Math.floor(Math.random() * 100);

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const shuffle = <T extends Omit<ListItem, "isVisible">[] >(array: T): T => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};
