import { createContext } from "react";
import { Business } from "../models/Business";

interface AddListContextModel {
    lists: Business[];
    addToList: (newAdd: Business) => void;
    removeFromList: (removedPlace: Business, id: string) => void;
    count: number;
   
};

const defaultValue: AddListContextModel = {
    lists: [],
    addToList: () => {},
    removeFromList: () => {},
    count: 0,
  
};

export const AddListContext = createContext(defaultValue);